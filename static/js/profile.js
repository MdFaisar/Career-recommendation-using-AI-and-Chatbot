// static/js/profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Form element animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        setTimeout(() => {
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add focus effects to form fields
    const formInputs = document.querySelectorAll('textarea, input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Character counter for textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        textarea.parentElement.appendChild(counter);
        
        function updateCounter() {
            const remaining = 500 - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        }
        
        // Initial update
        updateCounter();
        
        // Update on input
        textarea.addEventListener('input', updateCounter);
    });

    // Form validation
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = ['skills', 'interests'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Show error message
                let errorMsg = field.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    field.parentElement.appendChild(errorMsg);
                }
                errorMsg.textContent = 'This field is required';
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            // Shake form to indicate error
            profileForm.classList.add('shake');
            setTimeout(() => {
                profileForm.classList.remove('shake');
            }, 500);
        } else {
            // Add loading animation
            document.body.classList.add('loading');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Generating your personalized recommendations...';
            profileForm.appendChild(successMsg);
        }
    });

    // Skill tags functionality
    const skillsTextarea = document.getElementById('skills');
    const skillTagsContainer = document.createElement('div');
    skillTagsContainer.className = 'skill-tags-container';
    skillsTextarea.parentElement.appendChild(skillTagsContainer);
    
    // Parse initial skills
    if (skillsTextarea.value) {
        const initialSkills = skillsTextarea.value.split(',').map(s => s.trim()).filter(s => s);
        initialSkills.forEach(skill => {
            addSkillTag(skill);
        });
    }
    
    function addSkillTag(skill) {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-tag';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', function() {
            tag.remove();
            updateSkillsTextarea();
        });
        
        tag.appendChild(removeBtn);
        skillTagsContainer.appendChild(tag);
    }
    
    function updateSkillsTextarea() {
        const tags = skillTagsContainer.querySelectorAll('.skill-tag');
        const skills = Array.from(tags).map(tag => tag.textContent.replace('×', '').trim());
        skillsTextarea.value = skills.join(', ');
    }
    
    // Add skill when comma or enter is pressed
    skillsTextarea.addEventListener('keydown', function(e) {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const skill = this.value.trim();
            if (skill) {
                addSkillTag(skill);
                this.value = '';
                updateSkillsTextarea();
            }
        }
    });
});