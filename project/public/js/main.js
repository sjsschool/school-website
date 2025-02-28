// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
});

// Enroll button click handler with modern alert
document.querySelectorAll('.enroll-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Create modal container
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #2563eb; font-size: 1.5rem;">Thank you for your interest!</h3>
            <p style="margin-bottom: 1.5rem; color: #1f2937;">Our admissions team will contact you shortly to guide you through the enrollment process.</p>
            <button style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer; width: 100%;">Close</button>
        `;

        // Add modal to body
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Show modal with animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        });

        // Close modal on button click or outside click
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        };

        modalContent.querySelector('button').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('.feature-card, .program-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});