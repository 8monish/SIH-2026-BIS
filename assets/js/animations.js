/**
 * BIS Portal — Animations & Interactivity Module
 * IntersectionObserver for scroll-reveal animations and animated number counters.
 */

export function initAnimations() {
  // 1. Scroll-reveal Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 2. Animated Stats Counter
  const counterElements = document.querySelectorAll('[data-counter]');

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  } else {
    counterElements.forEach(el => startCounter(el));
  }

  function startCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      // Easing out cubic
      const progress = currentFrame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeOut * target);

      el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

      if (currentFrame >= totalFrames) {
        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        clearInterval(counter);
      }
    }, frameRate);
  }

  // 3. Tab switching helper
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const parentContainer = btn.closest('.tabs-wrapper') || document;

      // Update button active state
      parentContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      parentContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const activePanel = parentContainer.querySelector(`#${targetId}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}
