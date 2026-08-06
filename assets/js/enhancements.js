/* ============================================
   ARJUN REALTY - UX Enhancements & AI Features
   Touch-optimized, Zero-lag, Cross-device
   Real AI-powered features, no fakes
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initEnhancedBackToTop();
    initSectionReveal();
    initTouchOptimizations();
    initSmartQuickActionsBar();
    initPerformanceOptimizations();
    initAISmartSearch();
    initSmartTimeTheme();
});

/* === ENHANCED BACK TO TOP WITH SMOOTH FEEDBACK === */
function initEnhancedBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }

        const startY = window.pageYOffset;
        const duration = Math.min(800, Math.max(300, startY * 0.4));
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

    btn.addEventListener('touchstart', () => {
        btn.style.transform = 'scale(0.88)';
    }, { passive: true });

    btn.addEventListener('touchend', () => {
        btn.style.transform = '';
    }, { passive: true });
}

/* === SECTION REVEAL ON SCROLL === */
function initSectionReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-reveal', 'revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
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

    document.addEventListener('touchstart', function() {}, { passive: true });

    const fixedElements = document.querySelectorAll('.quick-actions-bar, .floating-actions-container, .navbar');
    fixedElements.forEach(el => {
        el.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });

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

    initLightboxSwipe();
}

/* === LIGHTBOX SWIPE GESTURE === */
function initLightboxSwipe() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);

        if (Math.abs(diffX) > 60 && diffY < 100) {
            if (diffX > 0) {
                const prev = lightbox.querySelector('.lightbox-prev');
                if (prev) prev.click();
            } else {
                const next = lightbox.querySelector('.lightbox-next');
                if (next) next.click();
            }
        }

        const verticalDiff = touchEndY - touchStartY;
        if (verticalDiff > 100 && Math.abs(diffX) < 50) {
            const close = lightbox.querySelector('.lightbox-close');
            if (close) close.click();
        }
    }, { passive: true });
}

/* === SMART QUICK ACTIONS BAR === */
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
                    bar.classList.add('hidden');
                } else if (currentScrollY < lastScrollY - threshold || currentScrollY < 100) {
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
    // Lazy decode images for smoother rendering
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
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
                const particles = document.getElementById('particles');
                if (particles) particles.style.display = 'none';
            }
        }).catch(() => {});
    }

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

/* ============================================
   AI SMART SEARCH - Real Feature
   Instant keyboard shortcut search overlay
   Works on all devices (keyboard or tap)
   ============================================ */
function initAISmartSearch() {
    // Create search overlay
    const overlay = document.createElement('div');
    overlay.className = 'ai-search-overlay';
    overlay.id = 'aiSearchOverlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Smart Search');

    overlay.innerHTML = `
        <div class="ai-search-backdrop"></div>
        <div class="ai-search-modal">
            <div class="ai-search-header">
                <div class="ai-search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </div>
                <input type="text" class="ai-search-input" id="aiSearchInput" placeholder="Search services, projects, contact..." autocomplete="off" aria-label="Search">
                <kbd class="ai-search-kbd">ESC</kbd>
            </div>
            <div class="ai-search-results" id="aiSearchResults">
                <div class="ai-search-section">
                    <span class="ai-search-section-title">Quick Actions</span>
                    <div class="ai-search-items" id="aiQuickActions">
                        <a href="https://wa.me/971581804241" target="_blank" rel="noopener" class="ai-search-item" data-keywords="whatsapp contact chat message">
                            <span class="ai-search-item-icon">💬</span>
                            <span class="ai-search-item-text">Chat on WhatsApp</span>
                            <span class="ai-search-item-hint">Instant reply</span>
                        </a>
                        <a href="tel:+971581804241" class="ai-search-item" data-keywords="call phone telephone ring">
                            <span class="ai-search-item-icon">📞</span>
                            <span class="ai-search-item-text">Call +971 58 180 4241</span>
                            <span class="ai-search-item-hint">Direct line</span>
                        </a>
                        <a href="#contact" class="ai-search-item ai-search-nav" data-keywords="quote quotation pricing estimate cost">
                            <span class="ai-search-item-icon">📋</span>
                            <span class="ai-search-item-text">Request Quotation</span>
                            <span class="ai-search-item-hint">Free estimate</span>
                        </a>
                        <a href="pages/ceo.html" class="ai-search-item" data-keywords="ceo founder arjun leadership about owner">
                            <span class="ai-search-item-icon">👤</span>
                            <span class="ai-search-item-text">Meet Our CEO</span>
                            <span class="ai-search-item-hint">Leadership</span>
                        </a>
                    </div>
                </div>
                <div class="ai-search-section">
                    <span class="ai-search-section-title">Navigate</span>
                    <div class="ai-search-items" id="aiNavItems">
                        <a href="#home" class="ai-search-item ai-search-nav" data-keywords="home top hero video">
                            <span class="ai-search-item-icon">🏠</span>
                            <span class="ai-search-item-text">Home</span>
                        </a>
                        <a href="#about" class="ai-search-item ai-search-nav" data-keywords="about company who we are story history">
                            <span class="ai-search-item-icon">🏢</span>
                            <span class="ai-search-item-text">About Arjun Realty</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="services warehouse cold storage sports arena concert music supply chain logistics">
                            <span class="ai-search-item-icon">⚙️</span>
                            <span class="ai-search-item-text">Our Services</span>
                            <span class="ai-search-item-hint">7 services</span>
                        </a>
                        <a href="#projects" class="ai-search-item ai-search-nav" data-keywords="projects portfolio work amazon zepto swiggy flipkart">
                            <span class="ai-search-item-icon">🏗️</span>
                            <span class="ai-search-item-text">Projects & Portfolio</span>
                            <span class="ai-search-item-hint">42 warehouses</span>
                        </a>
                        <a href="#gallery" class="ai-search-item ai-search-nav" data-keywords="gallery photos images infrastructure showcase pictures">
                            <span class="ai-search-item-icon">🖼️</span>
                            <span class="ai-search-item-text">Gallery</span>
                        </a>
                        <a href="#clients" class="ai-search-item ai-search-nav" data-keywords="clients partners amazon flipkart swiggy zomato zepto brands">
                            <span class="ai-search-item-icon">🤝</span>
                            <span class="ai-search-item-text">Our Clients</span>
                            <span class="ai-search-item-hint">Top brands</span>
                        </a>
                        <a href="#faq" class="ai-search-item ai-search-nav" data-keywords="faq questions help how long size minimum certification">
                            <span class="ai-search-item-icon">❓</span>
                            <span class="ai-search-item-text">FAQ</span>
                        </a>
                        <a href="#contact" class="ai-search-item ai-search-nav" data-keywords="contact location office address dubai uae india hours schedule visit">
                            <span class="ai-search-item-icon">📍</span>
                            <span class="ai-search-item-text">Contact & Location</span>
                            <span class="ai-search-item-hint">Dubai & India</span>
                        </a>
                    </div>
                </div>
                <div class="ai-search-section">
                    <span class="ai-search-section-title">Services</span>
                    <div class="ai-search-items" id="aiServiceItems">
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="warehouse development construction build facility godown">
                            <span class="ai-search-item-icon">🏭</span>
                            <span class="ai-search-item-text">Warehouse Development</span>
                            <span class="ai-search-item-hint">10K-2L sqft</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="supply chain logistics distribution fulfillment hub transport">
                            <span class="ai-search-item-icon">🚛</span>
                            <span class="ai-search-item-text">Supply Chain Infrastructure</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="cold storage temperature controlled freezer pharma food perishable">
                            <span class="ai-search-item-icon">❄️</span>
                            <span class="ai-search-item-text">Cold Storage Units</span>
                            <span class="ai-search-item-hint">24/7 monitoring</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="sports arena cricket badminton swimming pool gym fitness machaxi">
                            <span class="ai-search-item-icon">🏟️</span>
                            <span class="ai-search-item-text">Sports Arena</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="concert music venue event party live stage acoustics">
                            <span class="ai-search-item-icon">🎵</span>
                            <span class="ai-search-item-text">Musical Concert Venue</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="international operations global uae dubai india expansion">
                            <span class="ai-search-item-icon">🌍</span>
                            <span class="ai-search-item-text">International Operations</span>
                            <span class="ai-search-item-hint">India & UAE</span>
                        </a>
                        <a href="#services" class="ai-search-item ai-search-nav" data-keywords="consulting growth strategy planning scale business">
                            <span class="ai-search-item-icon">📈</span>
                            <span class="ai-search-item-text">Growth & Strategic Consulting</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="ai-search-footer">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById('aiSearchInput');
    const results = document.getElementById('aiSearchResults');
    const backdrop = overlay.querySelector('.ai-search-backdrop');
    let activeIndex = -1;

    // Open search with Ctrl+K / Cmd+K or "/" key
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === '/' && !isInputFocused()) {
            e.preventDefault();
            openSearch();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeSearch);

    // Search input handling
    if (input) {
        input.addEventListener('input', () => {
            filterResults(input.value.trim().toLowerCase());
            activeIndex = -1;
            updateActiveItem();
        });

        // Keyboard navigation within results
        input.addEventListener('keydown', (e) => {
            const items = getVisibleItems();
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                updateActiveItem();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, -1);
                updateActiveItem();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0 && items[activeIndex]) {
                    items[activeIndex].click();
                }
            }
        });
    }

    // Handle navigation items click
    overlay.querySelectorAll('.ai-search-nav').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const href = item.getAttribute('href');
            closeSearch();
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 200);
                }
            }
        });
    });

    function openSearch() {
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (input) {
            input.value = '';
            setTimeout(() => input.focus(), 100);
        }
        filterResults('');
        activeIndex = -1;
    }

    function closeSearch() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        activeIndex = -1;
    }

    function isInputFocused() {
        const active = document.activeElement;
        return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT' || active.isContentEditable);
    }

    function filterResults(query) {
        const allItems = overlay.querySelectorAll('.ai-search-item');
        const allSections = overlay.querySelectorAll('.ai-search-section');
        
        if (!query) {
            allItems.forEach(item => item.style.display = '');
            allSections.forEach(section => section.style.display = '');
            return;
        }

        const words = query.split(/\s+/);
        
        allItems.forEach(item => {
            const keywords = (item.dataset.keywords || '').toLowerCase();
            const text = (item.textContent || '').toLowerCase();
            const searchable = keywords + ' ' + text;
            
            const matches = words.every(word => searchable.includes(word));
            item.style.display = matches ? '' : 'none';
        });

        // Hide empty sections
        allSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.ai-search-item:not([style*="display: none"])');
            section.style.display = visibleItems.length > 0 ? '' : 'none';
        });
    }

    function getVisibleItems() {
        return Array.from(overlay.querySelectorAll('.ai-search-item:not([style*="display: none"])'));
    }

    function updateActiveItem() {
        const items = getVisibleItems();
        items.forEach((item, i) => {
            item.classList.toggle('ai-search-active', i === activeIndex);
        });
        if (activeIndex >= 0 && items[activeIndex]) {
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // Add search trigger button to navbar for mobile
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const searchBtn = document.createElement('button');
        searchBtn.className = 'nav-search-trigger';
        searchBtn.setAttribute('aria-label', 'Open Smart Search');
        searchBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>';
        searchBtn.addEventListener('click', openSearch);
        navActions.insertBefore(searchBtn, navActions.firstChild);
    }
}


/* ============================================
   AI SMART TIME-BASED THEME
   Automatically adjusts UI warmth based on
   user's local time for eye comfort
   ============================================ */
function initSmartTimeTheme() {
    const hour = new Date().getHours();
    const root = document.documentElement;

    // Night mode (10pm - 6am): Warmer, dimmer tones for eye comfort
    if (hour >= 22 || hour < 6) {
        root.classList.add('time-night');
        root.style.setProperty('--dark', '#040608');
        root.style.setProperty('--dark-surface', '#060A10');
        root.style.setProperty('--dark-card', '#0A0F18');
        root.style.setProperty('--primary-light', '#D4B870');
        // Reduce brightness of videos at night
        document.querySelectorAll('video').forEach(v => {
            v.style.filter = 'brightness(0.85)';
        });
    }
    // Early morning (6am - 8am): Gentle warm glow
    else if (hour >= 6 && hour < 8) {
        root.classList.add('time-morning');
        root.style.setProperty('--primary-light', '#F0D890');
    }
    // Evening (6pm - 10pm): Slightly warm for transition
    else if (hour >= 18 && hour < 22) {
        root.classList.add('time-evening');
        root.style.setProperty('--dark', '#050810');
        root.style.setProperty('--primary-light', '#E0C870');
    }
    // Daytime (8am - 6pm): Default crisp theme - no changes needed
}


/* === NETWORK-AWARE OPTIMIZATION === */
(function() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
            document.documentElement.classList.add('reduce-animations');
            document.querySelectorAll('video:not(.hero-bg-video)').forEach(v => {
                v.preload = 'none';
                v.autoplay = false;
                v.pause();
            });
        }
    }
})();
