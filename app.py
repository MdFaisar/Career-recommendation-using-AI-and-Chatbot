# app.py - updated with login route
from flask import Flask, flash, render_template, request, redirect, url_for, session
import os
from dotenv import load_dotenv
from flask import jsonify
import json
from functools import wraps
from chatbot_service import get_chatbot_response
import re
import markdown
from markupsafe import Markup

# Import services
from api_service import get_career_recommendation
from game_service import get_skills_questions, get_interests_questions, calculate_assessment_results

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "dev-secret-key")

users = {
    "user": "password",
    "user2": "password2"
}

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Check credentials
        if username in users and users[username] == password:
            # Set session
            session['logged_in'] = True
            session['username'] = username
            
            # Redirect to home page
            return redirect(url_for('index'))
        else:
            # Flash an error message
            flash("Invalid username or password", "error")
            return render_template('login.html')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    # Clear session data
    session.clear()
    
    # Return response with cache-control headers
    response = redirect(url_for('login'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    
    return response

@app.route('/', methods=['GET'])
@login_required
def index():
    return render_template('index.html')

@app.route('/assessment', methods=['GET', 'POST'])
@login_required
def assessment():
    if request.method == 'POST':
        # Process assessment answers
        assessment_type = request.form.get('assessment_type')
        answers = json.loads(request.form.get('answers', '[]'))
        
        # Calculate results
        results = calculate_assessment_results(answers)
        
        # Store in session
        if assessment_type == 'skills':
            session['skills_assessment'] = results
        elif assessment_type == 'interests':
            session['interests_assessment'] = results
            
        # If both assessments are complete, redirect to profile form
        if 'skills_assessment' in session and 'interests_assessment' in session:
            return redirect(url_for('profile_form'))
            
        return redirect(url_for('assessment'))
    else:
        # Check which assessment to show
        show_skills = 'skills_assessment' not in session
        show_interests = not show_skills and 'interests_assessment' not in session
        
        # If both assessments are complete, redirect to profile form
        if not show_skills and not show_interests:
            return redirect(url_for('profile_form'))
            
        # Get appropriate questions
        questions = get_skills_questions() if show_skills else get_interests_questions()
        assessment_type = 'skills' if show_skills else 'interests'
        
        return render_template('assessment.html', 
                              questions=questions, 
                              assessment_type=assessment_type,
                              skills_complete='skills_assessment' in session,
                              interests_complete='interests_assessment' in session)

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile_form():
    if request.method == 'POST':
        # Collect form data
        user_data = {
            'skills': request.form.get('skills'),
            'interests': request.form.get('interests'),
            'education': request.form.get('education'),
            'experience': request.form.get('experience'),
            'work_environment': request.form.get('work_environment'),
            'career_goals': request.form.get('career_goals'),
            'additional_info': request.form.get('additional_info')
        }
        
        # Add assessment results if available
        if 'skills_assessment' in session:
            skills_results = session['skills_assessment']
            skills_text = ", ".join([f"{k} ({v})" for k, v in skills_results.items()])
            user_data['assessment_skills'] = skills_text
            
        if 'interests_assessment' in session:
            interests_results = session['interests_assessment']
            interests_text = ", ".join([f"{k} ({v})" for k, v in interests_results.items()])
            user_data['assessment_interests'] = interests_text
        
        # Get recommendation from Groq API
        recommendation = get_career_recommendation(user_data)
        
        # Store recommendation in session
        session['recommendation'] = recommendation
        
        return redirect(url_for('show_result'))
    else:
        # Pre-fill form based on assessment results if available
        suggested_skills = []
        suggested_interests = []
        
        if 'skills_assessment' in session:
            skills = session['skills_assessment']
            high_skills = [skill for skill, score in skills.items() if score >= 4.0]
            suggested_skills = ", ".join(high_skills)
            
        if 'interests_assessment' in session:
            interests = session['interests_assessment']
            high_interests = [interest for interest, score in interests.items() if score >= 4.0]
            suggested_interests = ", ".join(high_interests)
        
        return render_template('profile_form.html', 
                              suggested_skills=suggested_skills,
                              suggested_interests=suggested_interests)

def get_chatbot_response(user_message, context=None):
    """
    Get response from Llama-3.3-70b-versatile model via Groq API
    
    Args:
        user_message (str): The user's message to the chatbot
        context (dict, optional): Additional context like assessment results
        
    Returns:
        str: The AI's response
    """
    # Prepare system message with context if available
    system_message = "You are a helpful career advisor assistant. "
    
    if context:
        if 'skills_assessment' in context:
            skills_text = ", ".join([f"{k} ({v})" for k, v in context['skills_assessment'].items()])
            system_message += f"The user's top skills are: {skills_text}. "
            
        if 'interests_assessment' in context:
            interests_text = ", ".join([f"{k} ({v})" for k, v in context['interests_assessment'].items()])
            system_message += f"The user's interests include: {interests_text}. "
    
    system_message += "Provide helpful, concise career advice based on the user's questions."
    
    headers = {
        "Authorization": f"Bearer {app.secret_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    try:
        response = request.post(app.secret_key, headers=headers, json=data)
        response.raise_for_status()
        
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return "I'm sorry, I encountered an issue while processing your request. Please try again later."
    

@app.template_filter('md')
def md_filter(text):
    """Convert markdown to HTML."""
    # Fix: Complete the function by returning the processed markdown
    return Markup(markdown.markdown(text))

@app.route('/api/chatbot', methods=['POST'])
@login_required
def chatbot():
    # Get message from request
    data = request.json
    user_message = data.get('message', '')
    
    # Get conversation history from session if available
    conversation_history = session.get('chat_history', [])
    
    # Import the chatbot service function
    from chatbot_service import get_chatbot_response
    
    # Get response from chatbot service
    response = get_chatbot_response(user_message, conversation_history)
    
    # Update conversation history
    conversation_history.append({"role": "user", "content": user_message})
    conversation_history.append({"role": "assistant", "content": response})
    
    # Limit conversation history to last 10 messages to prevent session from growing too large
    if len(conversation_history) > 20:
        conversation_history = conversation_history[-20:]
    
    # Store updated history in session
    session['chat_history'] = conversation_history
    
    # Return response
    return jsonify({"response": response})


@app.route('/result')
@login_required
def show_result():
    recommendation = session.get('recommendation', 'No recommendation available.')
    
    # Get assessment results for display
    skills_results = session.get('skills_assessment', {})     
    interests_results = session.get('interests_assessment', {})
    
    return render_template('result.html', 
                          recommendation=recommendation,
                          skills_results=skills_results,
                          interests_results=interests_results)

@app.route('/reset')
@login_required
def reset():
    # Clear assessment data from session
    if 'skills_assessment' in session:
        session.pop('skills_assessment')
    if 'interests_assessment' in session:
        session.pop('interests_assessment')
    if 'recommendation' in session:
        session.pop('recommendation')
    if 'chat_history' in session:
        session.pop('chat_history')
    
    # Redirect to the assessment page to start over
    return redirect(url_for('assessment'))

if __name__ == '__main__':

    app.run()
