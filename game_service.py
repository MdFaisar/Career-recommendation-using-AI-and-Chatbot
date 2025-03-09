# game_service.py
"""
This service handles the gamified skill and interest assessments
"""

def get_skills_questions():
    """
    Returns the questions for the skills assessment
    """
    return [
        {
            "question": "When faced with a complex problem, you typically:",
            "category": "analytical",
            "options": [
                {"text": "Break it down into smaller parts and solve methodically", "score": 5},
                {"text": "Look for patterns and connections to solve it", "score": 4},
                {"text": "Try different approaches until something works", "score": 3},
                {"text": "Ask others for their input and collaborate", "score": 2},
                {"text": "Feel overwhelmed and look for a simpler solution", "score": 1}
            ]
        },
        {
            "question": "In a group project, you naturally take on the role of:",
            "category": "leadership",
            "options": [
                {"text": "The leader who organizes and delegates tasks", "score": 5},
                {"text": "The planner who creates schedules and tracks progress", "score": 4},
                {"text": "The mediator who ensures everyone's voice is heard", "score": 3},
                {"text": "The specialist who focuses on specific technical tasks", "score": 2},
                {"text": "The supporter who helps wherever needed", "score": 1}
            ]
        },
        {
            "question": "How do you handle tight deadlines?",
            "category": "time_management",
            "options": [
                {"text": "Create a detailed plan and stick to it rigorously", "score": 5},
                {"text": "Prioritize tasks and focus on the most important ones", "score": 4},
                {"text": "Work intensely in short bursts with breaks in between", "score": 3},
                {"text": "Collaborate with others to divide the workload", "score": 2},
                {"text": "Start with the easiest tasks to build momentum", "score": 1}
            ]
        },
        {
            "question": "How comfortable are you with technology?",
            "category": "technical",
            "options": [
                {"text": "Very comfortable - I enjoy learning new software and systems", "score": 5},
                {"text": "Comfortable with most tools and can learn new ones quickly", "score": 4},
                {"text": "Comfortable with familiar tools but hesitant with new ones", "score": 3},
                {"text": "I can use basic technology but prefer simpler tools", "score": 2},
                {"text": "I find technology challenging and often need help", "score": 1}
            ]
        },
        {
            "question": "How do you approach creative tasks?",
            "category": "creativity",
            "options": [
                {"text": "Generate many ideas before selecting the best one", "score": 5},
                {"text": "Look for innovative approaches others haven't tried", "score": 4},
                {"text": "Build upon existing ideas and improve them", "score": 3},
                {"text": "Collaborate with others to spark creativity", "score": 2},
                {"text": "Follow established methods that have proven successful", "score": 1}
            ]
        }
    ]

def get_interests_questions():
    """
    Returns the questions for the interests assessment
    """
    return [
        {
            "question": "Which of these activities would you most enjoy doing in your free time?",
            "category": "activity_preference",
            "options": [
                {"text": "Solving puzzles or strategy games", "score": 5, "interest": "analytical"},
                {"text": "Creating art or craft projects", "score": 2, "interest": "artistic"},
                {"text": "Reading about scientific discoveries", "score": 3, "interest": "scientific"},
                {"text": "Helping others with their problems", "score": 1, "interest": "helping"},
                {"text": "Building or fixing things", "score": 4, "interest": "technical"}
            ]
        },
        {
            "question": "What type of problems do you find most satisfying to solve?",
            "category": "problem_solving",
            "options": [
                {"text": "Technical problems with clear solutions", "score": 5, "interest": "technical"},
                {"text": "Creative challenges with many possible answers", "score": 3, "interest": "artistic"},
                {"text": "Human problems involving relationships or emotions", "score": 1, "interest": "helping"},
                {"text": "Analytical problems requiring data and logic", "score": 4, "interest": "analytical"},
                {"text": "Organizational problems involving systems and processes", "score": 2, "interest": "organizational"}
            ]
        },
        {
            "question": "Which subject would you be most interested in learning more about?",
            "category": "learning_interest",
            "options": [
                {"text": "Business and entrepreneurship", "score": 5, "interest": "business"},
                {"text": "Arts and design", "score": 5, "interest": "artistic"},
                {"text": "Science and technology", "score": 5, "interest": "scientific"},
                {"text": "Psychology and human behavior", "score": 5, "interest": "helping"},
                {"text": "Nature and environmental studies", "score": 5, "interest": "nature"}
            ]
        },
        {
            "question": "How important is creativity in your ideal career?",
            "category": "creativity_importance",
            "options": [
                {"text": "Essential - I need to create and innovate regularly", "score": 5, "interest": "creative"},
                {"text": "Important - I enjoy applying creative thinking", "score": 4, "interest": "creative"},
                {"text": "Somewhat important - I like occasional creative tasks", "score": 3, "interest": "creative"},
                {"text": "Less important - I prefer more structured work", "score": 2, "interest": "structured"},
                {"text": "Not important - I prefer analytical or technical work", "score": 1, "interest": "analytical"}
            ]
        },
        {
            "question": "How much do you enjoy working with technology?",
            "category": "technology_interest",
            "options": [
                {"text": "Love it - I'm passionate about the latest tech", "score": 5, "interest": "technical"},
                {"text": "Enjoy it - Tech is interesting and useful", "score": 4, "interest": "technical"},
                {"text": "Neutral - I use technology when needed", "score": 3, "interest": "balanced"},
                {"text": "Minimal - I prefer working with people than machines", "score": 2, "interest": "social"},
                {"text": "Avoid it - I prefer less technical work", "score": 1, "interest": "non_technical"}
            ]
        }
    ]

def calculate_assessment_results(answers):
    """
    Calculate assessment results based on answers
    
    Args:
        answers: List of dictionaries with category and score
        
    Returns:
        Dictionary of categories and their average scores
    """
    # Group answers by category
    categories = {}
    
    for answer in answers:
        category = answer['category']
        score = answer['score']
        
        if category not in categories:
            categories[category] = []
            
        categories[category].append(score)
    
    # Calculate average score for each category
    results = {}
    for category, scores in categories.items():
        if scores:  # Make sure there are scores for this category
            avg_score = sum(scores) / len(scores)
            results[category] = round(avg_score, 1)
    
    return results