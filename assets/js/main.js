/**
 * BIS Portal — Main Application Orchestrator
 * Bootstraps navigation, carousel, animations, and chatbot.
 */

import { initNavigation } from './navigation.js';
import { initCarousel } from './carousel.js';
import { initAnimations } from './animations.js';
import { initChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initNavigation();
  initCarousel();
  initAnimations();
  initChatbot();

  console.log('Bureau of Indian Standards (BIS) Portal initialized successfully.');
});
