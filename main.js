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
                title: "Heritage Concept Advertisement",
                content: `
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-xl">
                            <div class="text-center">
                                <i class="fas fa-mosque text-6xl text-red-600 mb-4"></i>
                                <h4 class="text-xl font-bold text-red-800 mb-2">Cultural Storytelling</h4>
                                <p class="text-red-700">Connecting Shell Helix with Saudi heritage and traditional values</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-lg font-bold text-gray-800">Creative Elements:</h5>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Traditional Arabian architecture backgrounds</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Calligraphy integration with modern typography</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Heritage colors: Deep greens, gold accents</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Stories of generational trust and reliability</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p class="text-sm text-yellow-800">
                            <i class="fas fa-lightbulb mr-2"></i>
                            <strong>Concept:</strong> "Miles of Heritage" - Showcasing how Shell Helix has been part of Saudi Arabia's journey for decades, 
                            protecting engines through the nation's transformation and growth.
                        </p>
                    </div>
                `
            },
            2: {
                title: "Premium Quality Advertisement",
                content: `
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-xl">
                            <div class="text-center">
                                <i class="fas fa-award text-6xl text-yellow-600 mb-4"></i>
                                <h4 class="text-xl font-bold text-yellow-800 mb-2">Premium Excellence</h4>
                                <p class="text-yellow-700">Highlighting superior Shell Helix technology and performance</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-lg font-bold text-gray-800">Key Messages:</h5>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <i class="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                                    <span>PurePlus Technology from natural gas</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                                    <span>Superior engine cleanliness and protection</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                                    <span>International quality standards</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                                    <span>Trusted by automotive manufacturers globally</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-cog mr-2"></i>
                            <strong>Focus:</strong> Technical excellence meets cultural celebration - demonstrating how premium 
                            quality aligns with Saudi Arabia's pursuit of excellence in all endeavors.
                        </p>
                    </div>
                `
            },
            3: {
                title: "National Pride Advertisement",
                content: `
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-xl">
                            <div class="text-center">
                                <i class="fas fa-flag text-6xl text-green-600 mb-4"></i>
                                <h4 class="text-xl font-bold text-green-800 mb-2">National Pride</h4>
                                <p class="text-green-700">Celebrating Saudi achievements and Vision 2030 progress</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-lg font-bold text-gray-800">Celebration Themes:</h5>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <i class="fas fa-rocket text-green-500 mt-1 mr-2"></i>
                                    <span>Vision 2030 transformation and progress</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-rocket text-green-500 mt-1 mr-2"></i>
                                    <span>National achievements in technology and innovation</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-rocket text-green-500 mt-1 mr-2"></i>
                                    <span>Youth empowerment and future leadership</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-rocket text-green-500 mt-1 mr-2"></i>
                                    <span>Economic diversification success stories</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p class="text-sm text-green-800">
                            <i class="fas fa-heart mr-2"></i>
                            <strong>Message:</strong> "عزنا بطبعنا" - Our pride is in our nature. Shell Helix powers the engines 
                            that drive Saudi Arabia's ambitious future, supporting every mile of progress.
                        </p>
                    </div>
                `
            },
            4: {
                title: "Innovation Focus Advertisement",
                content: `
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-xl">
                            <div class="text-center">
                                <i class="fas fa-atom text-6xl text-gray-600 mb-4"></i>
                                <h4 class="text-xl font-bold text-gray-800 mb-2">Future Innovation</h4>
                                <p class="text-gray-700">Advanced technology meeting tomorrow's challenges</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-lg font-bold text-gray-800">Innovation Highlights:</h5>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <i class="fas fa-microscope text-blue-500 mt-1 mr-2"></i>
                                    <span>Advanced synthetic formulations</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-microscope text-blue-500 mt-1 mr-2"></i>
                                    <span>Cutting-edge engine protection technology</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-microscope text-blue-500 mt-1 mr-2"></i>
                                    <span>Environmental sustainability focus</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-microscope text-blue-500 mt-1 mr-2"></i>
                                    <span>Smart mobility solutions for the future</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p class="text-sm text-purple-800">
                            <i class="fas fa-brain mr-2"></i>
                            <strong>Vision:</strong> Positioning Shell Helix as the intelligent choice for Saudi Arabia's 
                            technological advancement - where traditional values meet innovative solutions.
                        </p>
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