// Loading Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const body = document.body;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10; // Fast progress
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Short wait at 100% then smooth transition
            setTimeout(() => {
                loader.classList.add('fade-out');
                body.classList.remove('loading');
                body.classList.add('loaded');
                
                // Remove loader from DOM after transition
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 600);
            }, 300);
        }
        
        if (loaderBar) loaderBar.style.width = `${progress}%`;
    }, 100);
});

// Initialize Lucide icons
lucide.createIcons();

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i data-lucide="loader-2" class="animate-spin"></i>';
        lucide.createIcons();
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
            btn.style.background = '#10b981'; // Emerald
            lucide.createIcons();
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(3, 7, 18, 0.95)';
    } else {
        nav.style.background = 'rgba(3, 7, 18, 0.8)';
    }
});

/* --- Premium Enhancements --- */

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .contact-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(236, 72, 153, 0.4)'; // Pink glow
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'var(--primary-glow)';
        });
    });
}

// Scroll Progress
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollLen = (scrollPx / winHeightPx) * 100;
        scrollProgress.style.width = scrollLen + '%';
    });
}

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Active Section Highlight (Scrollspy)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active-link');
        }
    });
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.progress-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.parentElement.previousElementSibling.lastElementChild.textContent;
            entry.target.style.width = targetWidth;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.width = '0'; // Reset initially
    skillObserver.observe(bar);
});

// Typing Animation
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const textArray = ["Aspiring Full Stack Dev", "React.js Enthusiast", "Backend Developer", "UI/UX Lover"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

