// static/js/login.js
document.addEventListener('DOMContentLoaded', function() {
    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        // Create and add label animation when input is focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add form validation
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Basic validation
            if (usernameInput.value.trim() === '') {
                showError(usernameInput, 'Username is required');
                isValid = false;
            } else {
                removeError(usernameInput);
            }
            
            if (passwordInput.value.trim() === '') {
                showError(passwordInput, 'Password is required');
                isValid = false;
            } else {
                removeError(passwordInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // Add loading state
                const submitBtn = document.querySelector('.login-btn');
                submitBtn.innerHTML = '<span class="loader"></span> Logging in...';
                submitBtn.disabled = true;
            }
        });
    }
    
    // Helper functions for validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.input-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'input-error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
        input.classList.add('error-border');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.input-error');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
        input.classList.remove('error-border');
    }
    
    // Handle register link click (for demonstration)
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Registration functionality would be implemented here.');
        });
    }
    
    // Add subtle animation to the login card
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
        setTimeout(() => {
            loginCard.classList.add('animated');
        }, 100);
    }
});