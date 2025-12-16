// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("eiJKHZXwddxrZ4imJ"); // Replace with your actual public key from EmailJS dashboard
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sticky navigation background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form validation for contact form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const role = form.querySelector('#role');
            const subject = form.querySelector('#subject');
            const message = form.querySelector('#message');
            let isValid = true;

            // Reset previous errors
            form.querySelectorAll('.error').forEach(error => error.remove());

            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Role validation
            if (!role.value) {
                showError(role, 'Please select your role');
                isValid = false;
            }

            // Subject validation
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Send email using EmailJS
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;

                // EmailJS parameters - Replace with your actual service ID and template ID
                const serviceID = 'service_xl8and9'; // Use Outlook service
                const templateID = 'template_sttvyjr';

                const templateParams = {
                    from_name: name.value,
                    from_email: email.value,
                    role: role.value,
                    subject: subject.value,
                    message: message.value,
                    to_email: 'csinternshipoffice@cuiatd.edu.pk'
                };

                emailjs.send(serviceID, templateID, templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        alert('Thank you for your message! We will get back to you soon.');
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('Sorry, there was an error sending your message. Please try again later.');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'var(--danger-red)';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.style.borderColor = 'var(--danger-red)';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to cards
    const cards = document.querySelectorAll('.overview-card, .link-card, .application-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Additional JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all page-specific functionality
    initializePageFeatures();
    
    // Add smooth animations
    addScrollAnimations();
});

function initializePageFeatures() {
    // Initialize contact form validation
    validateForm('contactForm');
    
    // Initialize tab functionality if exists
    initializeTabs();
    
    // Initialize FAQ toggles if exists
    initializeFAQs();
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
}

function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3, h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Hide answer initially
            answer.style.display = 'none';
            
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const isVisible = answer.style.display === 'block';
                answer.style.display = isVisible ? 'none' : 'block';
                this.classList.toggle('active');
            });
        }
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all info cards and sidebar cards
    document.querySelectorAll('.info-card, .sidebar-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}