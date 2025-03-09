// static/js/assessment.js
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const answersInput = document.getElementById('answersInput');
    const options = document.querySelectorAll('.option');
    const progressBar = document.querySelector('.progress-bar-inner');
    
    let currentQuestion = 0;
    let answers = [];
    
    // Initialize answers array
    for (let i = 0; i < questions.length; i++) {
        answers.push({
            category: questions[i].dataset.category,
            score: null
        });
        
        // For interests assessment, add interest field if available
        const interestOptions = questions[i].querySelectorAll('.option[data-interest]');
        if (interestOptions.length > 0) {
            answers[i].interest = null;
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update question counter
        const counter = document.querySelector('.question-counter');
        if (counter) {
            counter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        }
        
        // Add animation to progress bar
        progressBar.classList.add('progress-animate');
        setTimeout(() => {
            progressBar.classList.remove('progress-animate');
        }, 300);
    }
    
    // Initialize progress
    updateProgress();
    
    // Handle option selection with animation
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Add animation to selected option
            this.classList.add('option-selected-animation');
            
            // Remove selected class from siblings
            const parentOptions = this.parentElement.querySelectorAll('.option');
            parentOptions.forEach(opt => {
                opt.classList.remove('selected');
                if (opt !== this) {
                    opt.classList.remove('option-selected-animation');
                }
            });
            
            // Add selected class to this option
            this.classList.add('selected');
            
            // Store answer
            answers[currentQuestion].score = parseInt(this.dataset.score);
            
            // Store interest if available
            if (this.dataset.interest) {
                answers[currentQuestion].interest = this.dataset.interest;
            }
            
            // Enable next button with fade-in
            nextBtn.disabled = false;
            nextBtn.classList.add('fade-in');
            
            // Add confetti effect for fun engagement
            createConfetti(5);
        });
    });
    
    // Handle next button
    nextBtn.addEventListener('click', function() {
        // Add transition effect
        questions[currentQuestion].classList.add('slide-out-left');
        
        setTimeout(() => {
            // Hide current question
            questions[currentQuestion].style.display = 'none';
            questions[currentQuestion].classList.remove('slide-out-left');
            
            // Show next question
            currentQuestion++;
            questions[currentQuestion].style.display = 'block';
            questions[currentQuestion].classList.add('slide-in-right');
            
            setTimeout(() => {
                questions[currentQuestion].classList.remove('slide-in-right');
            }, 500);
            
            // Update buttons
            prevBtn.disabled = false;
            
            if (currentQuestion === questions.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
                submitBtn.classList.add('pulse-animation');
            }
            
            // Disable next button until an option is selected
            nextBtn.disabled = true;
            nextBtn.classList.remove('fade-in');
            
            // If an answer is already selected for this question, enable next button
            if (answers[currentQuestion].score !== null) {
                nextBtn.disabled = false;
                
                // Also highlight the selected option
                const options = questions[currentQuestion].querySelectorAll('.option');
                options.forEach(option => {
                    if (parseInt(option.dataset.score) === answers[currentQuestion].score) {
                        option.classList.add('selected');
                    }
                });
            }
            
            // Update progress
            updateProgress();
        }, 300);
    });
    
    // Handle previous button
    prevBtn.addEventListener('click', function() {
        // Add transition effect
        questions[currentQuestion].classList.add('slide-out-right');
        
        setTimeout(() => {
            // Hide current question
            questions[currentQuestion].style.display = 'none';
            questions[currentQuestion].classList.remove('slide-out-right');
            
            // Show previous question
            currentQuestion--;
            questions[currentQuestion].style.display = 'block';
            questions[currentQuestion].classList.add('slide-in-left');
            
            setTimeout(() => {
                questions[currentQuestion].classList.remove('slide-in-left');
            }, 500);
            
            // Update buttons
            nextBtn.disabled = false;
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            submitBtn.classList.remove('pulse-animation');
            
            if (currentQuestion === 0) {
                prevBtn.disabled = true;
            }
            
            // Update progress
            updateProgress();
        }, 300);
    });
    
    // Handle form submission
    document.getElementById('assessmentForm').addEventListener('submit', function(e) {
        // Add loading animation
        document.body.classList.add('loading');
        
        // Populate hidden input with answers
        answersInput.value = JSON.stringify(answers);
    });
    
    // Create confetti effect
    function createConfetti(count) {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random() * 0.7 + 0.3;
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    function getRandomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});