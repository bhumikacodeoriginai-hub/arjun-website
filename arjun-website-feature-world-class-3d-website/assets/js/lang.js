/* ============================================
   ARJUN REALTY - Complete Bilingual System
   Full English/Arabic Translation Engine
   ============================================ */

'use strict';

const TRANSLATIONS = {
    // Navigation
    'Home': 'الرئيسية',
    'About': 'عنّا',
    'Services': 'خدماتنا',
    'Projects': 'مشاريعنا',
    'Clients': 'عملاؤنا',
    'Leadership': 'القيادة',
    'Contact': 'تواصل معنا',
    'Get in Touch': 'تواصل معنا',
    'EN': 'عربي',

    // Hero
    'India & UAE\'s Premier Warehousing Partner': 'الشريك الأول للتخزين في الهند والإمارات',
    'Building': 'بناء',
    'The': '',
    'Future': 'مستقبل',
    'of': '',
    'Warehousing': 'التخزين',
    '4,00,000+ sqft of world-class warehousing infrastructure delivered across India & UAE, powering the supply chains of tomorrow.': 'أكثر من 400,000 قدم مربع من البنية التحتية للتخزين العالمية تم تسليمها في الهند والإمارات، لتشغيل سلاسل التوريد المستقبلية.',
    'Explore Our Work': 'استكشف أعمالنا',
    'Request Quotation': 'طلب عرض أسعار',
    'Sqft Delivered': 'قدم مربع تم تسليمها',
    'Countries': 'دول',
    'Major Clients': 'عملاء رئيسيون',
    'Client Satisfaction': 'رضا العملاء',
    'Scroll to explore': 'انتقل للاستكشاف',

    // About
    'Who We Are': 'من نحن',
    'Redefining Warehousing Excellence Across Continents': 'إعادة تعريف التميز في التخزين عبر القارات',
    'World-Class Infrastructure': 'بنية تحتية عالمية المستوى',
    'Built to international standards with cutting-edge technology and precision engineering': 'مبنية وفق المعايير الدولية بأحدث التقنيات والهندسة الدقيقة',
    'Global Presence': 'حضور عالمي',
    'Operating across India & UAE with an expanding international footprint': 'نعمل في الهند والإمارات مع توسع دولي مستمر',
    'Trusted by Leaders': 'موثوق من القادة',
    'Partnered with Amazon, Flipkart, Swiggy, Zomato & more industry giants': 'شراكة مع أمازون وفليبكارت وسويغي وزوماتو وعمالقة الصناعة',
    'Est. India & UAE': 'تأسست في الهند والإمارات',

    // Services
    'What We Do': 'ماذا نفعل',
    'Comprehensive Solutions': 'حلول شاملة',
    'End-to-end warehousing solutions designed for the future of global logistics and supply chain excellence.': 'حلول تخزين شاملة مصممة لمستقبل الخدمات اللوجستية العالمية.',
    'Warehouse Development': 'تطوير المستودعات',
    'Supply Chain Infrastructure': 'البنية التحتية لسلسلة التوريد',
    'International Operations': 'العمليات الدولية',
    'Growth & Strategic Consulting': 'النمو والاستشارات الاستراتيجية',
    'Cold Storage Units': 'وحدات التخزين البارد',
    'Musical concert venue': 'مكان الحفلات الموسيقية',
    'Musical Concert Venue': 'مكان الحفلات الموسيقية',
    'Sports Arena': 'ساحة رياضية',
    'End-to-end development of modern warehousing facilities tailored to your operational needs, from architectural design to final delivery with international compliance.': 'تطوير شامل لمرافق التخزين الحديثة المصممة وفق احتياجاتك التشغيلية، من التصميم المعماري إلى التسليم النهائي.',
    'Creating facilities that optimize logistics flow, reduce operational costs, and accelerate delivery timelines for major global brands and enterprises.': 'إنشاء مرافق تحسّن تدفق الخدمات اللوجستية وتخفض التكاليف التشغيلية وتسرّع مواعيد التسليم.',
    'Expanding warehousing footprint across India & UAE with facilities meeting global compliance, safety standards, and international operational excellence.': 'توسيع نطاق التخزين في الهند والإمارات بمرافق تلبي المعايير الدولية والسلامة.',
    'Strategic consulting for businesses looking to scale their warehousing and logistics infrastructure efficiently across multiple geographies.': 'استشارات استراتيجية للشركات التي تسعى لتوسيع بنيتها التحتية بكفاءة عبر مناطق جغرافية متعددة.',
    'Temperature-controlled warehousing facilities for perishable goods, pharmaceuticals, and food-tech companies with 24/7 monitoring and compliance standards.': 'مرافق تخزين مبردة ذات حرارة متحكم بها للمواد سريعة التلف والأدوية والأغذية مع مراقبة على مدار الساعة.',
    'Acoustically designed, high-capacity venues and event spaces engineered for live entertainment, stadium concerts, and large-scale cultural events.': 'أماكن وساحات مصممة صوتياً وذات سعة عالية ومجهزة للترفيه الحي وحفلات الاستادات والفعاليات الثقافية الكبرى.',
    'State-of-the-art sports facilities and multi-purpose arenas, including professional-grade cricket grounds, indoor badminton courts, and swimming pools.': 'مرافق رياضية متطورة وساحات متعددة الأغراض، بما في ذلك ملاعب الكريكيت الاحترافية، وملاعب الريشة الطائرة الداخلية، وحمامات السباحة.',

    // Projects
    'Portfolio': 'المحفظة',
    'Landmark Projects': 'مشاريع بارزة',
    'Infrastructure that defines skylines and powers economies': 'بنية تحتية تحدد أفق المدن وتحرك الاقتصادات',
    'Featured Project': 'مشروع مميز',
    'E-Commerce Fulfillment': 'التجارة الإلكترونية',
    'Amazon Fulfillment Center': 'مركز أمازون للتنفيذ',
    'Quick Commerce': 'التجارة السريعة',
    'Zepto Dark Stores Network': 'شبكة متاجر زيبتو المظلمة',
    'Food & Delivery': 'الطعام والتوصيل',
    'Swiggy Warehousing Hub': 'مركز سويغي للتخزين',
    'E-Commerce': 'التجارة الإلكترونية',
    'Flipkart Distribution Center': 'مركز فليبكارت للتوزيع',

    // Clients
    'Our Partners': 'شركاؤنا',
    'Trusted by Industry Leaders': 'موثوق من قادة الصناعة',
    'Powering the supply chains of India\'s & UAE\'s most ambitious companies': 'تشغيل سلاسل التوريد لأكثر الشركات طموحاً في الهند والإمارات',
    'E-Commerce Giant': 'عملاق التجارة الإلكترونية',
    'E-Commerce Leader': 'رائد التجارة الإلكترونية',
    'Food Tech': 'تكنولوجيا الطعام',
    'Sports & Fitness': 'الرياضة واللياقة',
    'Partner': 'شريك',

    // Awards
    'Recognition': 'الاعتراف والتقدير',
    'Awards & Certifications': 'الجوائز والشهادات',
    'ISO 9001:2015': 'ISO 9001:2015',
    'Quality Management Systems Certified': 'أنظمة إدارة الجودة المعتمدة',
    'LEED Compliance': 'التوافق مع LEED',
    'Green Building Standards': 'معايير المباني الخضراء',
    'Safety Excellence': 'التميز في السلامة',
    'Zero Incident Track Record': 'سجل خالٍ من الحوادث',
    'Industry Leader': 'رائد الصناعة',
    'Top Warehousing Developer Award': 'جائزة أفضل مطور مستودعات',

    // Sustainability
    'Our Commitment': 'التزامنا',
    'Sustainable Future': 'مستقبل مستدام',
    'Building responsibly for generations to come. Our facilities integrate cutting-edge sustainable technologies and green building practices.': 'البناء بمسؤولية للأجيال القادمة. تدمج مرافقنا أحدث التقنيات المستدامة وممارسات البناء الأخضر.',
    'Energy Reduction': 'تخفيض الطاقة',
    'Waste Recycled': 'إعادة تدوير النفايات',
    'Solar Powered': 'طاقة شمسية',
    'Solar Integration': 'التكامل الشمسي',
    'Rainwater Harvesting': 'حصاد مياه الأمطار',
    'Carbon Neutral Goal': 'هدف الحياد الكربوني',

    // Global
    'Global Reach': 'الانتشار العالمي',
    'Our Presence': 'تواجدنا',
    'India': 'الهند',
    'Multiple Locations': 'مواقع متعددة',
    'Dubai, UAE': 'دبي، الإمارات',
    'Headquarters': 'المقر الرئيسي',

    // Careers
    'Join Us': 'انضم إلينا',
    'Build Your Career': 'ابنِ مسيرتك المهنية',
    'Join a team that\'s reshaping the future of warehousing infrastructure across continents. We\'re looking for visionaries, builders, and innovators.': 'انضم إلى فريق يعيد تشكيل مستقبل البنية التحتية للتخزين. نبحث عن أصحاب الرؤى والبناة والمبتكرين.',
    'View Opportunities': 'عرض الفرص',
    'International Exposure': 'تعرض دولي',
    'Growth Opportunities': 'فرص النمو',
    'Competitive Packages': 'حزم تنافسية',
    'Dubai & India Offices': 'مكاتب دبي والهند',

    // Contact
    'Let\'s Build Together': 'لنبني معاً',
    'Ready to scale your warehousing infrastructure? Let\'s discuss how Arjun Realty can power your growth with world-class solutions.': 'هل أنت مستعد لتوسيع بنيتك التحتية؟ دعنا نناقش كيف يمكن لأرجون ريالتي تعزيز نموك.',
    'Dubai, UAE & India': 'دبي، الإمارات والهند',
    'Email': 'البريد الإلكتروني',
    'Phone': 'الهاتف',
    'Schedule Site Visit': 'جدولة زيارة موقع',
    'Request a Quotation': 'طلب عرض أسعار',
    'Tell us about your project requirements': 'أخبرنا عن متطلبات مشروعك',
    'Full Name': 'الاسم الكامل',
    'Email Address': 'البريد الإلكتروني',
    'Company': 'الشركة',
    'Send Request': 'إرسال الطلب',
    'Select Service Required': 'اختر الخدمة المطلوبة',
    'Growth & Consulting': 'النمو والاستشارات',
    'Tell us about your project': 'أخبرنا عن مشروعك',

    // FAQ
    'FAQ': 'الأسئلة الشائعة',
    'Frequently Asked Questions': 'الأسئلة المتكررة',
    'What areas does Arjun Realty operate in?': 'ما هي المناطق التي تعمل فيها أرجون ريالتي؟',
    'We operate across India and the UAE, with our headquarters in Dubai. We serve clients in both markets with world-class warehousing infrastructure.': 'نعمل في الهند والإمارات، ومقرنا الرئيسي في دبي. نخدم العملاء في كلا السوقين ببنية تحتية عالمية.',
    'What is the minimum warehouse size you develop?': 'ما هو الحد الأدنى لحجم المستودع الذي تطورونه؟',
    'We develop warehousing facilities from 10,000 sqft to over 2,00,000 sqft depending on client requirements. Each project is tailored to specific operational needs.': 'نطور مرافق التخزين من 10,000 إلى أكثر من 200,000 قدم مربع حسب متطلبات العميل.',
    'How long does a typical warehouse project take?': 'كم يستغرق مشروع المستودع النموذجي؟',
    'Depending on size and complexity, projects typically range from 6 to 18 months from concept to completion, including all regulatory approvals.': 'حسب الحجم والتعقيد، تتراوح المشاريع من 6 إلى 18 شهراً من المفهوم إلى الإنجاز.',
    'Do you offer Build-to-Suit solutions?': 'هل تقدمون حلول البناء حسب الطلب؟',
    'Yes, all our warehousing facilities are custom-designed and built to suit each client\'s specific operational requirements, ensuring maximum efficiency.': 'نعم، جميع مرافقنا مصممة ومبنية خصيصاً لتلبية المتطلبات التشغيلية لكل عميل.',
    'What certifications do your facilities have?': 'ما هي الشهادات التي تمتلكها مرافقكم؟',
    'Our facilities comply with ISO 9001:2015, LEED green building standards, and all local safety regulations in both India and UAE.': 'تتوافق مرافقنا مع ISO 9001:2015 ومعايير LEED وجميع لوائح السلامة المحلية.',

    // Download
    'Download Company Profile': 'تحميل ملف الشركة',
    'Get our comprehensive company brochure with detailed project portfolio, certifications, and capabilities.': 'احصل على كتيب شركتنا الشامل مع محفظة المشاريع والشهادات والقدرات.',
    'Download PDF': 'تحميل PDF',

    // Footer
    'Ready to transform your logistics infrastructure?': 'هل أنت مستعد لتحويل بنيتك التحتية اللوجستية؟',
    'Start a Conversation': 'ابدأ محادثة',
    'Building world-class warehousing infrastructure that powers the supply chains of tomorrow across India and the UAE.': 'بناء بنية تحتية عالمية للتخزين تشغل سلاسل التوريد المستقبلية في الهند والإمارات.',
    'Quick Links': 'روابط سريعة',
    'About Us': 'عنّا',
    'Locations': 'المواقع',
    'Dubai, UAE (HQ)': 'دبي، الإمارات (المقر)',
    'India Operations': 'عمليات الهند',
    'Expanding Globally': 'التوسع عالمياً',
    'Privacy Policy': 'سياسة الخصوصية',
    'Terms of Service': 'شروط الخدمة',

    // Innovation section
    'Innovation & Technology': 'الابتكار والتكنولوجيا',
    'Powered by AI': 'مدعوم بالذكاء الاصطناعي',
    'Smart Warehousing': 'التخزين الذكي',
    'We integrate artificial intelligence, IoT sensors, and predictive analytics into our warehousing solutions for maximum operational efficiency.': 'ندمج الذكاء الاصطناعي وأجهزة الاستشعار والتحليلات التنبؤية في حلول التخزين لأقصى كفاءة تشغيلية.',
    'AI-Powered Analytics': 'تحليلات بالذكاء الاصطناعي',
    'IoT Monitoring': 'مراقبة إنترنت الأشياء',
    'Predictive Maintenance': 'الصيانة التنبؤية',
    'Automated Systems': 'أنظمة آلية',

    // Media
    'Media Center': 'المركز الإعلامي',
    'Latest News': 'آخر الأخبار',
    'Press Releases': 'البيانات الصحفية',

    // Gallery
    'Gallery': 'معرض الصور',
    'Our Infrastructure': 'بنيتنا التحتية',
    '42 World-Class Warehouses': '42 مستودعاً عالمي المستوى',
    'A showcase of our premium warehousing facilities and sports arenas across India & UAE': 'عرض لمرافق التخزين المتميزة والملاعب الرياضية في الهند والإمارات',
    'All Projects': 'جميع المشاريع',
    'Warehouses': 'المستودعات',
    'Sports Arenas': 'الملاعب الرياضية',
    'Arjun Concert Space': 'أرجون مساحة الحفلات',
    'Premium acoustically treated concert arena': 'ساحة حفلات موسيقية معالجة صوتياً وممتازة',
    'Arjun Live Stage': 'مسرح أرجون الحي',
    'Indoor state-of-the-art music venue': 'موقع موسيقى داخلي متطور',
    'Warehouses Built': 'مستودعات تم بناؤها',
    'On-Time Delivery': 'التسليم في الوقت المحدد',
};

// Apply full translation
function applyFullTranslation(lang) {
    if (lang === 'en') {
        // Restore English - reload from data-en attributes or original text
        document.querySelectorAll('[data-en]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-en');
            } else if (el.tagName === 'OPTION') {
                el.textContent = el.getAttribute('data-en');
            } else {
                el.textContent = el.getAttribute('data-en');
            }
        });
    } else if (lang === 'ar') {
        // Apply Arabic
        document.querySelectorAll('[data-ar]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-ar');
            } else if (el.tagName === 'OPTION') {
                el.textContent = el.getAttribute('data-ar');
            } else {
                el.textContent = el.getAttribute('data-ar');
            }
        });

        // Also translate elements without data attributes using dictionary
        document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, button, summary, label, option').forEach(el => {
            if (el.children.length > 0 && el.tagName !== 'SUMMARY') return; // skip elements with children
            const text = el.textContent.trim();
            if (TRANSLATIONS[text]) {
                el.setAttribute('data-en', text);
                el.setAttribute('data-ar', TRANSLATIONS[text]);
                el.textContent = TRANSLATIONS[text];
            }
        });
    }
}
