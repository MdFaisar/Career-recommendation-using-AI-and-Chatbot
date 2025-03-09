// static/js/main.js
import './chatbot.js';

document.addEventListener('DOMContentLoaded', function() {
    // Add subtle fade-in animation for page elements
    const mainElements = document.querySelectorAll('main > *');
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add pulsing animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        setInterval(() => {
            logo.classList.add('pulse');
            setTimeout(() => {
                logo.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }

    // Add tooltip functionality if there are any tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.top = rect.bottom + 10 + 'px';
            tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2) + 'px';
            tooltipEl.style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipEl = document.querySelector('.tooltip');
            if (tooltipEl) {
                tooltipEl.style.opacity = '0';
                setTimeout(() => {
                    tooltipEl.remove();
                }, 300);
            }
        });
    });
});