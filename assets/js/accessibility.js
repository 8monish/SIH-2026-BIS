/**
 * BIS Portal — Comprehensive Accessibility Suite (a11y)
 * Handles font resizing, high contrast, dyslexia fonts, link highlighting,
 * big cursors, speech synthesis reader, and persistent user preferences.
 */

const A11Y_STORAGE_KEY = 'bis_a11y_preferences';

const defaultPreferences = {
  fontSizeScale: 0, // -2, -1, 0, 1, 2, 3
  contrastMode: 'normal', // 'normal', 'dark', 'light', 'grayscale', 'invert'
  dyslexicFont: false,
  wideSpacing: false,
  spaciousLines: false,
  highlightLinks: false,
  bigCursor: false,
  stopAnimations: false,
  speechReader: false
};

let currentPrefs = { ...defaultPreferences };

export function initAccessibility() {
  loadPreferences();
  injectAccessibilityDOM();
  applyPreferences();
  bindTopBarEvents();
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem(A11Y_STORAGE_KEY);
    if (saved) {
      currentPrefs = { ...defaultPreferences, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not load accessibility preferences:', e);
  }
}

function savePreferences() {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(currentPrefs));
  } catch (e) {
    console.warn('Could not save accessibility preferences:', e);
  }
}

// ── 1. INJECT FLOATING ACCESSIBILITY WIDGET & MODAL DOM ──
function injectAccessibilityDOM() {
  if (document.getElementById('a11y-floating-trigger')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'a11y-portal-container';
  wrapper.innerHTML = `
    <!-- Floating Trigger Button (Bottom-left corner) -->
    <button id="a11y-floating-trigger" class="a11y-trigger" title="Open Accessibility Suite (Alt + A)" aria-label="Accessibility Options">
      <svg class="a11y-trigger-icon" viewBox="0 0 24 24">
        <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
      </svg>
      <span>Accessibility</span>
    </button>

    <!-- Modal Backdrop & Panel -->
    <div id="a11y-panel-backdrop" class="a11y-panel-backdrop" role="dialog" aria-modal="true" aria-labelledby="a11y-title">
      <div class="a11y-panel">
        <div class="a11y-header">
          <h3 id="a11y-title" class="a11y-header-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
            </svg>
            Accessibility Controls & Tools
          </h3>
          <button id="a11y-close-btn" class="a11y-close-btn" aria-label="Close Accessibility Panel">&times;</button>
        </div>

        <div class="a11y-body">
          <!-- Text Sizing -->
          <div class="a11y-section">
            <h4 class="a11y-section-title">Text Size Adjustment</h4>
            <div class="a11y-grid">
              <button class="a11y-btn" data-a11y-action="font-dec">
                <span class="a11y-btn-icon">A-</span>
                <span>Decrease</span>
              </button>
              <button class="a11y-btn" data-a11y-action="font-reset">
                <span class="a11y-btn-icon">A</span>
                <span>Default</span>
              </button>
              <button class="a11y-btn" data-a11y-action="font-inc">
                <span class="a11y-btn-icon">A+</span>
                <span>Increase</span>
              </button>
            </div>
          </div>

          <!-- High Contrast Modes -->
          <div class="a11y-section">
            <h4 class="a11y-section-title">Display & Contrast Modes</h4>
            <div class="a11y-grid">
              <button class="a11y-btn" data-a11y-contrast="normal">
                <span class="a11y-btn-icon">🎨</span>
                <span>Default</span>
              </button>
              <button class="a11y-btn" data-a11y-contrast="dark">
                <span class="a11y-btn-icon">🌙</span>
                <span>High Contrast Dark</span>
              </button>
              <button class="a11y-btn" data-a11y-contrast="light">
                <span class="a11y-btn-icon">☀️</span>
                <span>High Contrast Light</span>
              </button>
              <button class="a11y-btn" data-a11y-contrast="grayscale">
                <span class="a11y-btn-icon">👁️</span>
                <span>Grayscale</span>
              </button>
              <button class="a11y-btn" data-a11y-contrast="invert">
                <span class="a11y-btn-icon">🔄</span>
                <span>Invert Colors</span>
              </button>
            </div>
          </div>

          <!-- Reading & Vision Supports -->
          <div class="a11y-section">
            <h4 class="a11y-section-title">Reading & Focus Tools</h4>
            <div class="a11y-grid">
              <button class="a11y-btn" data-a11y-toggle="dyslexicFont">
                <span class="a11y-btn-icon">📖</span>
                <span>Dyslexic Font</span>
              </button>
              <button class="a11y-btn" data-a11y-toggle="highlightLinks">
                <span class="a11y-btn-icon">🔗</span>
                <span>Highlight Links</span>
              </button>
              <button class="a11y-btn" data-a11y-toggle="spaciousLines">
                <span class="a11y-btn-icon">↕️</span>
                <span>Line Spacing</span>
              </button>
              <button class="a11y-btn" data-a11y-toggle="bigCursor">
                <span class="a11y-btn-icon">🖱️</span>
                <span>Big Cursor</span>
              </button>
              <button class="a11y-btn" data-a11y-toggle="stopAnimations">
                <span class="a11y-btn-icon">⏸️</span>
                <span>Pause Motion</span>
              </button>
              <button class="a11y-btn" data-a11y-toggle="speechReader">
                <span class="a11y-btn-icon">🔊</span>
                <span>Screen Reader (TTS)</span>
              </button>
            </div>
          </div>
        </div>

        <div class="a11y-footer">
          <span style="font-size:12px; color:#64748b;">Shortcut: Press <strong>Alt + A</strong> to toggle</span>
          <button id="a11y-reset-all" class="a11y-reset-btn">Reset All Settings</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  bindPanelEvents();
}

function bindPanelEvents() {
  const trigger = document.getElementById('a11y-floating-trigger');
  const backdrop = document.getElementById('a11y-panel-backdrop');
  const closeBtn = document.getElementById('a11y-close-btn');
  const resetBtn = document.getElementById('a11y-reset-all');

  function openPanel() {
    backdrop?.classList.add('active');
  }

  function closePanel() {
    backdrop?.classList.remove('active');
  }

  if (trigger) trigger.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePanel();
    });
  }

  // Keyboard shortcut Alt + A
  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      if (backdrop?.classList.contains('active')) {
        closePanel();
      } else {
        openPanel();
      }
    }
    if (e.key === 'Escape' && backdrop?.classList.contains('active')) {
      closePanel();
    }
  });

  // Action Buttons
  document.querySelectorAll('[data-a11y-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-a11y-action');
      if (action === 'font-inc' && currentPrefs.fontSizeScale < 3) {
        currentPrefs.fontSizeScale += 1;
      } else if (action === 'font-dec' && currentPrefs.fontSizeScale > -2) {
        currentPrefs.fontSizeScale -= 1;
      } else if (action === 'font-reset') {
        currentPrefs.fontSizeScale = 0;
      }
      savePreferences();
      applyPreferences();
    });
  });

  // Contrast Buttons
  document.querySelectorAll('[data-a11y-contrast]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPrefs.contrastMode = btn.getAttribute('data-a11y-contrast');
      savePreferences();
      applyPreferences();
    });
  });

  // Toggle Buttons
  document.querySelectorAll('[data-a11y-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prop = btn.getAttribute('data-a11y-toggle');
      currentPrefs[prop] = !currentPrefs[prop];
      savePreferences();
      applyPreferences();
    });
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentPrefs = { ...defaultPreferences };
      savePreferences();
      applyPreferences();
    });
  }
}

// ── 2. BIND TOP-BAR ACCESSIBILITY BUTTONS ACROSS THE PORTAL ──
function bindTopBarEvents() {
  // Bind top bar font resize controls if present in static HTML header
  document.querySelectorAll('.font-resize-inc, [data-a11y-btn="inc"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPrefs.fontSizeScale < 3) currentPrefs.fontSizeScale += 1;
      savePreferences();
      applyPreferences();
    });
  });

  document.querySelectorAll('.font-resize-dec, [data-a11y-btn="dec"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPrefs.fontSizeScale > -2) currentPrefs.fontSizeScale -= 1;
      savePreferences();
      applyPreferences();
    });
  });

  document.querySelectorAll('.font-resize-reset, [data-a11y-btn="reset"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      currentPrefs.fontSizeScale = 0;
      savePreferences();
      applyPreferences();
    });
  });
}

// ── 3. APPLY PREFERENCES TO DOM ──
function applyPreferences() {
  const root = document.documentElement;
  const body = document.body;

  // 1. Font Size Scaling
  const baseSize = 16;
  const newSize = baseSize + currentPrefs.fontSizeScale * 2;
  root.style.fontSize = `${newSize}px`;

  // Update elements with data-cya11y-org-font-size
  document.querySelectorAll('[data-cya11y-org-font-size]').forEach(el => {
    const org = parseInt(el.getAttribute('data-cya11y-org-font-size'), 10);
    if (!isNaN(org)) {
      el.style.fontSize = `${org + currentPrefs.fontSizeScale * 2}px`;
    }
  });

  // 2. Contrast Modes
  body.classList.remove('a11y-high-contrast-dark', 'a11y-high-contrast-light', 'a11y-grayscale', 'a11y-invert');
  if (currentPrefs.contrastMode === 'dark') {
    body.classList.add('a11y-high-contrast-dark');
  } else if (currentPrefs.contrastMode === 'light') {
    body.classList.add('a11y-high-contrast-light');
  } else if (currentPrefs.contrastMode === 'grayscale') {
    body.classList.add('a11y-grayscale');
  } else if (currentPrefs.contrastMode === 'invert') {
    body.classList.add('a11y-invert');
  }

  // 3. Dyslexic Font
  body.classList.toggle('a11y-dyslexic-font', !!currentPrefs.dyslexicFont);

  // 4. Wide Spacing & Spacious Lines
  body.classList.toggle('a11y-spacious-lines', !!currentPrefs.spaciousLines);

  // 5. Highlight Links
  body.classList.toggle('a11y-highlight-links', !!currentPrefs.highlightLinks);

  // 6. Big Cursor
  body.classList.toggle('a11y-big-cursor', !!currentPrefs.bigCursor);

  // 7. Stop Animations
  body.classList.toggle('a11y-stop-animations', !!currentPrefs.stopAnimations);

  // 8. Speech Reader Click Handler
  if (currentPrefs.speechReader) {
    enableSpeechReader();
  } else {
    disableSpeechReader();
  }

  // Update Active States on Panel Buttons
  updatePanelUI();
}

function updatePanelUI() {
  document.querySelectorAll('[data-a11y-contrast]').forEach(btn => {
    const mode = btn.getAttribute('data-a11y-contrast');
    btn.classList.toggle('active', currentPrefs.contrastMode === mode);
  });

  document.querySelectorAll('[data-a11y-toggle]').forEach(btn => {
    const prop = btn.getAttribute('data-a11y-toggle');
    btn.classList.toggle('active', !!currentPrefs[prop]);
  });
}

// ── 4. SPEECH READER (TTS ON CLICK) ──
function handleTextClickToSpeech(e) {
  const target = e.target;
  if (!target || target.closest('#a11y-portal-container') || target.closest('.chatbot-window')) return;

  const text = target.innerText || target.textContent;
  if (!text || text.trim().length < 2) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.rate = 1.0;
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  }
}

function enableSpeechReader() {
  document.addEventListener('click', handleTextClickToSpeech, true);
}

function disableSpeechReader() {
  document.removeEventListener('click', handleTextClickToSpeech, true);
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
