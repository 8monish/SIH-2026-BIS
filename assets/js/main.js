/**
 * BIS Portal — Main Application Orchestrator
 * Bootstraps navigation, carousel, animations, and chatbot.
 */

import { initNavigation } from './navigation.js';
import { initCarousel } from './carousel.js';
import { initAnimations } from './animations.js';
import { initChatbot } from './chatbot.js';
import { initAccessibility } from './accessibility.js';
import { initFormAutofillWatcher } from './form-autofill.js';
import { renderLanguageSelector, updatePageDOMTranslations } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initNavigation();
  initCarousel();
  initAnimations();
  initChatbot();
  initAccessibility();
  initFormAutofillWatcher();
  updatePageDOMTranslations();
  renderLanguageSelector('topbar-lang-container');

  console.log('Bureau of Indian Standards (BIS) Portal initialized successfully.');
});
