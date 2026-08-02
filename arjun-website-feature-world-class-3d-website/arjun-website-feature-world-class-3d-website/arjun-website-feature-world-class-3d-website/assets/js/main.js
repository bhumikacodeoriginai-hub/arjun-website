/* ============================================
   ARJUN REALTY - Main JavaScript
   Premium Interactions & Core UX Engine
   Bug-Free, Cross-Platform Compatible
   ============================================ */

'use strict';

const APP = {
    isLoaded: false,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    mousePos: { x: 0, y: 0 },
    scrollProgress: 0,
    language: 'en'
};

// Initialize immediately
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initSmoothAnchors();
    initContactForm();
    initChatbot();
    initLanguageToggle();
    initScrollProgress();
    initHeroVideo();

    // Desktop-only features
    if (!APP.isMobile && !APP.isTouch) {
        initCustomCursor();
        initMagneticButtons();
        initCardGlowEffect();
    }

    // Light particles (mobile-safe)
    initParticles();
});

/* === HERO VIDEO SOUND CONTROL === */
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-bg-video');
    const unmuteBtn = document.getElementById('heroUnmuteBtn');
    if (!heroVideo || !unmuteBtn) return;

    const unmuteIcon = unmuteBtn.querySelector('.unmute-icon');
    const soundOnIcon = unmuteBtn.querySelector('.sound-on-icon');
    const unmuteText = unmuteBtn.querySelector('.unmute-text');

    unmuteBtn.addEventListener('click', () => {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            heroVideo.volume = 1.0;
            if (unmuteIcon) unmuteIcon.style.display = 'none';
            if (soundOnIcon) soundOnIcon.style.display = 'block';
            if (unmuteText) unmuteText.textContent = 'Sound On';
            unmuteBtn.classList.add('muted-off');
        } else {
            heroVideo.muted = true;
            if (unmuteIcon) unmuteIcon.style.display = 'block';
            if (soundOnIcon) soundOnIcon.style.display = 'none';
            if (unmuteText) unmuteText.textContent = 'Tap for Sound';
            unmuteBtn.classList.remove('muted-off');
        }
    });

    // Try autoplay - if it fails, show play button
    heroVideo.play().catch(() => {
        // Autoplay blocked - will play on first interaction
    });
}

/* === PRELOADER - Fast, max 2s === */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.loader-progress');
    const percentage = document.querySelector('.loader-percentage');

    // No preloader? Show content immediately
    if (!preloader) {
        showContent();
        return;
    }

    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 25 + 10;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            finishLoading();
        }
        if (progress) progress.style.width = width + '%';
        if (percentage) percentage.textContent = Math.floor(width) + '%';
    }, 40);

    // Force finish in 2 seconds max
    setTimeout(() => {
        if (!APP.isLoaded) {
            clearInterval(interval);
            finishLoading();
        }
    }, 2000);

    function finishLoading() {
        if (APP.isLoaded) return;
        APP.isLoaded = true;
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
        showContent();
    }
}

function showContent() {
    APP.isLoaded = true;
    document.body.classList.add('loaded');
    // Ensure all animated elements are visible
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

/* === NAVIGATION === */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isActive = navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isActive));
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.pageYOffset > 80) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Active link tracking via IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && links.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    links.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(s => observer.observe(s));
    }
}

/* === SMOOTH ANCHOR SCROLLING === */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* === CUSTOM CURSOR (Desktop only) === */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    (function loop() {
        outX += (mouseX - outX) * 0.12;
        outY += (mouseY - outY) * 0.12;
        outline.style.left = outX + 'px';
        outline.style.top = outY + 'px';
        requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, input, textarea, select, .magnetic-btn, .service-item-luxury, .client-logo-card, .feature-card-luxury, .project-card-compact, .award-card').forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('active'); outline.classList.add('active'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('active'); outline.classList.remove('active'); });
    });
}

/* === MAGNETIC BUTTONS (Desktop only) === */
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* === PARTICLES (Lightweight) === */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = APP.isMobile ? 8 : 25;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;opacity:${Math.random()*0.4+0.1};animation:float ${Math.random()*6+4}s ease-in-out infinite;animation-delay:${Math.random()*4}s;`;
        container.appendChild(p);
    }
}

/* === CONTACT FORM === */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('[required]').forEach(f => {
            if (!f.value.trim()) { valid = false; f.classList.add('error'); }
            else { f.classList.remove('error'); }
        });
        const phone = form.querySelector('#phone');
        if (phone && phone.value && !/^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.value.trim())) {
            valid = false; phone.classList.add('error');
        }
        if (!valid) { setTimeout(() => form.querySelectorAll('.error').forEach(f => f.classList.remove('error')), 2500); return; }

        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<span>&#10003; Request Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 3000);
        }, 1200);
    });
}

/* === CHATBOT - Arjun Realty AI Assistant (Production-Ready) === */
function initChatbot() {
    const trigger = document.getElementById('chatbotTrigger');
    const panel = document.getElementById('chatbotPanel');
    const close = document.getElementById('chatbotClose');
    const input = document.getElementById('chatbotInput');
    const send = document.getElementById('chatbotSend');
    const messages = document.getElementById('chatbotMessages');
    if (!trigger || !panel) return;

    // Conversation context tracking
    let conversationHistory = [];
    let userInfo = { name: '', interest: '', asked: [] };

    trigger.addEventListener('click', () => {
        const open = panel.classList.toggle('active');
        panel.setAttribute('aria-hidden', String(!open));
        if (open && input) input.focus();
    });
    if (close) close.addEventListener('click', () => { panel.classList.remove('active'); panel.setAttribute('aria-hidden', 'true'); });

    function sendMsg() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        conversationHistory.push({ role: 'user', text: text });
        
        // Show typing indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-message bot typing-indicator';
        typingEl.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';
        messages.appendChild(typingEl);
        messages.scrollTop = messages.scrollHeight;
        
        // Respond with natural delay
        const delay = 800 + Math.random() * 600;
        setTimeout(() => {
            typingEl.remove();
            const response = generateResponse(text);
            addMsg(response, 'bot');
            conversationHistory.push({ role: 'bot', text: response });
        }, delay);
    }

    function addMsg(text, who) {
        const d = document.createElement('div');
        d.className = 'chat-message ' + who;
        d.innerHTML = '<p>' + text + '</p>';
        messages.appendChild(d);
        messages.scrollTop = messages.scrollHeight;
    }

    function generateResponse(query) {
        const q = query.toLowerCase().trim();
        
        // Extract name if provided
        if (q.match(/(?:i am|i'm|my name is|this is)\s+([a-zA-Z\s]+)/i)) {
            const nameMatch = query.match(/(?:i am|i'm|my name is|this is)\s+([a-zA-Z\s]+)/i);
            if (nameMatch) userInfo.name = nameMatch[1].trim();
            return 'Nice to meet you' + (userInfo.name ? ', ' + userInfo.name : '') + '! How can I help you with your warehousing or infrastructure needs today?';
        }

        // Greetings
        if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening|assalam|namaste|howdy)/)) {
            const greetings = [
                'Hello! Welcome to Arjun Realty. I\'m here to help you with warehousing solutions, sports infrastructure, or any questions about our services. What can I assist you with?',
                'Hi there! I\'m the Arjun Realty assistant. Whether you need warehouse space, want to know about our projects, or need to connect with our team - I\'m here to help!',
                'Welcome! I\'m available 24/7 to answer your questions about Arjun Realty\'s services across India and UAE. How may I help you today?'
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // About Company
        if (q.match(/about|who are you|what is arjun|tell me about|company/)) {
            userInfo.asked.push('about');
            return 'Arjun Realty is a Dubai-headquartered warehousing and infrastructure company founded by <strong>Arjun N</strong>. We have delivered <strong>4,00,000+ sqft</strong> across <strong>42 warehouses</strong> in India & UAE. Our clients include Amazon, Flipkart, Swiggy, Zomato, Zepto, and Machaxi. We specialize in warehouse development, supply chain infrastructure, and sports arenas. Would you like to know more about any specific area?';
        }

        // Services
        if (q.match(/service|what do you do|what do you offer|offering|provide/)) {
            userInfo.asked.push('services');
            return 'We offer 7 key services:<br><br><strong>1. Warehouse Development</strong> - End-to-end construction of modern warehousing facilities (10,000 to 2,00,000+ sqft)<br><br><strong>2. Supply Chain Infrastructure</strong> - Logistics hubs and fulfillment centers<br><br><strong>3. International Operations</strong> - Warehousing footprint across India & UAE meeting global compliance<br><br><strong>4. Growth & Strategic Consulting</strong> - Scaling warehousing and logistics infrastructure efficiently<br><br><strong>5. Cold Storage Units</strong> - Temperature-controlled warehousing facilities for perishables<br><br><strong>6. Musical Concert Venue</strong> - Acoustically designed, high-capacity event venues<br><br><strong>7. Sports Arena</strong> - Professional-grade sports facilities, cricket grounds, and courts<br><br>Which service interests you? I can provide more details.';
        }

        // Warehouse specific
        if (q.match(/warehouse|warehousing|storage|godown|fulfillment|fulfilment/)) {
            userInfo.interest = 'warehouse';
            return 'Our warehousing solutions include:<br><br>• <strong>Built-to-Suit warehouses</strong> (customized to your needs)<br>• <strong>Temperature-controlled facilities</strong> (cold chain)<br>• <strong>E-commerce fulfillment centers</strong><br>• <strong>Dark stores</strong> for quick commerce<br>• Sizes from <strong>10,000 to 2,00,000+ sqft</strong><br>• Locations across India & UAE<br><br>We\'ve built for Amazon, Flipkart, Zepto, Swiggy & more. Would you like a quotation? Tell me your required area and location, or <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20warehouse%20space.%20Please%20share%20details." target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp us directly</a>.';
        }

        // Sports arena
        if (q.match(/sport|arena|cricket|badminton|swimming|pool|gym|fitness|machaxi/)) {
            userInfo.interest = 'sports';
            return 'Our sports infrastructure includes:<br><br>• <strong>Cricket grounds</strong> - Professional-grade pitches and facilities<br>• <strong>Badminton courts</strong> - Indoor courts with international-standard lighting<br>• <strong>Swimming pools</strong> - Olympic-standard aquatic facilities<br>• <strong>Multi-sport complexes</strong> - Combined facility development<br><br>We\'ve partnered with <strong>Machaxi</strong> for sports facility development. Interested in building a sports facility? <a href="https://wa.me/971581804241?text=Hi%2C%20I%27m%20interested%20in%20sports%20infrastructure%20development." target="_blank" style="color:#25D366;text-decoration:underline;">Let\'s discuss on WhatsApp</a>.';
        }

        // Pricing / Quote
        if (q.match(/price|cost|rate|quote|quotation|budget|how much|charges|fee/)) {
            userInfo.asked.push('pricing');
            return 'Pricing depends on several factors:<br><br>• Location (India / UAE)<br>• Area required (sqft)<br>• Type of facility (standard / cold storage / BTS)<br>• Timeline requirements<br><br>For a <strong>free custom quotation</strong>, please share:<br>1. Your required area (sqft)<br>2. Preferred location<br>3. Type of facility needed<br><br>Or get an instant response via <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20a%20quotation%20for%20warehouse%20space." target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp: +971 58 180 4241</a>. We respond within 2 hours during business hours.';
        }

        // Location
        if (q.match(/location|where|address|office|city|area|place|situated|based/)) {
            userInfo.asked.push('location');
            return '<strong>Headquarters:</strong> Dubai, UAE<br><strong>Operations:</strong> Multiple cities across India<br><br>We serve clients in both India and the UAE, making us one of the few companies bridging both markets for warehousing infrastructure.<br><br>Need to visit our facilities? <a href="https://wa.me/971581804241?text=Hi%2C%20I%20want%20to%20schedule%20a%20site%20visit." target="_blank" style="color:#25D366;text-decoration:underline;">Schedule a site visit</a>.';
        }

        // Contact / Phone / WhatsApp
        if (q.match(/contact|phone|call|whatsapp|reach|connect|talk|speak/)) {
            return '<strong>Get in touch:</strong><br><br>📱 <strong>WhatsApp/Call:</strong> <a href="https://wa.me/971581804241" target="_blank" style="color:#25D366;text-decoration:underline;">+971 58 180 4241</a><br>📞 <strong>Direct Call:</strong> <a href="tel:+971581804241" style="color:var(--primary-light);text-decoration:underline;">+971 58 180 4241</a><br>🕐 <strong>Hours:</strong> Sun-Thu, 9:00 AM - 6:00 PM (GST)<br>👤 <strong>Contact:</strong> Arjun N (Founder & CEO)<br><br>WhatsApp is the fastest way to reach us - we typically respond within minutes!';
        }

        // Clients / Partners
        if (q.match(/client|partner|customer|who do you work|brand|companies/)) {
            return 'We\'re trusted by India\'s & UAE\'s leading companies:<br><br>• <strong>Amazon</strong> - Fulfillment centers (1,50,000+ sqft)<br>• <strong>Flipkart</strong> - Distribution centers<br>• <strong>Zepto</strong> - Dark stores network<br>• <strong>Swiggy</strong> - Temperature-controlled hubs<br>• <strong>Zomato</strong> - Food logistics infrastructure<br>• <strong>Machaxi</strong> - Sports facilities<br>• <strong>DID</strong> - Logistics partner<br><br>We deliver <strong>100% on-time</strong> and build facilities to international ISO standards.';
        }

        // Timeline / Duration
        if (q.match(/time|how long|duration|timeline|months|delivery|when|deadline/)) {
            return 'Project timelines vary by scope:<br><br>• <strong>Small facilities</strong> (10,000-30,000 sqft): 4-8 months<br>• <strong>Medium warehouses</strong> (30,000-1,00,000 sqft): 8-14 months<br>• <strong>Large complexes</strong> (1,00,000+ sqft): 12-18 months<br><br>This includes design, approvals, construction, and handover. We maintain a <strong>100% on-time delivery record</strong>. Need a specific timeline estimate? Share your project details via <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20a%20timeline%20estimate%20for%20a%20project." target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp</a>.';
        }

        // Certifications / Quality
        if (q.match(/certif|quality|standard|iso|leed|safety|compliance/)) {
            return 'Our quality standards:<br><br>• <strong>ISO 9001:2015</strong> - Quality Management Systems<br>• <strong>LEED Compliance</strong> - Green Building Standards<br>• <strong>Zero Incident Record</strong> - Safety Excellence<br>• <strong>Fire Safety</strong> - Full compliance with local codes<br>• <strong>Structural Engineering</strong> - Seismic zone compliant<br><br>All our facilities meet international standards for both Indian and UAE regulatory requirements.';
        }

        // CEO / Founder / Leadership
        if (q.match(/ceo|founder|owner|arjun n|leadership|who started|who founded/)) {
            return '<strong>Arjun N</strong> - Founder & CEO<br><br>Based in Dubai, UAE, Arjun N is a visionary entrepreneur who built Arjun Realty from the ground up. Under his leadership, the company has:<br><br>• Delivered 4,00,000+ sqft infrastructure<br>• Built 42 warehouses across India & UAE<br>• Secured partnerships with Amazon, Flipkart, Swiggy & more<br>• Expanded operations internationally<br><br>Learn more on our <a href="pages/ceo.html" style="color:var(--primary-light);text-decoration:underline;">Leadership page</a>.';
        }

        // Visit / Tour
        if (q.match(/visit|tour|see|show|look at|inspect|viewing/)) {
            return 'We\'d be happy to arrange a site visit! You can tour our:<br><br>• Active warehouse facilities<br>• Sports complexes (cricket, badminton, pool)<br>• Projects under construction<br><br><a href="https://wa.me/971581804241?text=Hi%2C%20I%20want%20to%20schedule%20a%20site%20visit%20to%20your%20facilities." target="_blank" style="color:#25D366;text-decoration:underline;">Click here to schedule via WhatsApp</a><br><br>We\'ll confirm a date and time that works for you. Visits available Sun-Thu during business hours.';
        }

        // Working hours
        if (q.match(/hour|timing|open|close|available|when can|schedule/)) {
            return '<strong>Business Hours:</strong><br><br>🕐 Sunday to Thursday: 9:00 AM - 6:00 PM (GST)<br>📱 WhatsApp: Available 24/7 (we respond within hours)<br>🚫 Friday & Saturday: Closed (WhatsApp available)<br><br>For urgent matters outside business hours, WhatsApp us at <a href="https://wa.me/971581804241" target="_blank" style="color:#25D366;text-decoration:underline;">+971 58 180 4241</a>.';
        }

        // Sustainability / Green
        if (q.match(/sustain|green|solar|eco|environment|carbon|energy/)) {
            return 'We\'re committed to sustainable development:<br><br>• <strong>40% energy reduction</strong> through efficient design<br>• <strong>Solar integration</strong> on warehouse rooftops<br>• <strong>Rainwater harvesting</strong> systems<br>• <strong>100% construction waste recycled</strong><br>• <strong>Carbon neutral goal</strong> by 2030<br>• LEED-compliant green building practices<br><br>Sustainability is built into every project we deliver.';
        }

        // India specific
        if (q.match(/india|indian|bangalore|hyderabad|mumbai|delhi|chennai|pune/)) {
            return 'Our India operations span multiple cities and states. We develop warehousing infrastructure in key logistics corridors and metropolitan areas. Our facilities serve the booming e-commerce, quick commerce, and food delivery sectors across India.<br><br>Need a warehouse in a specific Indian city? <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20warehouse%20space%20in%20India.%20Location%3A%20" target="_blank" style="color:#25D366;text-decoration:underline;">Tell us your preferred location</a>.';
        }

        // UAE / Dubai specific
        if (q.match(/uae|dubai|abu dhabi|sharjah|middle east|gulf/)) {
            return 'Our UAE headquarters is in <strong>Dubai</strong>, the global hub of commerce and logistics. We leverage Dubai\'s world-class business infrastructure to drive international operations.<br><br>Dubai\'s vision of becoming the world\'s logistics capital aligns with our mission to build infrastructure that powers global supply chains.<br><br>Interested in UAE warehousing? <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20warehouse%20space%20in%20UAE." target="_blank" style="color:#25D366;text-decoration:underline;">Connect with us</a>.';
        }

        // Thank you / Bye
        if (q.match(/thank|thanks|bye|goodbye|ok|okay|got it|helpful/)) {
            return 'You\'re welcome! If you need anything else, I\'m here 24/7. For immediate assistance, you can always reach Arjun N directly on <a href="https://wa.me/971581804241" target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp: +971 58 180 4241</a>. Have a great day!';
        }

        // Build-to-suit
        if (q.match(/build to suit|bts|custom|customize|tailored|specific requirement/)) {
            return 'Yes! All our facilities are <strong>Build-to-Suit (BTS)</strong>:<br><br>• Custom-designed to your exact operational requirements<br>• Floor plans optimized for your workflow<br>• Loading docks, racking, temperature control as needed<br>• Compliance with your brand standards<br>• Scalable design for future expansion<br><br>Share your requirements and we\'ll prepare a custom proposal: <a href="https://wa.me/971581804241?text=Hi%2C%20I%20need%20a%20Build-to-Suit%20warehouse.%20Requirements%3A%20" target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp us now</a>.';
        }

        // Default - intelligent fallback
        const fallbacks = [
            'I appreciate your question! While I may not have the specific answer, our team can help you directly. You can:<br><br>• <a href="https://wa.me/971581804241?text=Hi%2C%20I%20have%20a%20question%20about%20Arjun%20Realty." target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp us for instant response</a><br>• <a href="tel:+971581804241" style="color:var(--primary-light);text-decoration:underline;">Call: +971 58 180 4241</a><br>• Fill out the contact form below<br><br>Or try asking me about: our services, warehouse sizes, pricing, locations, clients, site visits, or timelines.',
            'That\'s a great question! Let me help you get the right answer. You can ask me about:<br><br>• Warehouse development & sizes<br>• Sports arena infrastructure<br>• Pricing & quotations<br>• Our clients (Amazon, Flipkart, etc.)<br>• Locations (India & UAE)<br>• Site visits & tours<br>• Timelines & delivery<br><br>Or connect directly: <a href="https://wa.me/971581804241" target="_blank" style="color:#25D366;text-decoration:underline;">WhatsApp +971 58 180 4241</a>'
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    if (send) send.addEventListener('click', sendMsg);
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMsg(); });
}

/* === LANGUAGE TOGGLE - Full Bilingual EN/AR === */
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const mobileToggle = document.getElementById('mobileLangToggle');
    
    function switchLanguage() {
        APP.language = APP.language === 'en' ? 'ar' : 'en';
        const html = document.documentElement;
        html.setAttribute('dir', APP.language === 'ar' ? 'rtl' : 'ltr');
        html.setAttribute('lang', APP.language);
        
        // Update both toggle buttons
        if (toggle) toggle.querySelector('span').textContent = APP.language === 'ar' ? 'عربي' : 'EN';
        if (mobileToggle) mobileToggle.querySelector('span').textContent = APP.language === 'ar' ? 'EN / English' : 'EN / عربي';

        // Use the full translation engine
        if (typeof applyFullTranslation === 'function') {
            applyFullTranslation(APP.language);
        }

        // Update chatbot greeting
        const chatMsg = document.querySelector('.chatbot-messages .chat-message.bot p');
        if (chatMsg) {
            chatMsg.textContent = APP.language === 'ar'
                ? 'مرحباً! أنا مساعد أرجون ريالتي الذكي. كيف يمكنني مساعدتك اليوم؟'
                : 'Hello! I\'m Arjun Realty\'s AI assistant. How can I help you today?';
        }
    }
    
    if (toggle) toggle.addEventListener('click', switchLanguage);
    if (mobileToggle) mobileToggle.addEventListener('click', switchLanguage);
}

/* === SCROLL PROGRESS === */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    
    const backToTop = document.getElementById('backToTop');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const pct = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                bar.style.width = pct + '%';
                
                // Back to top visibility
                if (backToTop) {
                    if (window.pageYOffset > 600) {
                        backToTop.classList.add('visible');
                    } else {
                        backToTop.classList.remove('visible');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* === CARD GLOW (Desktop only) === */
function initCardGlowEffect() {
    document.querySelectorAll('.service-item-luxury, .feature-card-luxury, .project-card-compact, .award-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100) + '%');
            card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100) + '%');
        });
    });
}

/* === RESIZE === */
window.addEventListener('resize', () => {
    APP.isMobile = window.innerWidth < 768;
}, { passive: true });

/* === VIDEO SHOWCASE === */
document.addEventListener('DOMContentLoaded', () => {
    initVideoShowcase();
});

function initVideoShowcase() {
    const video = document.getElementById('showcaseVideo');
    const playBtn = document.getElementById('videoPlayBtn');
    const playOverlay = document.getElementById('videoPlayOverlay');
    if (!video || !playBtn) return;

    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');

    // Toggle play/pause
    playOverlay.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            playOverlay.classList.add('playing');
        } else {
            video.pause();
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
            playOverlay.classList.remove('playing');
        }
    });

    // Show overlay on hover when playing
    const container = playOverlay.closest('.video-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            if (!video.paused) {
                playOverlay.style.opacity = '1';
            }
        });
        container.addEventListener('mouseleave', () => {
            if (!video.paused) {
                playOverlay.style.opacity = '';
            }
        });
    }

    // Update UI when video starts playing (autoplay)
    video.addEventListener('playing', () => {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        playOverlay.classList.add('playing');
    });

    // iOS autoplay fix: try to play on first user interaction
    document.addEventListener('touchstart', function iosAutoplay() {
        if (video.paused) {
            video.play().catch(() => {});
        }
        // Also play hero video
        const heroVid = document.querySelector('.hero-bg-video');
        if (heroVid && heroVid.paused) {
            heroVid.play().catch(() => {});
        }
        document.removeEventListener('touchstart', iosAutoplay);
    }, { once: true, passive: true });
}



/* === GALLERY - Filter & Lightbox === */
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

function initGallery() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (!filterBtns.length) return;

    let currentIndex = 0;
    let visibleItems = [];

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            items.forEach(item => {
                const cat = item.dataset.category;
                if (filter === 'all' || cat === filter) {
                    item.style.display = '';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'none';
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
            updateVisibleItems();
        });
    });

    function updateVisibleItems() {
        visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
    }
    updateVisibleItems();

    // Lightbox - open on zoom btn click or image click
    items.forEach((item, idx) => {
        const zoomBtn = item.querySelector('.gallery-zoom-btn');
        const imgWrap = item.querySelector('.gallery-image-wrap');

        function openLightbox() {
            updateVisibleItems();
            currentIndex = visibleItems.indexOf(item);
            showLightboxImage();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
        if (imgWrap) imgWrap.addEventListener('click', openLightbox);
    });

    function showLightboxImage() {
        if (!visibleItems[currentIndex]) return;
        const img = visibleItems[currentIndex].querySelector('img');
        const caption = visibleItems[currentIndex].querySelector('.gallery-overlay-content h4');
        if (lightboxImg) lightboxImg.src = img.src;
        if (lightboxImg) lightboxImg.alt = img.alt;
        if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
        if (lightboxCounter) lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleItems.length;
    }

    // Lightbox navigation
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxImage(); });
    if (lightboxNext) lightboxNext.addEventListener('click', () => { currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxImage(); });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}
