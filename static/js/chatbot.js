// static/js/chatbot.js
document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotDialog = document.getElementById('chatbotDialog');
    const closeChatbot = document.getElementById('closeChatbot');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Check if chatbot elements exist on this page
    if (!chatbotButton || !chatbotDialog) {
        console.warn("Chatbot elements not found on this page");
        return;
    }
    
    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', function() {
        chatbotDialog.classList.toggle('active');
        
        // Focus the input when opening
        if (chatbotDialog.classList.contains('active') && userInput) {
            userInput.focus();
        }
    });
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotDialog.classList.remove('active');
        });
    }
    
    // Send message function
    function sendUserMessage() {
        if (!userInput) return;
        
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing';
        typingIndicator.innerHTML = '<div class="message-content"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Send message to server
        fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Remove typing indicator
            chatbotMessages.removeChild(typingIndicator);
            
            // Add bot response
            addMessage(data.response, 'bot');
        })
        .catch(error => {
            // Remove typing indicator
            if (typingIndicator.parentNode === chatbotMessages) {
                chatbotMessages.removeChild(typingIndicator);
            }
            
            // Add error message
            addMessage("I'm sorry, I couldn't process your request. Please try again later or check your network.", 'bot');
            console.error('Error:', error);
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Process potential markdown/links in bot responses
        if (sender === 'bot') {
            // Simple markdown-like formatting
            const formattedText = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
                
            messageContent.innerHTML = formattedText;
        } else {
            messageContent.textContent = text;
        }
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Add message animation
        messageDiv.classList.add('message-appear');
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Event listeners for sending messages
    if (sendMessage) {
        sendMessage.addEventListener('click', sendUserMessage);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
    
    // Add some context-aware help based on the current page
    const currentPath = window.location.pathname;
    
    // Wait a moment after page load to show helpful message
    setTimeout(() => {
        if (currentPath.includes('/assessment')) {
            addMessage("I notice you're taking an assessment. If you have any questions about the process or need clarification on any of the questions, feel free to ask me!", 'bot');
        } else if (currentPath.includes('/profile')) {
            addMessage("I see you're filling out your profile. If you need help understanding what information to include or have questions about the form, just ask!", 'bot');
        } else if (currentPath.includes('/result')) {
            addMessage("Congratulations on completing your assessment! If you have questions about your career recommendations or want to understand them better, I'm here to help.", 'bot');
        } else {
            // Default home page
            // Welcome message already added in HTML
        }
    }, 2000);
});