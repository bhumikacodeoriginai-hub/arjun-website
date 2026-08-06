/* ============================================
   ARJUN REALTY - UX Enhancements
   Touch-optimized, Zero-lag, Cross-device
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initEnhancedBackToTop();
    initLiveVisitorBadge();
    initSectionReveal();
    initTouchOptimizations();
    initSmartQuickActionsBar();
    initPerformanceOptimizations();
});

/* === ENHANCED BACK TO TOP WITH SMOOTH FEEDBACK === */
function initEnhancedBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    // Override click with smooth momentum scroll
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Vibration API for haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }

        // Smooth scroll with easing
        const startY = window.pageYOffset;
        const duration = Math.min(800, startY * 0.5); // Adaptive duration
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            
            window.scrollTo(0, startY * (1 - eased));
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    });

    // Visual feedback on press
    btn.addEventListener('touchstart', () => {
        btn.style.transform = 'scale(0.88)';
    }, { passive: true });

    btn.addEventListener('touchend', () => {
        btn.style.transform = '';
    }, { passive: true });
}

/* === LIVE VISITOR ENGAGEMENT INDICATOR === */
function initLiveVisitorBadge() {
    // Only show on desktop
    if (window.innerWidth < 1025) return;

    const badge = document.createElement('div');
    badge.className = 'live-visitors-badge';
    badge.setAttribute('aria-hidden', 'true');
    
    // Simulate live visitor count (realistic range)
    const baseVisitors = Math.floor(Math.random() * 8) + 12; // 12-19
    
    badge.innerHTML = `
        <span class="live-dot"></span>
        <span class="live-count">${baseVisitors} viewing</span>
    `;
    
    document.body.appendChild(badge);

    // Show after user scrolls past hero
    let shown = false;
    const showObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !shown) {
                shown = true;
                setTimeout(() => badge.classList.add('visible'), 2000);
            }
        });
    }, { threshold: 0 });

    const hero = document.getElementById('home');
    if (hero) showObserver.observe(hero);

    // Subtly update count periodically
    setInterval(() => {
        const countEl = badge.querySelector('.live-count');
        if (countEl) {
            const current = parseInt(countEl.textContent) || baseVisitors;
            const change = Math.random() > 0.5 ? 1 : -1;
            const newCount = Math.max(8, Math.min(25, current + change));
            countEl.textContent = newCount + ' viewing';
        }
    }, 15000);
}

/* === SECTION REVEAL ON SCROLL === */
function initSectionReveal() {
    // Use IntersectionObserver for performant scroll animations
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-reveal', 'revealed');
                // Unobserve once revealed for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        // Don't add reveal class to hero - it's always visible
        if (section.id !== 'home') {
            section.classList.add('section-reveal');
            revealObserver.observe(section);
        }
    });
}

/* === TOUCH OPTIMIZATIONS === */
function initTouchOptimizations() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    // Faster click response - remove 300ms delay on older browsers
    document.addEventListener('touchstart', function() {}, { passive: true });

    // Prevent rubber-band scroll on iOS for fixed elements
    const fixedElements = document.querySelectorAll('.quick-actions-bar, .floating-actions-container, .navbar');
    fixedElements.forEach(el => {
        el.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });

    // Add active states faster for touch feedback
    const interactiveElements = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .quick-action-item, .whatsapp-float, ' +
        '.hero-unmute-btn, .gallery-filter-btn, .social-link, .chatbot-trigger, ' +
        '.faq-item summary, .nav-link, .nav-toggle'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });

        el.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('touch-active'), 150);
        }, { passive: true });

        el.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Swipe-to-close for lightbox
    initLightboxSwipe();
}

/* === LIGHTBOX SWIPE GESTURE === */
function initLightboxSwipe() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);

        // Only register horizontal swipes (not vertical scrolls)
        if (Math.abs(diffX) > 60 && diffY < 100) {
            if (diffX > 0) {
                // Swipe right = previous
                const prev = lightbox.querySelector('.lightbox-prev');
                if (prev) prev.click();
            } else {
                // Swipe left = next
                const next = lightbox.querySelector('.lightbox-next');
                if (next) next.click();
            }
        }

        // Swipe down to close
        const verticalDiff = e.changedTouches[0].screenY - touchStartY;
        if (verticalDiff > 100 && Math.abs(diffX) < 50) {
            const close = lightbox.querySelector('.lightbox-close');
            if (close) close.click();
        }
    }, { passive: true });
}

/* === SMART QUICK ACTIONS BAR - Hide on scroll down, show on scroll up === */
function initSmartQuickActionsBar() {
    const bar = document.getElementById('quickActionsBar');
    if (!bar) return;

    let lastScrollY = 0;
    let ticking = false;
    const threshold = 5;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.pageYOffset;
                
                if (currentScrollY > lastScrollY + threshold && currentScrollY > 200) {
                    // Scrolling down - hide bar
                    bar.classList.add('hidden');
                } else if (currentScrollY < lastScrollY - threshold || currentScrollY < 100) {
                    // Scrolling up - show bar
                    bar.classList.remove('hidden');
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* === PERFORMANCE OPTIMIZATIONS === */
function initPerformanceOptimizations() {
    // Lazy load images that aren't in viewport
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Trigger decode for smoother rendering
                    if (img.decode) {
                        img.decode().catch(() => {});
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Pause videos not in viewport (battery saver)
    const allVideos = document.querySelectorAll('video:not(.hero-bg-video)');
    if (allVideos.length && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.paused && video.autoplay) {
                        video.play().catch(() => {});
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.1 });

        allVideos.forEach(v => videoObserver.observe(v));
    }

    // Reduce animation complexity when battery is low
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 && !battery.charging) {
                document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
                document.documentElement.style.setProperty('--transition-slow', 'all 0.3s ease');
                // Reduce particles
                const particles = document.getElementById('particles');
                if (particles) particles.style.display = 'none';
            }
        }).catch(() => {});
    }

    // Optimize scroll listeners with passive flag (already done in main.js but ensuring)
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('page-transition-active');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('page-transition-active');
        }, 300);
    }, { passive: true });
}

/* === NETWORK-AWARE OPTIMIZATION === */
(function() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
            // Disable non-essential animations on slow connections
            document.documentElement.classList.add('reduce-animations');
            
            // Pause non-hero videos
            document.querySelectorAll('video:not(.hero-bg-video)').forEach(v => {
                v.preload = 'none';
                v.autoplay = false;
                v.pause();
            });
        }
    }
})();

/* === CSS class for reduced animations === */
// Applied via JS above when network is slow
// .reduce-animations is handled in CSS
