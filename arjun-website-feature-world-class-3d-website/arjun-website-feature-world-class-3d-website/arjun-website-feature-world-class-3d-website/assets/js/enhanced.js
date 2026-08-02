/* ============================================
   ARJUN REALTY - Enhanced JS
   Futuristic interactions, parallax, morphing
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMorphingShapes();
    initImageLazyLoad();
    initProjectCardHover();
    initParallaxScroll();
    initEnhancedCounters();
    initTiltEffect();
});

// Morphing Background Shapes
function initMorphingShapes() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
        if (i % 2 === 0) {
            const shape = document.createElement('div');
            shape.className = 'morph-shape';
            shape.style.width = (Math.random() * 400 + 200) + 'px';
            shape.style.height = (Math.random() * 400 + 200) + 'px';
            shape.style.top = (Math.random() * 60 + 20) + '%';
            shape.style.left = (Math.random() * 60 + 20) + '%';
            shape.style.animationDelay = (Math.random() * -10) + 's';
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.appendChild(shape);
        }
    });
}

// Lazy load images with fade-in
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
}

// Project card hover effect
function initProjectCardHover() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '';
        });
    });
}

// Parallax scroll effect
function initParallaxScroll() {
    const floatingImages = document.querySelectorAll('.floating-img');
    const aboutImgs = document.querySelectorAll('.about-img-secondary, .about-img-accent');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        floatingImages.forEach((img, i) => {
            const speed = (i + 1) * 0.02;
            img.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        aboutImgs.forEach((img, i) => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = (i + 1) * 0.03;
                img.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * speed}px)`;
            }
        });
    });
}

// Enhanced counter with formatting
function initEnhancedCounters() {
    const counters = document.querySelectorAll('.achievement-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.count);
                animateValue(entry.target, 0, target, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        
        if (end >= 10000) {
            element.textContent = current.toLocaleString('en-IN');
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 3D Tilt effect on cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.achievement-item, .vision-card, .counter-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Smooth reveal for sections on mobile
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.05 });
    
    document.querySelectorAll('.section').forEach(section => {
        revealObserver.observe(section);
    });
}
