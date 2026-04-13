/* ===================================================
   FORCASTLE — Global JavaScript
   =================================================== */

// Fade-up animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// FAQ accordion (services page)
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('open'));

        // Toggle current
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formContent = document.getElementById('formContent');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // ==========================================
        // EMAILJS CONFIGURATION
        // ==========================================
        const SERVICE_ID = 'service_ohqadvh';
        const TEMPLATE_ID = 'template_h8kq44m';
        const PUBLIC_KEY = 'uDQuw-tJHX6LOA-f3';

        if (typeof emailjs !== 'undefined' && SERVICE_ID !== 'YOUR_SERVICE_ID') {
            // Send via EmailJS
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, {
                publicKey: PUBLIC_KEY,
            })
            .then(() => {
                formContent.style.display = 'none';
                formSuccess.classList.add('show');
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send the message. Please try emailing directly.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        } else {
            // Fallback: Simulated submission for testing
            setTimeout(() => {
                formContent.style.display = 'none';
                formSuccess.classList.add('show');
            }, 1200);
        }
    });
}

// Active nav link highlighting
(function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();
