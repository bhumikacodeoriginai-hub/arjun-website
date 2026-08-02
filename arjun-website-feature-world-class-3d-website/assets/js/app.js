/**
 * Arjun Realty — Premium Website JavaScript
 * Progressive Enhancement: All content works without JS
 * This file adds animations, interactivity, and 3D effects
 */

(function() {
    'use strict';

    // ===== THREE.JS BACKGROUND =====
    function initThreeBackground() {
        if (typeof THREE === 'undefined') return;

        const canvas = document.getElementById('three-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create floating wireframe shapes
        const shapes = [];
        const geometries = [
            new THREE.IcosahedronGeometry(1.5, 0),
            new THREE.OctahedronGeometry(1.2, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.TorusGeometry(1, 0.3, 8, 16),
            new THREE.DodecahedronGeometry(1, 0),
        ];

        const material = new THREE.MeshBasicMaterial({
            color: 0xc9a96e,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
        });

        for (let i = 0; i < 8; i++) {
            const geo = geometries[i % geometries.length];
            const mesh = new THREE.Mesh(geo, material.clone());
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.005, y: (Math.random() - 0.5) * 0.005 },
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatOffset: Math.random() * Math.PI * 2,
            };
            scene.add(mesh);
            shapes.push(mesh);
        }

        camera.position.z = 12;

        let animationId;
        function animate() {
            animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            shapes.forEach(shape => {
                shape.rotation.x += shape.userData.rotSpeed.x;
                shape.rotation.y += shape.userData.rotSpeed.y;
                shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.002;
            });

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }


    // ===== GSAP SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax
        const heroBg = document.getElementById('heroBg');
        if (heroBg) {
            gsap.to(heroBg, {
                y: '30%',
                scale: 1.2,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }

        // Reveal animations for all .reveal elements
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            el.classList.add('reveal-ready');
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => el.classList.add('revealed'),
                },
            });
        });

        // Stagger for grid items
        const grids = document.querySelectorAll('.projects-grid, .services-grid, .sustainability-features, .awards-grid, .testimonials-grid, .news-grid');
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.reveal-ready');
            if (items.length > 0) {
                gsap.to(items, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 80%',
                        once: true,
                    },
                });
            }
        });
    }


    // ===== ANIMATED COUNTERS =====
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const originalText = el.textContent;
        const hasPlusSign = originalText.includes('+');
        const hasPercent = originalText.includes('%');
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            let display = '';
            if (target >= 100000) {
                display = (current / 100000).toFixed(current >= target ? 0 : 1).replace(/\.0$/, '') + ',00,000';
                if (current >= target) display = '4,00,000';
            } else {
                display = current.toLocaleString('en-IN');
            }

            if (hasPlusSign) display += '+';
            if (hasPercent) display += '%';

            el.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = originalText;
            }
        }

        requestAnimationFrame(update);
    }

    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    // Close mobile nav
                    const navLinks = document.getElementById('navLinks');
                    if (navLinks) navLinks.classList.remove('active');
                }
            });
        });
    }


    // ===== DARK/LIGHT MODE TOGGLE =====
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        // Check saved preference
        const saved = localStorage.getItem('arjun-theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
            updateToggleIcon(toggle, saved);
        }

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('arjun-theme', next);
            updateToggleIcon(toggle, next);
        });
    }

    function updateToggleIcon(btn, theme) {
        btn.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
    }

    // ===== MOBILE NAV TOGGLE =====
    function initMobileNav() {
        const toggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        if (!toggle || !navLinks) return;

        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // ===== BOOK SITE VISIT MODAL =====
    function initModal() {
        const modal = document.getElementById('siteVisitModal');
        const openBtn = document.getElementById('bookVisitBtn');
        const closeBtn = document.getElementById('modalClose');
        if (!modal || !openBtn || !closeBtn) return;

        openBtn.addEventListener('click', () => modal.classList.add('active'));
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        // Handle site visit form
        const form = document.getElementById('siteVisitForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! Our team will contact you shortly to confirm your site visit.');
                modal.classList.remove('active');
                form.reset();
            });
        }
    }


    // ===== CONTACT FORM HANDLER =====
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Contact form submitted:', data);
            alert('Thank you for your inquiry! Our team will respond within 24 hours.');
            form.reset();
        });
    }

    // ===== NAVBAR SCROLL BEHAVIOR =====
    function initNavScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                nav.style.padding = '12px 0';
                nav.style.boxShadow = '0 2px 40px rgba(0,0,0,0.06)';
            } else {
                nav.style.padding = '18px 0';
                nav.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        });
    }

    // ===== INITIALIZATION =====
    function init() {
        initThreeBackground();
        initScrollAnimations();
        initCounters();
        initSmoothScroll();
        initThemeToggle();
        initMobileNav();
        initModal();
        initContactForm();
        initNavScroll();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
