/**
 * Main JavaScript - Core Navigation, Header Scroll Effects & Active Links
 * Kachi-Nwoga Uchechukwu Edward Hendrick - Personal Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Header Scroll Backdrop Effect
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial check
  }

  // 2. Mobile Menu Toggle & Focus Trap
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Active Page Nav Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');
  
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check match for exact page or root index
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // 4. Animated Counter Stats (e.g. 15+ Years, 40+ Projects)
  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-counter'), 10);
          const suffix = target.getAttribute('data-suffix') || '';
          let startValue = 0;
          const duration = 1500;
          const stepTime = Math.abs(Math.floor(duration / endValue));
          
          const timer = setInterval(() => {
            startValue += 1;
            target.textContent = startValue + suffix;
            if (startValue >= endValue) {
              target.textContent = endValue + suffix;
              clearInterval(timer);
            }
          }, Math.max(stepTime, 20));

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }
});
