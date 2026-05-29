/* ==========================================================================
   PORTFOLIO CONTROLLER - LUTHFI DAFFA PRABOWO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNavigation();
  initScrollAnimationsFallback();
});

/* ==========================================================================
   LIGHT / DARK THEMING CONTROLLER
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Check saved choice or system preferences
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Apply light theme if saved or preferred
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-theme');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ==========================================================================
   MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  // Toggle open class
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    
    // Animate hamburger bars to 'X'
    const bars = toggleBtn.querySelectorAll('.bar');
    if (navMenu.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close menu on click of any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const bars = toggleBtn.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  });
}

/* ==========================================================================
   SCROLL ANIMATIONS FALLBACK FOR FIREFOX & OLDER BROWSERS
   ========================================================================== */
function initScrollAnimationsFallback() {
  const isScrollTimelineSupported = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  // Scroll Progress Bar JS Fallback
  if (!isScrollTimelineSupported) {
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight > 0) {
          const scrollPercent = (window.scrollY / docHeight) * 100;
          progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        }
      });
    }
  }

  // 2. High-Performance Trigger-Based Reveal Observer (Universal for all browsers!)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once for performance
      }
    });
  }, {
    root: null,
    threshold: 0.05, // Trigger as soon as 5% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before hitting bottom for responsiveness
  });

  // Section-wide waterfall staggering system (sweeps from top-to-bottom within each section!)
  const sections = document.querySelectorAll('header, section');
  sections.forEach(section => {
    const reveals = section.querySelectorAll('.reveal-on-scroll');
    reveals.forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
    });
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}


