const aboutMeText = `$ ./about_govind.sh
==INITIALIZING SYSTEM==
Loading user profile...

hi i'm Govind,
i'm a 17 year old, trying to get through life lmao.
i have so much love for things like maths, physics and music.

Here are some fun facts about me:
- birthplace: Uttar Pradesh, India
- favorite bands: radiohead, the strokes, pcrc and so on
- something i know: guitar (still no huzz)
- currently: aspiring to be a cs major (lol)
- things i do when I'm free: sleep, eat and watch useless memes

==SYSTEM READY==
Welcome to my digital space! 🚀
`;

const typedText = document.getElementById('typed-text');
let i = 0;
let isTyping = false;

function typeWriter() {
    if (i < aboutMeText.length && !isTyping) {
        isTyping = true;
        typedText.textContent += aboutMeText.charAt(i);
        i++;
        
        // Add some randomness to typing speed for more realistic effect
        const baseSpeed = 25;
        const variation = Math.random() * 20;
        const speed = baseSpeed + variation;
        
        setTimeout(() => {
            isTyping = false;
            typeWriter();
        }, speed);
    }
}

// Add cursor blinking effect
function addCursor() {
    const cursor = document.createElement('span');
    cursor.textContent = '█';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.color = '#27ca3f';
    typedText.appendChild(cursor);
}

// CSS for cursor animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start typing when page loads
window.onload = function() {
    setTimeout(() => {
        typeWriter();
        setTimeout(addCursor, aboutMeText.length * 30);
    }, 500);
};

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default for anchor links within the same page
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add gallery image loading effect
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

// Observe gallery items for animation
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Add terminal focus effect
const terminalContainer = document.querySelector('.terminal-container');
if (terminalContainer) {
    terminalContainer.addEventListener('click', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 0 2px #27ca3f';
        setTimeout(() => {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        }, 200);
    });
}