/**
 * BIS Portal — Navigation Module
 * Handles sticky navbar styling on scroll, mobile hamburger drawer,
 * search modal toggle, and dropdown accessibility.
 */

export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const searchBtn = document.querySelector('.btn-search');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchCloseBtn = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input-wrap input');
  const backToTop = document.querySelector('.back-to-top');

  // 1. Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // 2. Back to Top Click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Hamburger Mobile Menu Toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile menu on clicking any link inside it
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Search Modal Overlay Toggle
  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
    });

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('open');
      });
    }

    // Close on overlay backdrop click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('open');
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
        searchOverlay.classList.remove('open');
      }
    });
  }

  // 5. Mobile Accordion for Submenus
  const mobileNavHeaders = document.querySelectorAll('.mobile-dropdown-header');
  mobileNavHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      // Close other accordions
      document.querySelectorAll('.mobile-nav-item.open').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });

      parent.classList.toggle('open', !isOpen);
    });
  });
}
