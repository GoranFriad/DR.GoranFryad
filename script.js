// ===== Preloader =====
// Create floating particles in loader
(function createLoaderParticles() {
    const container = document.getElementById('loaderParticles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'loader-particle';
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 4;
        const color = Math.random() > 0.5
            ? 'rgba(12, 110, 189, 0.4)'
            : 'rgba(0, 212, 170, 0.3)';
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${x}%; bottom: -10px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        container.appendChild(p);
    }
})();

// Animate progress bar and dismiss preloader
(function animatePreloader() {
    const bar = document.getElementById('loaderProgressBar');
    const preloader = document.getElementById('preloader');
    if (!bar || !preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress > 95) progress = 95;
        bar.style.width = progress + '%';
    }, 200);

    window.addEventListener('load', () => {
        clearInterval(interval);
        bar.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');
            initAnimations();
        }, 600);
    });
})();

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll behavior for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const current = window.pageYOffset;

    if (current > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = current;

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (current > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Update active nav link based on scroll position
    updateActiveNav();
});

// Mobile toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Update active nav link
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Back to Top =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Animations =====
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);

                    entry.target.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ===== Hero Particles =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 8 + 6;
        const opacity = Math.random() * 0.3 + 0.1;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: ${Math.random() > 0.5 ? 'rgba(12, 110, 189, 0.6)' : 'rgba(0, 212, 170, 0.4)'};
            opacity: ${opacity};
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        `;

        container.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { 
                transform: translate(0, 0) scale(1); 
                opacity: var(--opacity, 0.2);
            }
            25% { 
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -40}px) scale(1.2); 
            }
            50% { 
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -80}px) scale(0.8); 
                opacity: calc(var(--opacity, 0.2) * 1.5);
            }
            75% { 
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -40}px) scale(1.1); 
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ===== Contact Form =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn');
        const originalContent = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent! ✓</span>';
            btn.style.background = 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.style.pointerEvents = '';
                contactForm.reset();
            }, 2500);
        }, 1500);
    });
}

// ===== Smooth Section Reveal =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PWA Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}

// ===== PWA Install Prompt (All Platforms: Windows, Mac, iOS, Android) =====
let deferredPrompt = null;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');
const installMessage = document.getElementById('installMessage');

// Detect platform
function getPlatformInfo() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isMac = /Macintosh|MacIntel/.test(ua) && !isIOS;
    const isAndroid = /Android/.test(ua);
    const isWindows = /Windows/.test(ua);
    const isChrome = /Chrome/.test(ua) && !/Edge|Edg|OPR/.test(ua);
    const isEdge = /Edg/.test(ua);
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
    const isFirefox = /Firefox/.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;

    return { isIOS, isMac, isAndroid, isWindows, isChrome, isEdge, isSafari, isFirefox, isStandalone };
}

// Check if dismissed recently (24 hours only)
function isDismissed() {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (!dismissed) return false;
    const dismissTime = parseInt(dismissed);
    if (Date.now() - dismissTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('pwa-install-dismissed');
        return false;
    }
    return true;
}

// Capture native install prompt (Chrome/Edge on Windows, Mac, Android)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
});

// Show install banner with platform-specific instructions
function showInstallBanner() {
    if (isDismissed() || !installBanner) return;

    const p = getPlatformInfo();
    if (p.isStandalone) return; // Already installed as app

    if (deferredPrompt) {
        // Native install available (Chrome/Edge on Windows, Mac, Android)
        if (installMessage) installMessage.textContent = 'Install for offline access & quick launch';
        if (installBtn) { installBtn.textContent = 'Install'; installBtn.style.display = ''; }
    } else if (p.isIOS) {
        // iPhone / iPad (Safari)
        if (installMessage) installMessage.innerHTML = 'Tap <b>Share ⬆</b> then <b>"Add to Home Screen"</b>';
        if (installBtn) { installBtn.textContent = 'OK'; installBtn.style.display = ''; }
    } else if (p.isSafari && p.isMac) {
        // macOS Safari
        if (installMessage) installMessage.innerHTML = 'Click <b>File → Add to Dock</b> to install';
        if (installBtn) { installBtn.textContent = 'OK'; installBtn.style.display = ''; }
    } else if (p.isFirefox) {
        // Firefox (all platforms)
        if (installMessage) installMessage.innerHTML = 'Open in <b>Chrome</b> or <b>Edge</b> to install as app';
        if (installBtn) { installBtn.textContent = 'OK'; installBtn.style.display = ''; }
    } else if (p.isWindows || p.isMac) {
        // Windows/Mac with other browsers
        if (installMessage) installMessage.innerHTML = 'Use browser menu <b>⋮ → Install App</b>';
        if (installBtn) { installBtn.textContent = 'OK'; installBtn.style.display = ''; }
    } else {
        // Android or other
        if (installMessage) installMessage.innerHTML = 'Use browser menu <b>⋮ → Add to Home Screen</b>';
        if (installBtn) { installBtn.textContent = 'OK'; installBtn.style.display = ''; }
    }

    installBanner.classList.add('show');
}

// Always show banner after page load for ALL platforms
window.addEventListener('load', () => {
    setTimeout(() => {
        // If native prompt didn't fire, still show with instructions
        if (!deferredPrompt) {
            showInstallBanner();
        }
    }, 2500);
});

// Install button click
if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Trigger native browser install prompt
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('Install outcome:', outcome);
            deferredPrompt = null;
        }
        installBanner.classList.remove('show');
    });
}

// Dismiss button click
if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        installBanner.classList.remove('show');
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    });
}

// Hide banner when app is installed
window.addEventListener('appinstalled', () => {
    installBanner.classList.remove('show');
    deferredPrompt = null;
    console.log('App installed successfully!');
});

// ===== Certificate Gallery Slideshow =====
(function () {
    const track = document.getElementById('slideshowTrack');
    const dotsContainer = document.getElementById('slideDots');
    const counter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');

    if (!track) return;

    const slides = track.querySelectorAll('.slide');
    const total = slides.length;
    let current = 0;
    let autoPlayTimer;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        current = ((index % total) + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;

        // Update dots
        dotsContainer.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });

        // Update counter
        if (counter) counter.textContent = `${current + 1} / ${total}`;

        // Reset auto-play
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Auto-play
    function startAutoPlay() {
        autoPlayTimer = setInterval(next, 4000);
    }
    startAutoPlay();

    // Pause on hover
    const slideshow = track.closest('.slideshow');
    slideshow.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    slideshow.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoPlayTimer);
    }, { passive: true });

    slideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
        startAutoPlay();
    }, { passive: true });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // ===== Lightbox =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let lightboxIndex = 0;

    const images = Array.from(slides).map(s => s.querySelector('img').src);

    // Open lightbox on slide click
    slides.forEach((slide, i) => {
        slide.querySelector('img').addEventListener('click', () => {
            lightboxIndex = i;
            lightboxImg.src = images[i];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function lightboxGoTo(index) {
        lightboxIndex = ((index % total) + total) % total;
        lightboxImg.src = images[lightboxIndex];
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => lightboxGoTo(lightboxIndex - 1));
    lightboxNext.addEventListener('click', () => lightboxGoTo(lightboxIndex + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxGoTo(lightboxIndex - 1);
        if (e.key === 'ArrowRight') lightboxGoTo(lightboxIndex + 1);
    });
})();
