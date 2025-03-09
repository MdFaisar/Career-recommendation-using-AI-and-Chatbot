# chatbot_service.py
import os
import json
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

# Get API key from environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_career_chatbot_context():
    """
    Returns a system prompt that provides context for the career advisor chatbot
    """
    return """
    You are a helpful AI career assistant for the "AI Career Path Advisor" application.
    
    About the application:
    - This is a web app that helps users discover suitable career paths
    - Users take skill and interest assessments
    - Users provide profile information including education, experience, and preferences
    - The system provides personalized career recommendations
    
    Your role:
    - Answer questions about career paths, skills, job market trends
    - Explain the assessment process to users
    - Help users understand how to interpret their results
    - Provide encouragement and support during the assessment process
    - Do not provide final career recommendations (the main system does that)
    - You can explain skills, interests, and career paths in general
    
    If users ask about specific technical questions about the app itself or experience errors,
    direct them to contact support or refresh the page.
    
    Be concise, friendly, and helpful. Focus on being encouraging while users complete their assessments.
    """

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
    
    # Import requests at the top of your file
    import requests
    
    headers = {
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    system_message += "Your response MUST be 2-3 complete sentences only. Strictly bold the answer/output Keyword. Be extremely concise."
    
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 100  # Enough tokens for complete sentences
    }
    
    try:
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        
        result = response.json()
        bot_response = result["choices"][0]["message"]["content"]

        sentences = bot_response.split('.')
        if len(sentences) > 3:
            bot_response = '.'.join(sentences[:3]) + '.'
        
        return bot_response
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return "I'm sorry, I encountered an issue while processing your request. Please try again later."