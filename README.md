```markdown
# AI Career Path Advisor

A comprehensive web application designed to assist individuals in discovering their ideal career paths by leveraging artificial intelligence and user-specific data.

## Project Overview

The AI Career Path Advisor simplifies the career exploration process by offering an interactive platform that guides users through assessments and collects data to generate personalized career recommendations.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask framework)
- **Database:** PostgreSQL
- **AI Integration:** Groq API with Llama-3.3-70B-versatile model
- **Development Tools:** Git, Docker

## Setup and Installation

### Prerequisites

- Python 3.x
- PostgreSQL (or another supported database)
- Git
- Docker (optional, for easier local setup)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/ai-career-path-advisor.git
   cd ai-career-path-advisor
   ```

2. **Set Up Environment**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to include your Llama 3.3-70B-versatile Groq API key API keys and database credentials.

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Setup**
   Initialize your database using the provided scripts or commands.

5. **Run the Application**
   ```bash
   python app.py
   ```
   Access the application at `http://127.0.0.1:5000/`

### **Credentials**
   Default Username and Passwords:

   Username: user1 
   Password: password1
---

