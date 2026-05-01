// Loading Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const body = document.body;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.8s ease';
                body.classList.remove('loading');
                body.classList.add('loaded');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
        
        if (loaderBar) loaderBar.style.width = `${progress}%`;
    }, 80);
});

// Initialize Lucide icons
lucide.createIcons();

// Custom Cursor with Magnetic Effect
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.createElement('div');
cursorInner.className = 'cursor-inner';
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Smooth cursor follow
        cursor.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .glass-card, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.background = 'rgba(145, 94, 255, 0.2)';
            cursor.style.border = '1px solid var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary-glow)';
            cursor.style.border = 'none';
        });
    });
}

// Background Blobs Parallax
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Magnetic Buttons
const magneticButtons = document.querySelectorAll('.social-btn, .btn-primary, .resume-btn');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Animate progress bars if the entry is the skills section
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

function animateSkills() {
    const skillBars = document.querySelectorAll('.progress-fill');
    skillBars.forEach(bar => {
        const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        bar.style.width = targetWidth;
    });
}

// Typing Animation
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const textArray = [
        "Full Stack Developer",
        "React.js Specialist",
        "UI/UX Enthusiast",
        "Problem Solver"
    ];
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

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2500; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1500);
}

// Smooth Scroll Progress
window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollLen = (scrollPx / winHeightPx) * 100;
    const progress = document.querySelector('.scroll-progress');
    if (progress) progress.style.width = scrollLen + '%';
    
    // Navbar Blur on Scroll
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        nav.style.background = 'rgba(5, 8, 22, 0.95)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.background = 'rgba(5, 8, 22, 0.8)';
    }

    // Active Section Highlight
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active-link');
        }
    });
});

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

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
            // Close mobile menu
            if (navLinks) navLinks.classList.remove('active');
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
        
        setTimeout(() => {
            btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
            btn.style.background = 'var(--secondary)';
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

