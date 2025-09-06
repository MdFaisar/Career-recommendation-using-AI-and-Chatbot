# 🎯 AI Career Path Advisor

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_App-blue?style=for-the-badge)](https://your-demo-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/your-username/ai-career-path-advisor)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A comprehensive web application designed to assist individuals in discovering their ideal career paths by leveraging artificial intelligence and user-specific data.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

## 🔍 Overview

The AI Career Path Advisor simplifies the career exploration process by offering an interactive platform that guides users through comprehensive assessments and collects data to generate personalized career recommendations. Our intelligent system uses advanced AI models to analyze user profiles and provide tailored career guidance.

### Key Highlights
- 🤖 **AI-Powered Recommendations** - Leverages Groq API with Llama-3.3-70B-versatile model
- 📊 **Interactive Assessments** - Comprehensive career evaluation tools
- 🎨 **Modern UI/UX** - Clean, responsive design for optimal user experience
- 🔒 **Secure Authentication** - User data protection and privacy

## ✨ Features

- **Intelligent Career Assessment** - AI-driven questionnaires and skill evaluations
- **Personalized Recommendations** - Tailored career path suggestions based on user data
- **Interactive Dashboard** - Visual representation of career insights and progress
- **Responsive Design** - Seamless experience across desktop and mobile devices
- **User Profile Management** - Save and track career exploration journey
- **Real-time Analysis** - Instant feedback and recommendations

## 🛠 Tech Stack

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
- ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)

### Database
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

### AI Integration
- **Groq API** with Llama-3.3-70B-versatile model

### Development Tools
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## 🚀 Quick Start

Get the application running in minutes with our quick start guide:

```bash
# Clone the repository
git clone https://github.com/your-username/ai-career-path-advisor.git
cd ai-career-path-advisor

# Set up environment variables
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## 📥 Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.8+** - [Download Python](https://python.org/downloads/)
- **PostgreSQL** - [Download PostgreSQL](https://postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Docker** (Optional) - [Download Docker](https://docker.com/get-started/)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-career-path-advisor.git
   cd ai-career-path-advisor
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL=postgresql://username:password@localhost:5432/career_advisor
   FLASK_SECRET_KEY=your_secret_key_here
   FLASK_ENV=development
   ```

3. **Install Dependencies**
   ```bash
   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install required packages
   pip install -r requirements.txt
   ```

4. **Database Setup**
   ```bash
   # Initialize database
   python init_db.py
   
   # Run migrations (if applicable)
   flask db upgrade
   ```

5. **Run the Application**
   ```bash
   python app.py
   ```
   
   The application will be available at: `http://127.0.0.1:5000/`

### Docker Setup (Alternative)

```bash
# Build and run with Docker
docker-compose up --build
```

## 🎮 Usage

### Demo Credentials

For testing purposes, use these default credentials:

| Username | Password |
|----------|----------|
| `user1`  | `password1` |

### Getting Started

1. **Sign Up/Login** - Create an account or use demo credentials
2. **Complete Assessment** - Take the comprehensive career evaluation
3. **View Recommendations** - Explore AI-generated career suggestions
4. **Track Progress** - Monitor your career exploration journey
5. **Export Results** - Save or share your career insights

## 📚 API Reference

### Authentication Endpoints
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Career Assessment Endpoints
```http
GET  /api/assessment/questions
POST /api/assessment/submit
GET  /api/assessment/results
```

### User Profile Endpoints
```http
GET  /api/user/profile
PUT  /api/user/profile
GET  /api/user/recommendations
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing the AI API
- [Flask](https://flask.palletsprojects.com/) community for the excellent framework
- All contributors who helped make this project better

## 📞 Support

- 📧 **Email**: support@career-advisor.com
- 💬 **Issues**: [GitHub Issues](https://github.com/your-username/ai-career-path-advisor/issues)
- 📖 **Documentation**: [Wiki](https://github.com/your-username/ai-career-path-advisor/wiki)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>⭐ Star this repository if it helped you!</p>
</div>
