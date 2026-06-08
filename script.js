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

// Background Blobs Parallax
document.addEventListener('mousemove', (e) => {
    const blobWrappers = document.querySelectorAll('.blob-wrapper');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobWrappers.forEach((wrapper, index) => {
        const speed = (index + 1) * 35;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        wrapper.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
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
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

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

// --- Live Terminal Interface ---
const termInput = document.getElementById('terminal-input');
const termHistory = document.getElementById('terminal-history');
const termWindow = document.querySelector('.terminal-window');

if (termInput && termHistory) {
    // Keep focus inside terminal when clicking it
    termWindow.addEventListener('click', () => {
        termInput.focus();
    });

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = termInput.value.trim().toLowerCase();
            const promptText = 'guest@mk:~$';
            
            // Print command line
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-row';
            cmdLine.innerHTML = `<span class="prompt-text">${promptText}</span> <span>${termInput.value}</span>`;
            termHistory.appendChild(cmdLine);
            
            // Execute command
            if (command) {
                const response = executeCommand(command);
                if (response !== '') {
                    const respLine = document.createElement('div');
                    respLine.className = 'terminal-row';
                    respLine.innerHTML = response;
                    termHistory.appendChild(respLine);
                }
            }
            
            // Reset input and scroll down
            termInput.value = '';
            const body = document.getElementById('terminal-body');
            if (body) {
                body.scrollTop = body.scrollHeight;
            }
        }
    });

    function executeCommand(cmd) {
        switch (cmd) {
            case 'help':
                return `Available commands:<br>
                  • <span class="term-highlight">about</span> - Detailed intro<br>
                  • <span class="term-highlight">skills</span> - Full tech stack details<br>
                  • <span class="term-highlight">projects</span> - View project tags & descriptions<br>
                  • <span class="term-highlight">contact</span> - Social profile endpoints<br>
                  • <span class="term-highlight">clear</span> - Clear command prompt buffer<br>
                  • <span class="term-highlight">secret</span> - Run easter egg trigger`;
            case 'about':
                return `I am a Computer Science & Engineering student at Rathinam Technical Campus. Passionate about solving real-world challenges through full stack engineering. Active CGPA: 8.47.`;
            case 'skills':
                return `Frontend: HTML5, CSS3, JavaScript, React.js<br>
                  Backend: Java, Django (Python)<br>
                  Database: PostgreSQL, MySQL<br>
                  Tools: Git/GitHub, Power BI, Excel`;
            case 'projects':
                return `1. Local Problem Solver (React + Django)<br>
                  2. E-Commerce Electronic Store (React)<br>
                  3. Customer Shopping Behavior Study (Power BI)`;
            case 'contact':
                return `Email: moulidharank11@gmail.com<br>
                  GitHub: moulidharan112006<br>
                  LinkedIn: Moulidharan K<br>
                  WhatsApp: +91 87785 31662`;
            case 'clear':
                termHistory.innerHTML = '';
                return '';
            case 'secret':
                return `✨ Initializing warp drive...<br>
                  🚀 SUCCESS: You bypassed the portfolio grid matrix!<br>
                  👾 Secret greeting: "Hello World! Have a great day!"`;
            default:
                return `bash: command not found: <span style="color: #ff5f56;">${cmd}</span>. Type <span class="term-highlight">help</span> for support.`;
        }
    }
}

// --- 3D Card Tilt & Spotlight Glow ---
const projectCardsList = document.querySelectorAll('.project-card');
projectCardsList.forEach(card => {
    // Append shine element dynamically
    let shine = card.querySelector('.project-shine');
    if (!shine) {
        shine = document.createElement('div');
        shine.classList.add('project-shine');
        card.appendChild(shine);
    }
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const maxTilt = 8; // Max rotation degrees
        const rotateX = ((centerY - y) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        shine.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        shine.style.background = 'transparent';
    });
});

// --- Project Filtering with Transitions ---
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCardsList.forEach(card => {
            const categoryAttr = card.getAttribute('data-category');
            const cats = categoryAttr ? categoryAttr.split(' ') : [];
            
            if (filter === 'all' || cats.includes(filter)) {
                card.style.display = 'block';
                card.offsetHeight; // force browser reflow
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85) translateY(20px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 350);
            }
        });
    });
});


