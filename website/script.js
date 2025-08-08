// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const fadeElements = document.querySelectorAll('.fade-in');

// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Add click listener
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('portfolio-theme', theme);
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Mobile menu toggle
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });

        // Navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    sidebar.classList.remove('open');
                }
            });
        });

        // Update active link on scroll
        this.updateActiveNavOnScroll();
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const navHeight = window.innerWidth > 1024 ? 0 : 80; // Account for mobile header

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + navHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Accordion Management
class AccordionManager {
    constructor() {
        this.init();
    }

    init() {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                this.toggleAccordion(header);
            });
        });

        // Open first accordion by default
        if (accordionHeaders.length > 0) {
            this.toggleAccordion(accordionHeaders[0]);
        }
    }

    toggleAccordion(header) {
        const content = document.getElementById(header.dataset.target);
        const isActive = header.classList.contains('active');

        // Close all accordions
        accordionHeaders.forEach(h => {
            h.classList.remove('active');
            const c = document.getElementById(h.dataset.target);
            if (c) {
                c.classList.remove('active');
            }
        });

        // Open clicked accordion if it wasn't active
        if (!isActive) {
            header.classList.add('active');
            if (content) {
                content.classList.add('active');
            }
        }
    }
}

// Scroll Animation Manager
class ScrollAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Create intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay for elements in the same container
                    const delay = this.getAnimationDelay(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        fadeElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    getAnimationDelay(element) {
        // Add staggered delay for elements in grids or lists
        const parent = element.parentElement;
        const siblings = Array.from(parent.children).filter(child => 
            child.classList.contains('fade-in')
        );
        const index = siblings.indexOf(element);
        
        // Stagger animations by 100ms for each element
        return index * 100;
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
        
        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll-dependent animations here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    preloadResources() {
        // Preload critical CSS and fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
}

// Analytics and Tracking (Optional)
class AnalyticsManager {
    constructor() {
        this.init();
    }

    init() {
        // Track user interactions
        this.trackClicks();
        this.trackScrollDepth();
        this.trackTimeOnSite();
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const element = e.target.closest('a, button');
            if (element) {
                // Log click events (replace with your analytics service)
                console.log('Click tracked:', {
                    element: element.tagName,
                    text: element.textContent,
                    href: element.href || null,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track scroll milestones
                if (maxScroll % 25 === 0) {
                    console.log('Scroll depth:', maxScroll + '%');
                }
            }
        });
    }

    trackTimeOnSite() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeOnSite = Math.round((Date.now() - startTime) / 1000);
            console.log('Time on site:', timeOnSite + ' seconds');
        });
    }
}

// Contact Form Enhancement (if needed in the future)
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        // Enhance contact links with tracking
        const contactLinks = document.querySelectorAll('.contact-method');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                const type = link.querySelector('.contact-info h3').textContent;
                console.log('Contact method used:', type);
            });
        });
    }
}

// Enhanced Error Handling
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }

    init() {
        // JavaScript runtime errors
        window.addEventListener('error', (e) => {
            const error = {
                type: 'JavaScript Error',
                message: e.message,
                filename: e.filename,
                line: e.lineno,
                column: e.colno,
                stack: e.error?.stack,
                timestamp: new Date().toISOString()
            };
            this.logError(error);
        });

        // Promise rejection errors
        window.addEventListener('unhandledrejection', (e) => {
            const error = {
                type: 'Unhandled Promise Rejection',
                message: e.reason?.message || e.reason,
                stack: e.reason?.stack,
                timestamp: new Date().toISOString()
            };
            this.logError(error);
        });

        // Resource loading errors
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                const error = {
                    type: 'Resource Loading Error',
                    element: e.target.tagName,
                    source: e.target.src || e.target.href,
                    message: `Failed to load ${e.target.tagName}: ${e.target.src || e.target.href}`,
                    timestamp: new Date().toISOString()
                };
                this.logError(error);
                this.handleResourceError(e.target);
            }
        }, true);

        // Network errors for fetch requests
        this.interceptFetch();
    }

    logError(error) {
        this.errors.push(error);
        console.error('🚨 Error Detected:', error);
        
        // Show user-friendly error notification
        this.showErrorNotification(error);
        
        // Store in localStorage for debugging
        try {
            const storedErrors = JSON.parse(localStorage.getItem('portfolio-errors') || '[]');
            storedErrors.push(error);
            // Keep only last 10 errors
            if (storedErrors.length > 10) storedErrors.shift();
            localStorage.setItem('portfolio-errors', JSON.stringify(storedErrors));
        } catch (e) {
            console.warn('Could not store error in localStorage:', e);
        }
    }

    handleResourceError(element) {
        if (element.tagName === 'IMG') {
            // Fallback for broken images
            element.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = '<i class="fas fa-image"></i><p>Image not available</p>';
            element.parentNode?.insertBefore(fallback, element);
        } else if (element.tagName === 'SCRIPT') {
            // Handle missing JavaScript files
            console.warn('Script failed to load, some features may not work:', element.src);
        } else if (element.tagName === 'LINK') {
            // Handle missing CSS files
            console.warn('Stylesheet failed to load, styling may be affected:', element.href);
        }
    }

    interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    const error = {
                        type: 'Network Error',
                        message: `HTTP ${response.status}: ${response.statusText}`,
                        url: args[0],
                        status: response.status,
                        timestamp: new Date().toISOString()
                    };
                    this.logError(error);
                }
                return response;
            } catch (error) {
                const networkError = {
                    type: 'Network Error',
                    message: error.message,
                    url: args[0],
                    timestamp: new Date().toISOString()
                };
                this.logError(networkError);
                throw error;
            }
        };
    }

    showErrorNotification(error) {
        // Create error notification element
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>${error.type}</strong>
                    <p>${error.message}</p>
                </div>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#error-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'error-notification-styles';
            styles.textContent = `
                .error-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #fee;
                    border: 1px solid #fcc;
                    border-radius: 8px;
                    padding: 15px;
                    max-width: 400px;
                    z-index: 10000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    animation: slideIn 0.3s ease;
                }
                .error-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                }
                .error-notification i.fa-exclamation-triangle {
                    color: #d32f2f;
                    font-size: 20px;
                    margin-top: 2px;
                }
                .error-notification strong {
                    color: #d32f2f;
                    font-size: 14px;
                }
                .error-notification p {
                    margin: 5px 0 0 0;
                    font-size: 13px;
                    color: #666;
                }
                .error-close {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    margin-left: auto;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Method to get all errors for debugging
    getErrors() {
        return this.errors;
    }

    // Method to clear errors
    clearErrors() {
        this.errors = [];
        localStorage.removeItem('portfolio-errors');
    }
}

// Global error handler instance for debugging
let globalErrorHandler;

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new NavigationManager();
    new AccordionManager();
    new ScrollAnimationManager();
    
    // Performance and analytics
    new PerformanceManager();
    new AnalyticsManager();
    new ContactManager();
    globalErrorHandler = new ErrorHandler();
    
    // Custom animations for specific elements
    initCustomAnimations();
    
    // Make error debugging available globally
    window.getErrors = () => globalErrorHandler.getErrors();
    window.clearErrors = () => globalErrorHandler.clearErrors();
    window.showStoredErrors = () => {
        const stored = localStorage.getItem('portfolio-errors');
        if (stored) {
            console.table(JSON.parse(stored));
        } else {
            console.log('No stored errors found');
        }
    };
});

// Custom animations and interactions
function initCustomAnimations() {
    // Typing effect for main headline (optional)
    const headline = document.querySelector('.section-title');
    if (headline && headline.textContent.includes('Driving Business Transformation')) {
        // Could add a typing animation here if desired
    }
    
    // Parallax effect for profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseover', () => {
            profileImage.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseout', () => {
            profileImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Number counting animation for metrics
    const metrics = document.querySelectorAll('.metric-value');
    const observerOptions = {
        threshold: 0.5
    };
    
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                metricsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });
}

// Animate numerical metrics
function animateMetric(element) {
    const text = element.textContent;
    const hasNumber = text.match(/\d+/);
    
    if (hasNumber) {
        const number = parseInt(hasNumber[0]);
        const suffix = text.replace(hasNumber[0], '');
        let current = 0;
        const increment = number / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Service Worker Registration (for caching and offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register a service worker here for PWA functionality
        console.log('Service Worker support available');
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Improve focus visibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        AccordionManager,
        ScrollAnimationManager
    };
}