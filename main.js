// Shell Helix Saudi National Day 95 Campaign - Interactive JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProductSlider();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeAdModals();
    initializeVideoPlayer();
    initializeLazyLoading();
    initializeAccessibility();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Product slider functionality
function initializeProductSlider() {
    const slider = document.getElementById('slider-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.slider-dot');
    
    let currentSlide = 0;
    const totalSlides = 3;
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.style.backgroundColor = '#ED1C24';
            } else {
                dot.classList.remove('active');
                dot.style.backgroundColor = '#d1d5db';
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play slider
    setInterval(nextSlide, 5000);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate grid items with stagger
                const gridItems = entry.target.querySelectorAll('.grid > *');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('grid-item');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
    
    // Trigger counter animation when visible
    const countersSection = document.querySelector('#market-snapshot');
    if (countersSection) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        counterObserver.observe(countersSection);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu button
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Ad modal functionality
function initializeAdModals() {
    window.openAdModal = function(adNumber) {
        const modal = document.getElementById('ad-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        const adData = {
            1: {
                title: "Bold National Symbolism",
                content: `
                    <div class="mb-8">
                        <img src="https://ik.imagekit.io/xtj3m9hth/60f0208d-fbce-4e5d-9424-f769a121987c.jpg?updatedAt=1757918373485" 
                             alt="Bold National Symbolism Ad" 
                             class="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8">
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-saudi-green/10 to-shell-yellow/10 p-8 rounded-2xl border border-saudi-green/20">
                            <h4 class="text-2xl font-bold text-saudi-green mb-6 flex items-center">
                                <i class="fas fa-flag mr-3"></i>
                                Our Creative Solution
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-star text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Bold National Symbolism:</span> Large Saudi National Day banner ("عزنا بطبعنا – اليوم الوطني السعودي 95") dominates the scene, creating instant cultural relevance.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-car text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">On-the-Road Context:</span> Car in motion ties the product directly to real Saudi journeys across desert landscapes.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-tag text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Offer Integration:</span> Clear, bold pricing (4L for 140 SAR Synthetic / 78 SAR Mineral) keeps focus on value.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-shield-alt text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Brand Trust:</span> Prominent Shell Helix logo + product line-up reinforce credibility.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-qrcode text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Direct Action:</span> QR code for quick access to details and bookings.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-shell-red/10 to-shell-yellow/10 p-8 rounded-2xl border border-shell-red/20">
                            <h4 class="text-2xl font-bold text-shell-red mb-6 flex items-center">
                                <i class="fas fa-lightbulb mr-3"></i>
                                Why This Works
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-brain text-shell-red mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-shell-red">High Recall:</span> Patriotic visual ensures emotional resonance with Saudi drivers.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-users text-shell-red mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-shell-red">Mass Appeal:</span> Resonates with everyday commuters, families, and fleet operators alike.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-trophy text-shell-red mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-shell-red">Competitive Differentiation:</span> Competitors (Petromin, Golden Petrol, Leader Express) rarely use bold Saudi identity overlays — Shell owns the festive positioning.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-balance-scale text-shell-red mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-shell-red">Balanced Messaging:</span> National pride + Shell reliability + clear offer.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            2: {
                title: "Premium & Aspirational",
                content: `
                    <div class="mb-8">
                        <img src="https://ik.imagekit.io/xtj3m9hth/3db79d16-eb48-49e4-9aab-e66881b38203.jpg?updatedAt=1757918369913" 
                             alt="Premium & Aspirational Ad" 
                             class="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8">
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-shell-yellow/10 to-orange-100/50 p-8 rounded-2xl border border-shell-yellow/20">
                            <h4 class="text-2xl font-bold text-shell-yellow mb-6 flex items-center">
                                <i class="fas fa-crown mr-3"></i>
                                Our Creative Solution
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-star text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Premium & Aspirational Visuals:</span> The ad focuses on a single, elegant persona with a luxury car against a modern cityscape. This visual storytelling targets an aspirational audience, linking Shell Helix to personal achievement and premium lifestyles.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-bullseye text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Bold Value Proposition:</span> The offer is presented with a large, immediate visual impact—"FOR EVERY 4 LITERS OF OIL" with prices "140SR Synthetic" and "78SR Mineral" prominently displayed.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-handshake text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Simplified Co-Branding:</span> The ad features both the Shell Helix and Saudi National Day logos, providing a clear brand identity without visual clutter.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-mouse-pointer text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Clear Call to Action:</span> The offer details are front and center, designed to capture attention and drive immediate interest.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-purple-100/50 to-blue-100/50 p-8 rounded-2xl border border-purple-200">
                            <h4 class="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                                <i class="fas fa-rocket mr-3"></i>
                                Why This Works
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-heart text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-purple-600">Targeted Emotional Connection:</span> This creative speaks directly to the individual's journey of ambition and success, a powerful theme that resonates with the National Day spirit of progress.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-gem text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-purple-600">Premium Differentiation:</span> By focusing on a high-end personal narrative, the ad stands out from competitors who often use more generic or family-oriented visuals. It positions Shell as a brand for those who seek and achieve exceptional performance.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-bolt text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-purple-600">High-Impact Messaging:</span> The large, bold text for the offer ensures the key information is absorbed in seconds, maximizing the effectiveness of the ad.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            3: {
                title: "Family-Centric Journey",
                content: `
                    <div class="mb-8">
                        <img src="https://ik.imagekit.io/xtj3m9hth/6c90d72f-cba0-42b6-b38c-bd20ddb3609a.jpg?updatedAt=1757918372950" 
                             alt="Family-Centric Journey Ad" 
                             class="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8">
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-saudi-green/10 to-emerald-100/50 p-8 rounded-2xl border border-saudi-green/20">
                            <h4 class="text-2xl font-bold text-saudi-green mb-6 flex items-center">
                                <i class="fas fa-family mr-3"></i>
                                Our Creative Solution
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-heart text-saudi-green mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Family-Centric Storytelling:</span> Emphasizes togetherness, trust, and pride, aligning with Saudi values.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-mountain text-saudi-green mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Cultural Relevance:</span> Desert landscape + Riyadh skyline + National Day slogan "عزنا بطبعنا" tie Shell to Saudi heritage and modern vision.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-tag text-saudi-green mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Clear Value Proposition:</span> Offer highlighted boldly — 4L at 140 SAR (Synthetic) / 78 SAR (Mineral).
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-shield-alt text-saudi-green mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Product Trust:</span> Visible Helix packs reinforce brand credibility.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-qrcode text-saudi-green mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-saudi-green">Seamless CTA:</span> QR code for instant action & transparency.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-100/50 to-indigo-100/50 p-8 rounded-2xl border border-blue-200">
                            <h4 class="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                                <i class="fas fa-star mr-3"></i>
                                Why This Works
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-heart text-blue-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-blue-600">Emotional Connection:</span> Resonates with Saudi families and everyday drivers, not just premium users.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-users text-blue-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-blue-600">Inclusive Appeal:</span> Covers all segments — personal, family, and commercial drivers.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-trophy text-blue-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-blue-600">Differentiation:</span> Competitors (Petromin, Golden Petrol) focus mainly on product visuals, while Shell here tells a human story.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            4: {
                title: "Premium Lifestyle",
                content: `
                    <div class="mb-8">
                        <img src="https://ik.imagekit.io/xtj3m9hth/aac7c0c2-9bc1-4094-b4f0-d072e36673e5.jpg?updatedAt=1757918372578" 
                             alt="Premium Lifestyle Ad" 
                             class="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8">
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-shell-yellow/10 to-green-100/50 p-8 rounded-2xl border border-shell-yellow/20">
                            <h4 class="text-2xl font-bold text-shell-yellow mb-6 flex items-center">
                                <i class="fas fa-gem mr-3"></i>
                                Our Creative Solution
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-city text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Premium Lifestyle Visuals:</span> A modern Saudi identity through cityscape, luxury car, and elegant persona.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-bullseye text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Clear Value Proposition:</span> Bold display of exclusive offer – 4L for 140 SAR (Synthetic) & 78 SAR (Mineral).
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-flag text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">National Pride Integration:</span> Saudi cultural motif ("عزنا بطبعنا") and green neon designs reflect pride and unity.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-shield-check text-shell-yellow mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-orange-600">Trust & Transparency:</span> T&Cs + QR code for credibility and seamless customer access.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-emerald-100/50 to-teal-100/50 p-8 rounded-2xl border border-emerald-200">
                            <h4 class="text-2xl font-bold text-emerald-600 mb-6 flex items-center">
                                <i class="fas fa-target mr-3"></i>
                                Why This Works
                            </h4>
                            <div class="space-y-4 text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-eye text-emerald-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-emerald-600">Captures Attention:</span> Immediate focus on the offer & Shell branding.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-heart text-emerald-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-emerald-600">Builds Emotional Connection:</span> Blending Saudi pride with Shell quality.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-trophy text-emerald-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-emerald-600">Competitive Edge:</span> More premium and modern than Petromin, Golden Petrol, and Leader Express visuals.
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-rocket text-emerald-600 mt-1 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="font-semibold text-emerald-600">Drives Action:</span> Strong CTA through pricing clarity and QR link.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };
        
        const data = adData[adNumber];
        if (data) {
            modalTitle.textContent = data.title;
            modalContent.innerHTML = data.content;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeAdModal = function() {
        const modal = document.getElementById('ad-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };
    
    // Close modal on outside click
    document.getElementById('ad-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAdModal();
        }
    });
}

// Video player enhancements
function initializeVideoPlayer() {
    const video = document.getElementById('campaign-video');
    
    if (video) {
        // Play button overlay
        const playButton = document.createElement('div');
        playButton.className = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity duration-300';
        playButton.innerHTML = '<i class="fas fa-play text-6xl text-white"></i>';
        
        const container = video.parentElement;
        container.style.position = 'relative';
        
        video.addEventListener('loadedmetadata', function() {
            if (video.paused) {
                container.appendChild(playButton);
            }
        });
        
        playButton.addEventListener('click', function() {
            video.play();
            playButton.remove();
        });
        
        video.addEventListener('play', function() {
            if (playButton.parentElement) {
                playButton.remove();
            }
        });
        
        video.addEventListener('pause', function() {
            if (!playButton.parentElement && video.currentTime < video.duration) {
                container.appendChild(playButton);
            }
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.add('error');
            // Fallback image or placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        });
        
        imageObserver.observe(img);
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for slider
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('slider-dot')) {
            const dots = Array.from(document.querySelectorAll('.slider-dot'));
            const currentIndex = dots.indexOf(e.target);
            
            if (e.key === 'ArrowRight' && currentIndex < dots.length - 1) {
                dots[currentIndex + 1].focus();
                dots[currentIndex + 1].click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                dots[currentIndex - 1].focus();
                dots[currentIndex - 1].click();
            }
        }
    });
    
    // Focus management for modal
    const modal = document.getElementById('ad-modal');
    let lastFocusedElement;
    
    modal?.addEventListener('focusin', function(e) {
        if (!modal.contains(e.target)) {
            e.preventDefault();
            modal.querySelector('button').focus();
        }
    });
    
    // Store last focused element when modal opens
    const originalOpenModal = window.openAdModal;
    window.openAdModal = function(adNumber) {
        lastFocusedElement = document.activeElement;
        originalOpenModal(adNumber);
        setTimeout(() => {
            modal.querySelector('button')?.focus();
        }, 100);
    };
    
    // Restore focus when modal closes
    const originalCloseModal = window.closeAdModal;
    window.closeAdModal = function() {
        originalCloseModal();
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-shell-yellow text-black px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // High contrast toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastToggle.className = 'fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-40';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast');
    
    contrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
    
    document.body.appendChild(contrastToggle);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Track Core Web Vitals
    function trackWebVitals() {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            if (firstInput) {
                console.log('FID:', firstInput.processingStart - firstInput.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    if ('PerformanceObserver' in window) {
        trackWebVitals();
    }
}

// Error handling and fallbacks
function initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        
        // Show user-friendly message for critical errors
        if (e.error && e.error.message) {
            showNotification('An error occurred. Please refresh the page if issues persist.', 'error');
        }
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
    
    // Network status monitoring
    window.addEventListener('online', function() {
        showNotification('Connection restored', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('You are currently offline', 'warning');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    initializePerformanceMonitoring();
    initializeErrorHandling();
});
