/**
 * BIS Portal — Common Subpage Navigation & Widget Manager
 * Provides shared accessible header, search modal, mobile drawer, and ManakBot AI integration.
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initChatbot } from './chatbot.js';

export function initCommonPage() {
  initNavigation();
  initAnimations();
  initChatbot();

  // Highlight active link in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Global search modal handler
  const searchInput = document.querySelector('.search-input-wrap input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = encodeURIComponent(searchInput.value.trim());
        if (q) {
          window.location.href = `standards-search.html?q=${q}`;
        }
      }
    });
  }
}
