# api_service.py
import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_career_recommendation(user_data):
    """
    Get career recommendations from Llama-3.3-70b-versatile via Groq API
    Prioritizes Indian opportunities first, followed by international options
    """
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Create prompt for career recommendation with India-first approach
    system_prompt = """You are a career advisor with expertise in various professional fields. 
    Analyze the user's skills, interests, education, and experience to recommend suitable career paths.
    
    IMPORTANT: Present recommendations in two clear sections:
    1. First section: Indian opportunities with salary ranges in Rupees (₹)
    2. Second section: International opportunities with salary ranges in USD ($)
    
    For each recommended career path in both sections, provide:
    1. Job title and brief description
    2. Required skills and qualifications
    3. Growth prospects
    4. Potential salary range (in ₹ for Indian opportunities, in $ for international)
    5. Next steps for pursuing this career
    
    Format your response in a structured, easy-to-read format with clear sections and headings.
    """
    
    # Include assessment results if available
    assessment_data = ""
    if user_data.get('assessment_skills') or user_data.get('assessment_interests'):
        assessment_data = f"""
        Assessment Results:
        - Skills assessment: {user_data.get('assessment_skills', 'Not provided')}
        - Interests assessment: {user_data.get('assessment_interests', 'Not provided')}
        """
    
    # Create a detailed user prompt based on form data
    user_prompt = f"""Based on the following information about me, suggest career paths with Indian opportunities FIRST (with salaries in ₹), followed by international opportunities (with salaries in $):
    
    Skills: {user_data.get('skills', 'Not provided')}
    Interests: {user_data.get('interests', 'Not provided')}
    Education: {user_data.get('education', 'Not provided')}
    Experience: {user_data.get('experience', 'Not provided')}
    Preferred work environment: {user_data.get('work_environment', 'Not provided')}
    Career goals: {user_data.get('career_goals', 'Not provided')}
    Additional information: {user_data.get('additional_info', 'Not provided')}
    {assessment_data}
    """
    
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # Raise exception for HTTP errors
        
        result = response.json()
        recommendation = result["choices"][0]["message"]["content"]
        return recommendation
    except requests.exceptions.RequestException as e:
        print(f"API request error: {e}")
        return "Sorry, there was an error processing your request. Please try again later."
    except (KeyError, IndexError) as e:
        print(f"Response parsing error: {e}")
        return "Sorry, there was an error processing the recommendation. Please try again later."