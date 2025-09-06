# 🎯 AI Career Path Advisor

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_App-blue?style=for-the-badge)](https://faisar.pythonanywhere.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/MdFaisar/Career-recommendation-using-AI-and-Chatbot)
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

The AI Career Path Advisor simplifies the career exploration process by offering an interactive platform that guides users through comprehensive assessments and collects data to generate personalized career recommendations. Our intelligent system uses advanced AI models to analyze user profiles and provide tailored career guidance with an integrated chatbot for real-time assistance.

### Key Highlights
- 🤖 **AI-Powered Recommendations** - Leverages advanced AI models for career guidance
- 💬 **Interactive Chatbot** - Real-time career assistance and guidance
- 📊 **Interactive Assessments** - Comprehensive career evaluation tools
- 🎨 **Modern UI/UX** - Clean, responsive design for optimal user experience
- 🔒 **Secure Authentication** - Firebase-powered user authentication and data security
- ☁️ **Cloud-Based** - Firebase real-time database for seamless data management

## ✨ Features

- **Intelligent Career Assessment** - AI-driven questionnaires and skill evaluations
- **AI Chatbot Integration** - Interactive chatbot for instant career advice
- **Personalized Recommendations** - Tailored career path suggestions based on user data
- **Interactive Dashboard** - Visual representation of career insights and progress
- **Responsive Design** - Seamless experience across desktop and mobile devices
- **User Profile Management** - Save and track career exploration journey with Firebase
- **Real-time Analysis** - Instant feedback and recommendations
- **Cloud Synchronization** - Access your data from anywhere with Firebase

## 🛠 Tech Stack

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
- ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)

### Database & Cloud Services
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)

### Development Tools
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

### Deployment
- ![PythonAnywhere](https://img.shields.io/badge/PythonAnywhere-1D4F8C?style=flat&logo=python&logoColor=white)

## 🚀 Quick Start

Get the application running in minutes with our quick start guide:

```bash
# Clone the repository
git clone https://github.com/MdFaisar/Career-recommendation-using-AI-and-Chatbot.git
cd Career-recommendation-using-AI-and-Chatbot

# Set up environment variables
cp .env

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## 📥 Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.8+** - [Download Python](https://python.org/downloads/)
- **Firebase Account** - [Firebase Console](https://console.firebase.google.com/)
- **Git** - [Download Git](https://git-scm.com/downloads/)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MdFaisar/Career-recommendation-using-AI-and-Chatbot.git
   cd Career-recommendation-using-AI-and-Chatbot
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your Firebase and AI configuration:
   ```env
   # Firebase Configuration
   FIREBASE_API_KEY=your_firebase_api_key_here
   FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   
   # Flask Configuration
   FLASK_SECRET_KEY=your_secret_key_here
   FLASK_ENV=development
   
   # AI API Configuration (if using external AI service)
   AI_API_KEY=your_ai_api_key_here
   AI_MODEL=your_preferred_model
   ```

3. **Install Dependencies**
   ```bash
   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install required packages
   pip install -r requirements.txt
   ```

4. **Firebase Setup**
   ```bash
   # Set up Firebase configuration
   # 1. Go to Firebase Console (https://console.firebase.google.com/)
   # 2. Create a new project or select existing one
   # 3. Enable Authentication and Realtime Database
   # 4. Copy your Firebase config to .env file
   # 5. Update firebase-config.js with your Firebase configuration
   ```

5. **Run the Application**
   ```bash
   python app.py
   ```
   
   The application will be available at: `http://127.0.0.1:5000/`

### Firebase Configuration

Create a `firebase-config.js` file in your static/js directory:

```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
```

## 🎮 Usage

### Demo Credentials

For testing purposes, you can create an account or use these credentials if available:

| Username | Password |
|----------|----------|
| `user1`  | `password1` |

### Getting Started

1. **Visit the Live Demo** - Go to [https://tripai.pythonanywhere.com/](https://tripai.pythonanywhere.com/)
2. **Sign Up/Login** - Create a new account using Firebase authentication
3. **Complete Assessment** - Take the comprehensive career evaluation
4. **Chat with AI Bot** - Get instant career advice from our intelligent chatbot
5. **View Recommendations** - Explore AI-generated career suggestions
6. **Track Progress** - Monitor your career exploration journey
7. **Export Results** - Save or share your career insights

### Key Features Usage

- **Career Assessment**: Complete interactive questionnaires to assess your skills and interests
- **AI Chatbot**: Ask career-related questions and get instant, personalized responses
- **Dashboard**: View your career profile, recommendations, and progress
- **Profile Management**: Update your information and preferences
- **Real-time Sync**: All your data is automatically synced with Firebase

## 📚 API Reference

### Authentication Endpoints
```http
POST /api/auth/login          # User login
POST /api/auth/register       # User registration  
POST /api/auth/logout         # User logout
GET  /api/auth/verify         # Verify authentication status
```

### Career Assessment Endpoints
```http
GET  /api/assessment/questions    # Get assessment questions
POST /api/assessment/submit       # Submit assessment responses
GET  /api/assessment/results      # Get assessment results
PUT  /api/assessment/update       # Update assessment responses
```

### Chatbot Endpoints
```http
POST /api/chatbot/message         # Send message to AI chatbot
GET  /api/chatbot/history         # Get chat history
DELETE /api/chatbot/clear         # Clear chat history
```

### User Profile Endpoints
```http
GET  /api/user/profile            # Get user profile
PUT  /api/user/profile            # Update user profile
GET  /api/user/recommendations    # Get career recommendations
POST /api/user/save-career        # Save career to favorites
```

### Firebase Integration Endpoints
```http
GET  /api/firebase/sync           # Sync data with Firebase
POST /api/firebase/backup         # Backup user data
GET  /api/firebase/restore        # Restore user data
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

### Development Guidelines

- Follow PEP 8 style guide for Python code
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure Firebase integration works properly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for providing cloud services and authentication
- [Flask](https://flask.palletsprojects.com/) community for the excellent framework
- [PythonAnywhere](https://www.pythonanywhere.com/) for reliable hosting services
- All contributors who helped make this project better

## 📞 Support

- 📧 **Email**: support@career-advisor.com
- 💬 **Issues**: [GitHub Issues](https://github.com/MdFaisar/Career-recommendation-using-AI-and-Chatbot/issues)
- 📖 **Documentation**: [Wiki](https://github.com/MdFaisar/Career-recommendation-using-AI-and-Chatbot/wiki)
- 🌐 **Live Demo**: [https://faisar.pythonanywhere.com/](https://faisar.pythonanywhere.com/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/MdFaisar">MdFaisar</a></p>
  <p>⭐ Star this repository if it helped you!</p>
</div>

