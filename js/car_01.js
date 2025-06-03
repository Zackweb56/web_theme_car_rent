
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form submission
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Merci pour votre demande de réservation! Nous vous contacterons sous peu pour confirmation.');
            this.reset();
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fadeIn');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Set minimum date for pickup and return dates
    const today = new Date().toISOString().split('T')[0];
    const pickupDateInput = document.getElementById('pickup-date');
    const returnDateInput = document.getElementById('return-date');
    
    if (pickupDateInput) {
        pickupDateInput.min = today;
        
        pickupDateInput.addEventListener('change', function() {
            if (returnDateInput) {
                returnDateInput.min = this.value;
                
                if (returnDateInput.value && returnDateInput.value < this.value) {
                    returnDateInput.value = this.value;
                }
            }
        });
    }
});

