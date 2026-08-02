/* ============================================
   ARJUN REALTY - GSAP ScrollTrigger Animations
   Premium Scroll-Driven Animation Engine
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Wait for preloader to finish
    setTimeout(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            initAllAnimations();
        } else {
            // Fallback for no GSAP
            initFallbackAnimations();
        }
    }, 1200);
});

function initAllAnimations() {
    initHeroAnimation();
    initScrollTriggeredElements();
    initCounterAnimations();
    initParallaxEffects();
    initTextReveals();
    initStaggerGroups();
    initSectionTransitions();
    initServiceHoverAnimations();
}

/* === Hero Entrance Animation === */
function initHeroAnimation() {
    const heroTl = gsap.timeline({ delay: 1.8 });

    heroTl
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.title-line', {
            opacity: 0,
            y: 80,
            rotationX: -15,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out'
        }, '-=0.4')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-ctas .btn-primary, .hero-ctas .btn-secondary', {
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-stats', {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-corner-decor', {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out'
        }, '-=0.6');

    // Hero parallax on scroll
    gsap.to('.hero-content', {
        yPercent: 40,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    gsap.to('.hero-scroll-indicator', {
        opacity: 0,
        y: -20,
        scrollTrigger: {
            trigger: '.hero',
            start: '10% top',
            end: '30% top',
            scrub: 1
        }
    });
}


/* === Scroll-Triggered Element Animations === */
function initScrollTriggeredElements() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        const animationType = el.dataset.animate;

        let fromVars = { opacity: 0, duration: 0.9, ease: 'power3.out', delay: delay };

        switch (animationType) {
            case 'fade-up':
                fromVars.y = 50;
                break;
            case 'fade-right':
                fromVars.x = -60;
                fromVars.y = 0;
                break;
            case 'fade-left':
                fromVars.x = 60;
                fromVars.y = 0;
                break;
            case 'scale-in':
                fromVars.scale = 0.9;
                fromVars.y = 0;
                break;
            default:
                fromVars.y = 40;
        }

        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => {
                gsap.from(el, {
                    ...fromVars,
                    onComplete: () => el.classList.add('animated')
                });
            },
            once: true
        });
    });
}

/* === Counter Animations === */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            onEnter: () => {
                animateValue(counter, 0, target, 2200);
            },
            once: true
        });
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4); // ease-out-quart

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = ease(progress);
        const current = Math.floor(start + (end - start) * easedProgress);

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

/* === Parallax Effects === */
function initParallaxEffects() {
    // Section background text parallax
    document.querySelectorAll('.section-bg-text').forEach(text => {
        gsap.to(text, {
            yPercent: -30,
            scrollTrigger: {
                trigger: text.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });

    // About visual parallax
    const aboutVisual = document.querySelector('.about-visual-column');
    if (aboutVisual) {
        gsap.from(aboutVisual, {
            y: 60,
            scrollTrigger: {
                trigger: aboutVisual,
                start: 'top bottom',
                end: 'center center',
                scrub: 1.5
            }
        });
    }

    // Project cards subtle parallax
    document.querySelectorAll('.project-card-compact').forEach((card, i) => {
        gsap.from(card, {
            y: 30 + (i * 15),
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'center center',
                scrub: 1
            }
        });
    });

    // Award cards
    document.querySelectorAll('.award-card').forEach((card, i) => {
        gsap.from(card, {
            y: 20 + (i * 10),
            opacity: 0.5,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'center 70%',
                scrub: 1
            }
        });
    });
}


/* === Text Reveal Animations === */
function initTextReveals() {
    // Section titles reveal
    document.querySelectorAll('.section-title, .section-title-editorial').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Section tags
    document.querySelectorAll('.section-tag').forEach(tag => {
        gsap.from(tag, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: tag,
                start: 'top 88%',
                once: true
            }
        });
    });

    // Horizontal line reveals
    document.querySelectorAll('.signature-line, .line-expand').forEach(line => {
        gsap.from(line, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                once: true
            }
        });
    });
}

/* === Stagger Group Animations === */
function initStaggerGroups() {
    // Services stagger
    const servicesContainer = document.querySelector('.services-showcase');
    if (servicesContainer) {
        ScrollTrigger.create({
            trigger: servicesContainer,
            start: 'top 75%',
            onEnter: () => {
                gsap.from('.service-item-luxury', {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }

    // Features row stagger
    const featuresRow = document.querySelector('.about-features-row');
    if (featuresRow) {
        ScrollTrigger.create({
            trigger: featuresRow,
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.feature-card-luxury', {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }

    // Awards stagger
    const awardsGrid = document.querySelector('.awards-grid');
    if (awardsGrid) {
        ScrollTrigger.create({
            trigger: awardsGrid,
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.award-card', {
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'back.out(1.5)'
                });
            },
            once: true
        });
    }

    // Perk items stagger
    const perksContainer = document.querySelector('.careers-perks');
    if (perksContainer) {
        ScrollTrigger.create({
            trigger: perksContainer,
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.perk-item', {
                    opacity: 0,
                    x: 30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }

    // Sustainability cards stagger
    const sustainStack = document.querySelector('.sustain-card-stack');
    if (sustainStack) {
        ScrollTrigger.create({
            trigger: sustainStack,
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.sustain-card', {
                    opacity: 0,
                    x: 40,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }

    // Contact items stagger
    const contactDetails = document.querySelector('.contact-details');
    if (contactDetails) {
        ScrollTrigger.create({
            trigger: contactDetails,
            start: 'top 82%',
            onEnter: () => {
                gsap.from('.contact-item', {
                    opacity: 0,
                    x: -30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }
}


/* === Section Transitions === */
function initSectionTransitions() {
    // Footer CTA banner
    const ctaBanner = document.querySelector('.footer-cta-banner');
    if (ctaBanner) {
        gsap.from(ctaBanner, {
            opacity: 0,
            y: 50,
            scale: 0.97,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ctaBanner,
                start: 'top 85%',
                once: true
            }
        });
    }

    // World map animation
    const worldMap = document.querySelector('.world-map-container');
    if (worldMap) {
        gsap.from('.map-region', {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: worldMap,
                start: 'top 75%',
                once: true
            }
        });

        gsap.from('.map-marker', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5,
            scrollTrigger: {
                trigger: worldMap,
                start: 'top 75%',
                once: true
            }
        });

        gsap.from('.map-label', {
            opacity: 0,
            x: -20,
            duration: 0.7,
            stagger: 0.2,
            delay: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: worldMap,
                start: 'top 75%',
                once: true
            }
        });
    }

    // Project showcase
    const projectShowcase = document.querySelector('.project-card-full');
    if (projectShowcase) {
        gsap.from(projectShowcase, {
            opacity: 0,
            y: 60,
            scale: 0.97,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: projectShowcase,
                start: 'top 80%',
                once: true
            }
        });
    }

    // Testimonial card
    const testimonialCard = document.querySelector('.testimonial-card-luxury');
    if (testimonialCard) {
        gsap.from(testimonialCard, {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: testimonialCard,
                start: 'top 82%',
                once: true
            }
        });
    }

    // Contact form container
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        gsap.from(formContainer, {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: formContainer,
                start: 'top 80%',
                once: true
            }
        });
    }
}

/* === Service Hover Micro-Animations === */
function initServiceHoverAnimations() {
    const serviceItems = document.querySelectorAll('.service-item-luxury');

    serviceItems.forEach(item => {
        const index = item.querySelector('.service-index');
        const arrow = item.querySelector('.service-arrow');

        item.addEventListener('mouseenter', () => {
            if (index) {
                gsap.to(index, { scale: 1.2, opacity: 1, duration: 0.3, ease: 'power2.out' });
            }
            if (arrow) {
                gsap.to(arrow, { rotation: 45, duration: 0.3, ease: 'power2.out' });
            }
        });

        item.addEventListener('mouseleave', () => {
            if (index) {
                gsap.to(index, { scale: 1, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
            }
            if (arrow) {
                gsap.to(arrow, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            }
        });
    });
}

/* === Fallback Animations (No GSAP) === */
function initFallbackAnimations() {
    // Intersection Observer based fallback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // Counter fallback
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateValue(entry.target, 0, target, 2200);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // Navbar scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}
