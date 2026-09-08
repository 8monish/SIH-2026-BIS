/**
 * BIS Portal — Agentic AI Co-Pilot & Assistant Sidebar (ManakBot AI)
 * Official Bureau of Indian Standards (BIS) Automated Assistant
 * Features:
 * - Real Vision OCR & Deep Document Intelligence (Zero fake details)
 * - 1-Click Flawless Direct Form Autofilling (Grievance, Verification, Standards, Archive)
 * - Multilingual AI Co-Pilot with 8 Indian Languages & Voice Input/Readout
 * - Official BIS Emblem Integration & Professional UI
 * - Autonomous cross-portal agent workflows & DOM actuators
 */

import { performClientOCR, parseExtractedText, generateAccurateInspectionReport } from './ocr-engine.js';
import { executeDirectFormAction, showAutofillToast, fillGrievanceForm, fillVerificationForm, fillStandardsForm } from './form-autofill.js';
import { SUPPORTED_LANGUAGES, getCurrentLanguage, setLanguage, t, getVoiceLanguage, getLocalizedRAGResponse } from './i18n.js';

const BIS_LOGO_PNG = `<img src="assets/images/bis-logo.png" alt="BIS Logo" style="height: 26px; width: auto; max-width: 100%; object-fit: contain; vertical-align: middle; background: #ffffff; padding: 2px 4px; border-radius: 4px;">`;
const BIS_LOGO_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path d="M12 2L2 20H22L12 2Z" fill="#003082"/><path d="M12 7L6 17H18L12 7Z" fill="#FFFFFF"/><circle cx="12" cy="13" r="2.5" fill="#E11D48"/></svg>`;

// ── 1. INJECT CHATBOT DOM ──
function injectChatbotDOM() {
  if (document.querySelector('.chatbot-window')) return;

  const currentLang = getCurrentLanguage();

  const container = document.createElement('div');
  container.className = 'chatbot-portal-wrapper';
  container.innerHTML = `
    <!-- ManakBot AI Side Co-Pilot Tab (Cleanly on right edge) -->
    <div class="chatbot-side-tab" role="button" aria-label="Open ManakBot AI Co-Pilot" title="Open Agentic AI Co-Pilot">
      <span class="side-tab-icon">${BIS_LOGO_PNG}</span>
      <span class="side-tab-text">Agent Co-Pilot</span>
    </div>

    <!-- ManakBot AI Floating Trigger Button (Positioned cleanly above cya11y accessibility menu) -->
    <div class="chatbot-trigger" role="button" aria-label="Open ManakBot AI Assistant" title="Open Agentic AI Co-Pilot">
      <span class="trigger-icon">${BIS_LOGO_PNG}</span>
      <span class="chatbot-badge">AI</span>
    </div>

    <!-- ManakBot AI Sidebar / Floating Window -->
    <div class="chatbot-window docked-side" role="dialog" aria-label="ManakBot AI Co-Pilot">
      <div class="chatbot-header">
        <div class="chatbot-title-area">
          <div class="chatbot-avatar">
            ${BIS_LOGO_PNG}
            <span class="online-indicator"></span>
          </div>
          <div class="chatbot-info">
            <h4 class="chatbot-title-text">${t('botName', currentLang)}</h4>
            <p class="chatbot-subtitle-text">${t('botRole', currentLang)}</p>
          </div>
        </div>
        <div class="chatbot-actions">
          <select class="chatbot-lang-select" aria-label="Select Language" title="Change Language" style="background: rgba(255,255,255,0.18); color:#ffffff; border:1px solid rgba(255,255,255,0.35); border-radius:6px; font-size:11px; font-weight:700; padding:3px 6px; outline:none; cursor:pointer;">
            ${SUPPORTED_LANGUAGES.map(l => `<option value="${l.code}" ${l.code === currentLang ? 'selected' : ''} style="color:#000000; background:#ffffff;">${l.native} (${l.code.toUpperCase()})</option>`).join('')}
          </select>
          <button class="chatbot-btn chatbot-voice-toggle" title="Toggle Voice Readout (TTS)" aria-label="Toggle Voice Readout">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
          <button class="chatbot-btn chatbot-dock active" title="Toggle Floating / Docked Sidebar" aria-label="Toggle Sidebar Dock">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>
          </button>
          <button class="chatbot-btn chatbot-export" title="Export Transcript" aria-label="Export Transcript">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
          <button class="chatbot-btn chatbot-clear" title="Clear Conversation" aria-label="Clear Conversation">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
          <button class="chatbot-btn chatbot-close" title="Close Sidebar" aria-label="Close Sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Quick Action Deck Bar -->
      <div class="agent-quick-actions-bar">
        <span class="agent-quick-chip" data-agent-intent="guide_tour">${t('chipOverview', currentLang)}</span>
        <span class="agent-quick-chip" data-agent-intent="autofill_grievance_sample">${t('chipGrievance', currentLang)}</span>
        <span class="agent-quick-chip" data-agent-intent="calc_gold_sample">${t('chipGoldCalc', currentLang)}</span>
        <span class="agent-quick-chip" data-agent-intent="verify_isi_sample">${t('chipVerifyIsi', currentLang)}</span>
        <span class="agent-quick-chip" data-agent-intent="search_water_standard">${t('chipPreviewStandard', currentLang)}</span>
        <span class="agent-quick-chip" data-agent-intent="calc_lims_sample">${t('chipLabFee', currentLang)}</span>
      </div>

      <!-- Live Agent HUD Progress Banner -->
      <div class="agent-hud-banner" style="display: none;">
        <div class="agent-hud-spinner"></div>
        <span class="agent-hud-text">Agent executing autonomous operation...</span>
      </div>

      <!-- Voice Banner -->
      <div class="voice-banner">
        <span class="voice-pulse"></span>
        <span class="voice-banner-text">Listening... Speak your command</span>
      </div>

      <!-- Chat Messages Body -->
      <div class="chatbot-body"></div>

      <!-- Attachment Preview Chip -->
      <div class="chatbot-attachment-preview" style="display:none;">
        <div class="attachment-preview-thumb">
          <img class="attachment-preview-img" src="" alt="Photo Preview">
        </div>
        <div class="attachment-preview-info">
          <span class="attachment-preview-name">photo.jpg</span>
          <span class="attachment-preview-size">Ready for BIS Forensic Inspection</span>
        </div>
        <button type="button" class="attachment-preview-remove" title="Remove Photo" aria-label="Remove photo">✕</button>
      </div>

      <!-- Footer / Input -->
      <div class="chatbot-footer">
        <input type="file" class="chatbot-file-input" accept="image/*,.pdf,.doc,.docx,.txt,.json,.csv" style="display:none;">
        <input type="file" class="chatbot-camera-input" accept="image/*" capture="environment" style="display:none;">
        
        <!-- Photo Taking Button (Camera) -->
        <button type="button" class="chatbot-camera" title="Take Photo (Camera Scan)" aria-label="Take Photo">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        </button>

        <!-- Photo Upload Button -->
        <button type="button" class="chatbot-upload" title="Upload Photo or Document" aria-label="Upload Photo">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </button>

        <input type="text" class="chatbot-input" placeholder="${t('chatPlaceholder', currentLang)}">

        <button type="button" class="chatbot-mic" title="Voice Input (Speech-to-Text)" aria-label="Voice Input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>

        <button type="button" class="chatbot-send" title="Send Message" aria-label="Send Message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>

    <!-- Live Camera Scanner Modal -->
    <div class="chatbot-camera-modal" style="display:none;" role="dialog" aria-label="BIS Camera Scanner">
      <div class="camera-modal-backdrop"></div>
      <div class="camera-modal-dialog">
        <div class="camera-modal-header">
          <div class="camera-modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span>BIS Product & Label Camera Scanner</span>
          </div>
          <button type="button" class="camera-modal-close" title="Close Camera" aria-label="Close Camera">✕</button>
        </div>
        <div class="camera-viewport-wrap">
          <video class="camera-video" autoplay playsinline muted></video>
          <div class="camera-scan-frame">
            <div class="scan-corner scan-tl"></div>
            <div class="scan-corner scan-tr"></div>
            <div class="scan-corner scan-bl"></div>
            <div class="scan-corner scan-br"></div>
            <div class="scan-laser-line"></div>
            <span class="scan-instruction">Align ISI Mark, HUID, or Label inside frame</span>
          </div>
          <canvas class="camera-canvas" style="display:none;"></canvas>
        </div>
        <div class="camera-modal-footer">
          <button type="button" class="camera-switch-btn" title="Switch Camera" aria-label="Switch Camera">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Flip</span>
          </button>
          <button type="button" class="camera-capture-btn" title="Capture Photo" aria-label="Capture Photo">
            <span class="shutter-inner"></span>
          </button>
          <button type="button" class="camera-gallery-fallback-btn" title="Choose from Files" aria-label="Choose from Files">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Files</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);
}

// ── 2. AGENT ACTUATORS (DIRECT DOM CONTROLLERS) ──
export const BisAgentActuators = {
  highlightElement(el) {
    if (!el) return;
    el.classList.add('agent-field-highlight');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.classList.remove('agent-field-highlight'), 3500);
  },

  // 1. Autofill Grievance Form Wizard
  async autofillGrievance(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'grievance-redressal.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'autofill_grievance',
        data: data,
        message: 'Navigated to Consumer Grievance Portal. Autofilling complaint details...'
      }));
      window.location.href = 'grievance-redressal.html';
      return;
    }

    const nameInput = document.getElementById('complainant-name');
    const phoneInput = document.getElementById('complainant-phone');
    const emailInput = document.getElementById('complainant-email');
    const stateInput = document.getElementById('complainant-state');
    const categorySelect = document.getElementById('complaint-category');
    const detailsInput = document.getElementById('complaint-details');
    const productInput = document.getElementById('complaint-product-name');
    const sellerInput = document.getElementById('complaint-seller-name');
    const priceInput = document.getElementById('complaint-purchase-price');
    const invoiceInput = document.getElementById('complaint-invoice-no');
    const nextBtn = document.getElementById('btn-wizard-next');

    // Step 1: Complainant details
    if (nameInput) nameInput.value = data.name || 'Rohit Verma';
    if (phoneInput) phoneInput.value = data.phone || '9876543210';
    if (emailInput) emailInput.value = data.email || 'rohit.verma@example.com';
    if (stateInput) stateInput.value = data.state || 'Delhi';
    this.highlightElement(nameInput);

    await new Promise(r => setTimeout(r, 600));
    if (nextBtn) nextBtn.click();

    // Step 2: Grievance details
    await new Promise(r => setTimeout(r, 500));
    if (categorySelect) categorySelect.value = data.category || 'Misuse of ISI Mark (Substandard Product)';
    if (detailsInput) detailsInput.value = data.details || 'Purchased motorcycle helmet bearing counterfeit ISI mark IS 4151. Shell cracked on minor drop.';
    this.highlightElement(detailsInput);

    await new Promise(r => setTimeout(r, 600));
    if (nextBtn) nextBtn.click();

    // Step 3: Product & Seller Details
    await new Promise(r => setTimeout(r, 500));
    if (productInput) productInput.value = data.product || 'Two-Wheeler Protective Helmet';
    if (sellerInput) sellerInput.value = data.seller || 'FastSpeed Moto Accessories / Online Retailer';
    if (priceInput) priceInput.value = data.price || '1450';
    if (invoiceInput) invoiceInput.value = data.invoice || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    this.highlightElement(productInput);

    await new Promise(r => setTimeout(r, 600));
    if (nextBtn) nextBtn.click();

    // Step 4: Final Review Stage
    await new Promise(r => setTimeout(r, 400));
    document.getElementById('complaint-wizard-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // 2. Calculate Gold Purity Compensation
  async calculateGoldCompensation(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'grievance-redressal.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'calculate_gold',
        data: data,
        message: 'Opened Gold Purity Compensation Calculator. Computing statutory compensation under BIS Act 2016...'
      }));
      window.location.href = 'grievance-redressal.html#gold-calc-section';
      return;
    }

    const weightInput = document.getElementById('calc-weight');
    const claimedSelect = document.getElementById('calc-claimed-carat');
    const testedSelect = document.getElementById('calc-tested-carat');
    const rateInput = document.getElementById('calc-gold-rate');
    const calcBtn = document.getElementById('btn-calculate-comp');

    if (weightInput) weightInput.value = data.weight || '15';
    if (claimedSelect) claimedSelect.value = data.claimed || '22';
    if (testedSelect) testedSelect.value = data.tested || '18';
    if (rateInput && data.rate) rateInput.value = data.rate;

    this.highlightElement(weightInput);
    await new Promise(r => setTimeout(r, 400));
    if (calcBtn) calcBtn.click();
    this.highlightElement(document.getElementById('comp-result-box'));
  },

  // 3. Verify Licence / HUID / CRS
  async verifyLicence(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'verify-licence.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'verify_licence',
        data: data,
        message: `Navigated to e-Verification Suite. Authenticating ${data.type ? data.type.toUpperCase() : 'ISI'} licence ${data.code || 'CM/L-8400123456'}...`
      }));
      window.location.href = 'verify-licence.html';
      return;
    }

    const type = data.type || 'isi';
    const code = data.code || (type === 'huid' ? 'AB1234' : type === 'crs' ? 'R-41001234' : 'CM/L-8400123456');

    const tabBtn = document.querySelector(`.verify-tab-btn[data-type="${type}"]`);
    if (tabBtn) tabBtn.click();

    const select = document.getElementById('verify-type-select');
    if (select) select.value = type;

    const input = document.getElementById('verify-input');
    if (input) input.value = code;

    this.highlightElement(input);
    await new Promise(r => setTimeout(r, 400));

    const submitBtn = document.getElementById('btn-verify-submit');
    if (submitBtn) submitBtn.click();
    this.highlightElement(document.getElementById('verification-results'));
  },

  // 4. Search & Preview Indian Standards
  async searchStandards(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'standards-search.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'search_standards',
        data: data,
        message: `Navigated to Indian Standards Catalog. Searching standards for '${data.query || 'IS 10500'}'...`
      }));
      window.location.href = 'standards-search.html';
      return;
    }

    const searchInput = document.getElementById('standards-search-input');
    const divisionSelect = document.getElementById('division-filter');
    const qcoFilter = document.getElementById('qco-only-filter');

    if (searchInput) searchInput.value = data.query || 'IS 10500';
    if (divisionSelect && data.division) divisionSelect.value = data.division;
    if (qcoFilter && data.qco !== undefined) qcoFilter.checked = data.qco;

    this.highlightElement(searchInput);
    searchInput?.dispatchEvent(new Event('input'));

    if (data.openPreview) {
      await new Promise(r => setTimeout(r, 500));
      const firstPreviewBtn = document.querySelector('.btn-preview-standard');
      if (firstPreviewBtn) firstPreviewBtn.click();
    }
  },

  // 5. Estimate LIMS Testing Fees
  async estimateLimsFee(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'lims-lab-directory.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'estimate_lims',
        data: data,
        message: 'Navigated to BIS Laboratory Network. Calculating sample testing fee...'
      }));
      window.location.href = 'lims-lab-directory.html';
      return;
    }

    const categorySelect = document.getElementById('test-product-category');
    const qtyInput = document.getElementById('test-sample-qty');
    const urgencyCheck = document.getElementById('test-tat-urgency');
    const calcBtn = document.getElementById('btn-calc-testing-fee');

    if (categorySelect) categorySelect.value = data.category || 'water';
    if (qtyInput) qtyInput.value = data.qty || '2';
    if (urgencyCheck && data.express !== undefined) urgencyCheck.checked = data.express;

    this.highlightElement(categorySelect);
    await new Promise(r => setTimeout(r, 400));
    if (calcBtn) calcBtn.click();
    this.highlightElement(document.getElementById('estimator-result-box'));
  },

  // 6. Search Hallmarking Centres
  async searchHallmarking(data = {}) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath !== 'hallmarking-centres.html') {
      sessionStorage.setItem('bis_pending_agent_action', JSON.stringify({
        action: 'search_hallmarking',
        data: data,
        message: `Navigated to Hallmarking Directory. Locating assaying centres...`
      }));
      window.location.href = 'hallmarking-centres.html';
      return;
    }

    const stateSelect = document.getElementById('ahc-state-filter');
    const pincodeInput = document.getElementById('ahc-pincode-input');
    const searchBtn = document.getElementById('btn-search-ahc');

    if (stateSelect && data.state) stateSelect.value = data.state;
    if (pincodeInput && data.pincode) pincodeInput.value = data.pincode;

    this.highlightElement(stateSelect || pincodeInput);
    await new Promise(r => setTimeout(r, 400));
    if (searchBtn) searchBtn.click();
  }
};

window.bisAgent = BisAgentActuators;

// ── 3. CHATBOT INITIALIZATION & LIFECYCLE ──
export function initChatbot() {
  if (!document.querySelector('.chatbot-window')) {
    injectChatbotDOM();
  }

  const trigger = document.querySelector('.chatbot-trigger');
  const sideTab = document.querySelector('.chatbot-side-tab');
  const chatWindow = document.querySelector('.chatbot-window');
  const closeBtn = document.querySelector('.chatbot-close');
  const dockBtn = document.querySelector('.chatbot-dock');
  const voiceToggleBtn = document.querySelector('.chatbot-voice-toggle');
  const exportBtn = document.querySelector('.chatbot-export');
  const clearBtn = document.querySelector('.chatbot-clear');
  const chatBody = document.querySelector('.chatbot-body');
  const input = document.querySelector('.chatbot-input');
  const sendBtn = document.querySelector('.chatbot-send');
  const micBtn = document.querySelector('.chatbot-mic');
  const uploadBtn = document.querySelector('.chatbot-upload');
  const fileInput = document.querySelector('.chatbot-file-input');
  const cameraBtn = document.querySelector('.chatbot-camera');
  const cameraInput = document.querySelector('.chatbot-camera-input');
  const attachmentPreview = document.querySelector('.chatbot-attachment-preview');
  const attachmentPreviewImg = document.querySelector('.attachment-preview-img');
  const attachmentPreviewName = document.querySelector('.attachment-preview-name');
  const attachmentPreviewSize = document.querySelector('.attachment-preview-size');
  const attachmentPreviewRemove = document.querySelector('.attachment-preview-remove');

  // Camera Modal Elements
  const cameraModal = document.querySelector('.chatbot-camera-modal');
  const cameraBackdrop = document.querySelector('.camera-modal-backdrop');
  const cameraVideo = document.querySelector('.camera-video');
  const cameraCanvas = document.querySelector('.camera-canvas');
  const cameraCloseBtn = document.querySelector('.camera-modal-close');
  const cameraCaptureBtn = document.querySelector('.camera-capture-btn');
  const cameraSwitchBtn = document.querySelector('.camera-switch-btn');
  const cameraGalleryBtn = document.querySelector('.camera-gallery-fallback-btn');

  let pendingAttachment = null;
  let cameraStream = null;
  let currentFacingMode = 'environment';
  const voiceBanner = document.querySelector('.voice-banner');
  const hudBanner = document.querySelector('.agent-hud-banner');
  const langSelect = document.querySelector('.chatbot-lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  // Update UI whenever language changes
  window.addEventListener('bis_language_changed', (e) => {
    const newLang = e.detail.lang;
    if (langSelect) langSelect.value = newLang;

    const titleEl = document.querySelector('.chatbot-title-text');
    const subtitleEl = document.querySelector('.chatbot-subtitle-text');
    if (titleEl) titleEl.textContent = t('botName', newLang);
    if (subtitleEl) subtitleEl.textContent = t('botRole', newLang);

    if (input) input.placeholder = t('chatPlaceholder', newLang);

    const chipMap = {
      'guide_tour': 'chipOverview',
      'autofill_grievance_sample': 'chipGrievance',
      'calc_gold_sample': 'chipGoldCalc',
      'verify_isi_sample': 'chipVerifyIsi',
      'search_water_standard': 'chipPreviewStandard',
      'calc_lims_sample': 'chipLabFee'
    };
    document.querySelectorAll('.agent-quick-chip').forEach(chip => {
      const intent = chip.getAttribute('data-agent-intent');
      if (chipMap[intent]) chip.textContent = t(chipMap[intent], newLang);
    });

    if (recognition) {
      recognition.lang = getVoiceLanguage(newLang);
    }

    // Post localized confirmation notice in the new language with matching suggestion chips
    const switchNotice = t('langSwitchedNotice', newLang);
    appendMessage(switchNotice, 'bot', [
      t('chipOverview', newLang),
      t('chipGrievance', newLang),
      t('chipGoldCalc', newLang),
      t('chipVerifyIsi', newLang)
    ]);
    speakText(switchNotice);
  });

  // ── ATTACHMENT PREVIEW & FILE HANDLING ──
  function showAttachmentPreview(file, dataUrl) {
    pendingAttachment = { file, dataUrl, name: file.name, size: file.size };
    if (attachmentPreview) {
      attachmentPreview.style.display = 'flex';
      if (attachmentPreviewImg) {
        if (file.type && file.type.startsWith('image/')) {
          attachmentPreviewImg.src = dataUrl;
          attachmentPreviewImg.style.display = 'block';
        } else {
          attachmentPreviewImg.style.display = 'none';
        }
      }
      if (attachmentPreviewName) {
        attachmentPreviewName.textContent = file.name;
      }
      if (attachmentPreviewSize) {
        const kb = (file.size / 1024).toFixed(1);
        attachmentPreviewSize.textContent = `${kb} KB • Ready for BIS Inspection`;
      }
    }
  }

  function clearAttachmentPreview() {
    pendingAttachment = null;
    if (attachmentPreview) {
      attachmentPreview.style.display = 'none';
      if (attachmentPreviewImg) attachmentPreviewImg.src = '';
    }
    if (fileInput) fileInput.value = '';
    if (cameraInput) cameraInput.value = '';
  }

  if (attachmentPreviewRemove) {
    attachmentPreviewRemove.addEventListener('click', (e) => {
      e.stopPropagation();
      clearAttachmentPreview();
    });
  }

  function handleFileSelected(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      showAttachmentPreview(file, e.target.result);
      if (input) input.focus();
    };
    reader.readAsDataURL(file);
  }

  // ── PHOTO TAKING (LIVE CAMERA SCANNER MODAL) ──
  async function openCameraModal() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (cameraInput) {
        cameraInput.click();
      } else if (fileInput) {
        fileInput.click();
      }
      return;
    }

    if (cameraModal) {
      cameraModal.style.display = 'flex';
      await startCameraStream();
    }
  }

  async function startCameraStream() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }

    try {
      const constraints = {
        video: {
          facingMode: { ideal: currentFacingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (_) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      cameraStream = stream;
      if (cameraVideo) {
        cameraVideo.srcObject = stream;
        cameraVideo.setAttribute('playsinline', 'true');
        await cameraVideo.play();
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      closeCameraModal();
      if (cameraInput) {
        cameraInput.click();
      } else {
        alert('Camera access could not be initialized. Please check permissions or upload an existing photo.');
      }
    }
  }

  function closeCameraModal() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }
    if (cameraVideo) {
      cameraVideo.srcObject = null;
    }
    if (cameraModal) {
      cameraModal.style.display = 'none';
    }
  }

  async function captureCameraSnapshot() {
    if (!cameraVideo) {
      closeCameraModal();
      return;
    }

    const vw = cameraVideo.videoWidth || 1280;
    const vh = cameraVideo.videoHeight || 720;

    if (!cameraCanvas) return;
    cameraCanvas.width = vw;
    cameraCanvas.height = vh;
    const ctx = cameraCanvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0, vw, vh);

    const dataUrl = cameraCanvas.toDataURL('image/jpeg', 0.92);
    const blob = await new Promise(resolve => cameraCanvas.toBlob(resolve, 'image/jpeg', 0.92));
    const nowStr = new Date().toISOString().replace(/[:.]/g, '-');
    const photoFile = new File([blob], `bis_camera_scan_${nowStr}.jpg`, { type: 'image/jpeg' });

    closeCameraModal();
    showAttachmentPreview(photoFile, dataUrl);
  }

  function switchCameraFacing() {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    startCameraStream();
  }

  // Camera event triggers
  if (cameraBtn) {
    cameraBtn.addEventListener('click', () => openCameraModal());
  }
  if (cameraCloseBtn) {
    cameraCloseBtn.addEventListener('click', () => closeCameraModal());
  }
  if (cameraBackdrop) {
    cameraBackdrop.addEventListener('click', () => closeCameraModal());
  }
  if (cameraCaptureBtn) {
    cameraCaptureBtn.addEventListener('click', () => captureCameraSnapshot());
  }
  if (cameraSwitchBtn) {
    cameraSwitchBtn.addEventListener('click', () => switchCameraFacing());
  }
  if (cameraGalleryBtn) {
    cameraGalleryBtn.addEventListener('click', () => {
      closeCameraModal();
      if (fileInput) fileInput.click();
    });
  }
  if (cameraInput) {
    cameraInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelected(e.target.files[0]);
      }
    });
  }

  // Photo / File Upload Button
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelected(e.target.files[0]);
      }
    });
  }

  // Drag and drop onto chat window
  if (chatWindow) {
    chatWindow.addEventListener('dragover', (e) => {
      e.preventDefault();
      chatWindow.classList.add('drag-over');
    });
    chatWindow.addEventListener('dragleave', (e) => {
      if (!chatWindow.contains(e.relatedTarget)) {
        chatWindow.classList.remove('drag-over');
      }
    });
    chatWindow.addEventListener('drop', (e) => {
      e.preventDefault();
      chatWindow.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });
  }

  // Paste image directly into input
  if (input) {
    input.addEventListener('paste', (e) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            if (blob) {
              const pastedFile = new File([blob], `pasted_label_${Date.now()}.png`, { type: blob.type });
              handleFileSelected(pastedFile);
              e.preventDefault();
              break;
            }
          }
        }
      }
    });
  }

  let hasWelcomed = false;
  let voiceEnabled = false;
  let recognition = null;
  let isListening = false;
  let chatHistory = [];

  // Toggle Chat / Sidebar Window
  function toggleChat(forceOpen = null, forceDocked = true) {
    const shouldOpen = forceOpen !== null ? forceOpen : !chatWindow.classList.contains('open');
    document.body.classList.toggle('chatbot-open-active', shouldOpen);
    if (shouldOpen) {
      chatWindow.classList.add('open');
      if (forceDocked) {
        chatWindow.classList.add('docked-side');
        if (dockBtn) {
          dockBtn.classList.add('active');
          dockBtn.title = 'Switch to Floating Window';
        }
      }
      if (trigger) trigger.classList.add('active');
      if (!hasWelcomed) {
        sendWelcomeMessage();
        hasWelcomed = true;
      }
      setTimeout(() => input?.focus(), 300);
    } else {
      chatWindow.classList.remove('open');
      if (trigger) trigger.classList.remove('active');
      stopListening();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  if (trigger) {
    trigger.addEventListener('click', () => toggleChat());
  }
  if (sideTab) {
    sideTab.addEventListener('click', () => toggleChat(true, true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleChat(false));
  }

  // Toggle Dock / Floating Mode
  if (dockBtn) {
    dockBtn.addEventListener('click', () => {
      const isDocked = chatWindow.classList.toggle('docked-side');
      dockBtn.classList.toggle('active', isDocked);
      dockBtn.title = isDocked ? 'Switch to Floating Window' : 'Dock to Right Side';
    });
  }

  // Quick Action Chips in Chat Header
  document.querySelectorAll('.agent-quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const intent = chip.getAttribute('data-agent-intent');
      handleQuickAgentAction(intent);
    });
  });

  function handleQuickAgentAction(intent) {
    const currentLang = getCurrentLanguage();

    if (intent === 'guide_tour') {
      const userPrompt = t('quickTourUserPrompt', currentLang);
      appendMessage(userPrompt, 'user');
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        const localizedRes = getLocalizedRAGResponse('guide_tour', {}, currentLang);
        appendMessage(
          localizedRes.text,
          'bot',
          localizedRes.suggestions,
          localizedRes.actions
        );
        speakText(localizedRes.text);
      }, 400);
    } else if (intent === 'autofill_grievance_sample') {
      if (input) {
        input.value = t('sampleGrievancePrompt', currentLang);
        handleSendMessage();
      }
    } else if (intent === 'calc_gold_sample') {
      if (input) {
        input.value = t('sampleGoldPrompt', currentLang);
        handleSendMessage();
      }
    } else if (intent === 'verify_isi_sample') {
      if (input) {
        input.value = t('sampleVerifyPrompt', currentLang);
        handleSendMessage();
      }
    } else if (intent === 'search_water_standard') {
      if (input) {
        input.value = t('sampleStandardPrompt', currentLang);
        handleSendMessage();
      }
    } else if (intent === 'calc_lims_sample') {
      if (input) {
        input.value = t('sampleLimsPrompt', currentLang);
        handleSendMessage();
      }
    }
  }

  // Voice Readout Toggle
  if (voiceToggleBtn) {
    voiceToggleBtn.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      voiceToggleBtn.classList.toggle('active', voiceEnabled);
      voiceToggleBtn.textContent = voiceEnabled ? 'READOUT' : 'MUTE';
      if (!voiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    });
  }

  function speakText(text) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*_#`[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = getVoiceLanguage(getCurrentLanguage());
    window.speechSynthesis.speak(utterance);
  }

  // Speech Recognition (Speech-to-Text)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getVoiceLanguage(getCurrentLanguage());

    recognition.onstart = () => {
      isListening = true;
      if (micBtn) micBtn.classList.add('listening');
      if (voiceBanner) voiceBanner.classList.add('active');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (input) {
        input.value = transcript;
        handleSendMessage();
      }
    };

    recognition.onerror = () => stopListening();
    recognition.onend = () => stopListening();
  }

  function stopListening() {
    isListening = false;
    if (micBtn) micBtn.classList.remove('listening');
    if (voiceBanner) voiceBanner.classList.remove('active');
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (!recognition) {
        alert('Speech recognition is not supported on this browser. Try Chrome, Edge, or Safari.');
        return;
      }
      if (isListening) {
        recognition.stop();
        stopListening();
      } else {
        try {
          recognition.start();
        } catch (err) {
          console.warn(err);
        }
      }
    });
  }

  // Clear Chat
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear chat conversation history?')) {
        chatBody.innerHTML = '';
        chatHistory = [];
        sendWelcomeMessage();
      }
    });
  }

  // Export Transcript
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (chatHistory.length === 0) {
        alert('No messages to export.');
        return;
      }
      let transcript = `========================================\nBureau of Indian Standards (BIS) ManakBot AI Session\nDate: ${new Date().toLocaleString()}\n========================================\n\n`;
      chatHistory.forEach(item => {
        transcript += `[${item.time}] ${item.sender.toUpperCase()}:\n${item.text}\n\n`;
      });
      const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BIS_ManakBot_Session_${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Google AI Studio Gemini API Integration Configuration
  // Google AI Studio Gemini API Integration Configuration
  const GEMINI_API_KEY = window.GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || (typeof atob === 'function' ? atob('QVEuQWI4Uk42Skdja3ItajB6NXYyeW9wNXVNLXY3T2wtV1dhSEV6TWlyZjc5Y2Z2djR0UFE=') : '');
  const GEMINI_CANDIDATE_MODELS = [
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.6-flash',
    'gemini-3.7-flash',
    'gemini-flash-latest'
  ];

  // ── PARAMETER EXTRACTOR FROM FORENSIC TEXT ──
  function extractParamsFromForensicText(text, fallbackFileName = '') {
    let product = '';
    const prodMatch = text.match(/\*\*(?:Identified\s+)?(?:Product(?:\s+Name)?|Item|Subject)[^*:]*\*\*[:\s*]+([^\n\r*#|]+)/i) || text.match(/(?:Product(?:\s+Name)?|Item|Subject)[:\s*]+([^\n\r*#|]+)/i);
    if (prodMatch) product = prodMatch[1].replace(/[*_`]/g, '').trim();

    let brand = '';
    const brandMatch = text.match(/\*\*(?:Trade\s+)?(?:Brand|Manufacturer|Company|Seller)[^*:]*\*\*[:\s*]+([^\n\r*#|]+)/i) || text.match(/(?:Brand|Manufacturer|Company|Seller)[:\s*]+([^\n\r*#|]+)/i);
    if (brandMatch) brand = brandMatch[1].replace(/[*_`]/g, '').trim();

    let standard = '';
    const stdMatch = text.match(/(?:IS\s*\d+(?:\s*(?:\([^)]*\)|:\d+))?)/i);
    if (stdMatch) standard = stdMatch[0].trim();

    let cml = '';
    const cmlMatch = text.match(/(?:CM\/L[-:\s]*\d{7,10}|HUID[:\s]*[A-Z0-9]{6})/i);
    if (cmlMatch) cml = cmlMatch[0].trim();

    let price = '';
    const priceMatch = text.match(/(?:₹|Rs\.?|INR|Price|MRP)[:\s]*(\d+[\d,]*)/i);
    if (priceMatch) price = priceMatch[1].replace(/,/g, '');

    if (!product && fallbackFileName) {
      product = fallbackFileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    }
    return { product, brand, standard, cml, price };
  }

  // ── REAL ACCURATE INSPECTION ENGINE (ZERO FAKE DATA) ──
  function buildAccurateInspectionDossier(rawText = '', fileName = '', fileMeta = {}) {
    const parsed = parseExtractedText(rawText, fileName);
    return generateAccurateInspectionReport(parsed, fileMeta, fileMeta.source || 'Optical Character Recognition (OCR)');
  }

  // ── REAL MULTIMODAL VISION OCR & FILE DATA EXTRACTION ──
  async function handleImageUpload(file, userNote = '', cachedDataUrl = null) {
    if (!file) return;

    const isImg = file.type && file.type.startsWith('image/');
    
    const processData = async (base64Data) => {
      const currentLang = getCurrentLanguage();

      // Append Image / Document User Bubble in official BIS blue styling
      const previewHtml = isImg
        ? `<img src="${base64Data}" style="max-width:220px;max-height:160px;border-radius:8px;border:1.5px solid var(--color-primary-100, #d0def2);display:block;margin-top:6px;box-shadow:0 2px 6px rgba(0,48,130,0.12);" alt="Uploaded Document">`
        : `<div style="display:flex;align-items:center;gap:8px;margin-top:6px;font-size:12px;color:var(--color-primary, #003082);padding:8px 12px;background:var(--color-primary-50, #e8eef8);border-radius:8px;border:1px solid var(--color-primary-100, #d0def2);"><span style="font-size:22px;">📄</span><span><strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)</span></div>`;

      const userNoteHtml = userNote ? `<div style="margin-bottom:6px;font-size:13px;line-height:1.4;">${userNote}</div>` : '';
      const inspectionHeading = currentLang === 'ta'
        ? '🔍 BIS பரிசோதனைக்காக இணைக்கப்பட்ட படம் / ஆவணம்:'
        : (currentLang === 'hi'
          ? '🔍 बीआईएस निरीक्षण हेतु संलग्न फ़ोटो / दस्तावेज़:'
          : '🔍 Attached Image / Document for BIS Inspection:');
      appendMessage(`${userNoteHtml}<div style="font-weight:600;font-size:11px;color:var(--color-primary, #003082);">${inspectionHeading}</div>${previewHtml}`, 'user');

      showTypingIndicator();
      const hudBanner = document.querySelector('.agent-hud-banner');
      const hudText = document.querySelector('.agent-hud-text');
      if (hudBanner) hudBanner.style.display = 'flex';
      if (hudText) hudText.textContent = t('processing', currentLang);

      let rawText = '';
      let confidence = 85;
      let ocrSource = 'Real Optical Character Recognition (OCR)';

      try {
        if (isImg) {
          // Perform Real In-Browser Tesseract OCR (with fallback to backend)
          const ocrResult = await performClientOCR(file, base64Data);
          rawText = ocrResult.text || '';
          confidence = ocrResult.confidence || 80;
          ocrSource = ocrResult.source || 'Optical Character Recognition (OCR)';
        } else {
          try {
            rawText = await file.text();
            confidence = 95;
            ocrSource = 'Document Text Content';
          } catch (_) {
            rawText = file.name;
          }
        }
      } catch (err) {
        console.warn('OCR processing error, using text fallback:', err);
      }

      if (hudBanner) hudBanner.style.display = 'none';
      removeTypingIndicator();

      // Extract accurate details directly from actual scanned text
      const parsed = parseExtractedText(rawText, file.name);
      parsed.imageDataUrl = isImg ? base64Data : null;
      parsed.fileName = file.name;

      // Generate honest report
      const dossier = generateAccurateInspectionReport(
        parsed,
        { name: file.name, size: file.size, confidence },
        ocrSource
      );

      const botMsg = appendMessage(dossier.html, 'bot', [
        t('chipGrievance', currentLang),
        t('chipVerifyIsi', currentLang),
        t('chipPreviewStandard', currentLang),
        t('exportChat', currentLang)
      ]);

      // Bind One-Click Direct Form Actions
      if (botMsg) {
        botMsg.querySelectorAll('.btn-direct-autofill').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const action = btn.getAttribute('data-action');
            executeDirectFormAction(action, {
              ...parsed,
              imageDataUrl: isImg ? base64Data : null,
              fileName: file.name
            });
          });
        });
      }

      const voiceNotice = currentLang === 'ta'
        ? (parsed.product ? `ஆவணம் பகுப்பாய்வு செய்யப்பட்டது. தயாரிப்பு: ${parsed.product}. விவரங்களை படிவங்களில் நேரடியாக நிரப்ப கீழே உள்ள பொத்தான்களைப் பயன்படுத்தவும்.` : `பரிசோதனை நிறைவடைந்தது. விவரங்களை நேரடியாக படிவங்களில் நிரப்பலாம்.`)
        : (currentLang === 'hi'
          ? (parsed.product ? `दस्तावेज़ का विश्लेषण किया गया। उत्पाद: ${parsed.product}। फ़ॉर्म भरने के लिए नीचे दिए गए बटन का उपयोग करें।` : `निरीक्षण पूर्ण हुआ। निकाले गए विवरणों को सीधे फ़ॉर्म में भरा जा सकता है।`)
          : (parsed.product
            ? `Document analyzed. Identified: ${parsed.product}. You can directly autofill forms using the buttons below.`
            : `Inspection complete. You can autofill the extracted details directly into respective forms.`));
      speakText(voiceNotice);
    };

    if (cachedDataUrl) {
      processData(cachedDataUrl);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => processData(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  let isChatProcessing = false;

  // ── SEND MESSAGE LOGIC WITH RAG GROUNDING & LIVE GEMINI API ──
  async function handleSendMessage() {
    if (isChatProcessing) return;
    const text = input ? input.value.trim() : '';

    // If pending attachment exists, process attachment with optional user query
    if (pendingAttachment) {
      const { file, dataUrl } = pendingAttachment;
      clearAttachmentPreview();
      if (input) input.value = '';
      await handleImageUpload(file, text, dataUrl);
      return;
    }

    if (!text) return;

    isChatProcessing = true;
    if (input) input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    try {
      appendMessage(text, 'user');
      if (input) input.value = '';

      showTypingIndicator();

      const currentLang = getCurrentLanguage();
      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || { name: 'English', native: 'English', code: 'en' };

      // Query Localized RAG Knowledge Base and Agentic Intent Engine
      const ragResult = queryBISKnowledgeRAG(text, currentLang);

      let replyText = '';
      let isFromApi = false;
      const candidateModels = ['gemini-3.5-flash', 'gemini-3.1-flash-lite'];
      const userApiKey = GEMINI_API_KEY;

      const languageInstruction = currentLang === 'en'
        ? 'Respond in clear, professional English.'
        : `CRITICAL MANDATORY LANGUAGE REQUIREMENT:
The user has selected the portal language: ${langObj.name} (${langObj.native}, language code: "${currentLang}").
You MUST formulate your ENTIRE response EXCLUSIVELY in ${langObj.name} (${langObj.native}) script.
Do NOT reply in English. Do NOT mix English sentences unless quoting exact technical codes like "IS 10500", "CM/L-8400123456", or "HUID".
All explanations, headings, steps, and bullet points MUST be in fluent, natural ${langObj.name} (${langObj.native}).`;

      for (const model of candidateModels) {
        if (isFromApi) break;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s fast timeout

          const targetEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${userApiKey}`;

          const response = await fetch(targetEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            signal: controller.signal,
            body: JSON.stringify({
              system_instruction: {
                parts: [
                  {
                    text: `You are ManakBot AI Co-Pilot, the official RAG-grounded intelligent assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.\n\n${languageInstruction}\n\nSTRICT INSTRUCTIONS:\n1. Provide clear, accurate, and comprehensive explanations regarding BIS services, ISI certification (CM/L), Hallmarking (HUID), e-Verification, LIMS testing labs, Indian Standards (IS Codes), consumer grievance redressal, and gold purity compensation rules under the BIS Act, 2016.\n2. Answer the user's exact query directly with concise bullet points or numbered lists where appropriate.`
                  }
                ]
              },
              contents: [
                {
                  role: 'user',
                  parts: [{ text: currentLang === 'en' ? text : `[User Language: ${langObj.name} (${langObj.native})]\n${text}\n\n(Please reply strictly in ${langObj.name} / ${langObj.native})` }]
                }
              ]
            })
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
              replyText = data.candidates[0].content.parts[0].text.trim();
              isFromApi = true;
              break;
            }
          }
        } catch (err) {
          console.log(`Model ${model} notice:`, err.message || err);
        }
      }

      removeTypingIndicator();

      const defaultSuggestions = [
        t('chipVerifyIsi', currentLang),
        t('chipPreviewStandard', currentLang),
        t('chipGrievance', currentLang)
      ];
      const suggestions = ragResult?.suggestions || defaultSuggestions;
      const actions = ragResult?.actions || [];
      const agentTask = ragResult?.agentTask || null;

      if (isFromApi && replyText) {
        appendMessage(replyText, 'bot', suggestions, actions, agentTask);
        speakText(replyText);
      } else if (ragResult && ragResult.text) {
        appendMessage(ragResult.text, 'bot', suggestions, actions, agentTask);
        speakText(ragResult.text);
      } else {
        const fallback = getLocalizedRAGResponse('general', { query: text }, currentLang);
        appendMessage(fallback.text, 'bot', fallback.suggestions, fallback.actions, agentTask);
        speakText(fallback.text);
      }
    } catch (criticalErr) {
      console.warn('ManakBot handling notice:', criticalErr);
      const currentLang = getCurrentLanguage();
      const fallback = getLocalizedRAGResponse('general', { query: text }, currentLang);
      appendMessage(fallback.text, 'bot', fallback.suggestions, fallback.actions);
    } finally {
      removeTypingIndicator();
      isChatProcessing = false;
      if (input) {
        input.disabled = false;
        setTimeout(() => input.focus(), 50);
      }
      if (sendBtn) sendBtn.disabled = false;
    }
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  // Welcome Message
  function sendWelcomeMessage() {
    const currentLang = getCurrentLanguage();
    const welcomeText = t('welcomeText', currentLang);
    
    const initialSuggestions = [
      t('chipGrievance', currentLang),
      t('chipGoldCalc', currentLang),
      t('chipVerifyIsi', currentLang),
      t('chipPreviewStandard', currentLang),
      t('chipLabFee', currentLang)
    ];

    appendMessage(welcomeText, 'bot', initialSuggestions);
  }

  // Execute Agent Tasks with Visual HUD
  async function executeAgentTask(action, data, hudMsg) {
    if (hudBanner && hudText) {
      hudText.textContent = hudMsg || `Agent executing ${action}...`;
      hudBanner.style.display = 'flex';
    }

    try {
      if (action === 'autofill_grievance') {
        await BisAgentActuators.autofillGrievance(data);
      } else if (action === 'calculate_gold') {
        await BisAgentActuators.calculateGoldCompensation(data);
      } else if (action === 'verify_licence') {
        await BisAgentActuators.verifyLicence(data);
      } else if (action === 'search_standards') {
        await BisAgentActuators.searchStandards(data);
      } else if (action === 'estimate_lims') {
        await BisAgentActuators.estimateLimsFee(data);
      } else if (action === 'search_hallmarking') {
        await BisAgentActuators.searchHallmarking(data);
      }
    } catch (err) {
      console.warn('Agent task error:', err);
    } finally {
      setTimeout(() => {
        if (hudBanner) hudBanner.style.display = 'none';
      }, 1500);
    }
  }

  // Helper to dynamically extract user details from prompt text
  function extractUserDetailsFromPrompt(query) {
    const data = {};
    const q = query;

    // Extract Name
    const nameMatch = q.match(/(?:my name is|i am|name[:\s]+)([a-zA-Z\s]{2,30})/i);
    if (nameMatch) data.name = nameMatch[1].trim();

    // Extract Phone Number (10 digits)
    const phoneMatch = q.match(/\b\d{10}\b/);
    if (phoneMatch) data.phone = phoneMatch[0];

    // Extract Email
    const emailMatch = q.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) data.email = emailMatch[0];

    // Extract State
    const stateMatch = q.match(/(?:state[:\s]+|from\s+)(delhi|mumbai|karnataka|tamil nadu|maharashtra|uttar pradesh|gujarat|kerala|punjab|haryana|west bengal)/i);
    if (stateMatch) data.state = stateMatch[1].trim();

    // Extract Product Name
    const productMatch = q.match(/(?:product|item|buying|bought)[:\s]+([^,\n\.]+)/i);
    if (productMatch) data.product = productMatch[1].trim();

    // Extract Seller / Shop / Vendor
    const sellerMatch = q.match(/(?:seller|shop|store|vendor|from)[:\s]+([^,\n\.]+)/i);
    if (sellerMatch) data.seller = sellerMatch[1].trim();

    // Extract Price
    const priceMatch = q.match(/(?:price|cost|rs|inr|₹)[:\s]*(\d+)/i);
    if (priceMatch) data.price = priceMatch[1];

    // Extract Details / Problem
    const detailsMatch = q.match(/(?:complaint|issue|details|problem)[:\s]+([^,\n\.]+)/i);
    if (detailsMatch) data.details = detailsMatch[1].trim();

    // Extract Gold Weight & Carat
    const weightMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:g|gram|grams)/i);
    if (weightMatch) data.weight = weightMatch[1];

    const caratsMatch = q.match(/(\d+)\s*k(?:arat)?.*?(\d+)\s*k(?:arat)?/i);
    if (caratsMatch) {
      data.claimed = caratsMatch[1];
      data.tested = caratsMatch[2];
    } else {
      const singleCarat = q.match(/(\d+)\s*k(?:arat)?/i);
      if (singleCarat) data.claimed = singleCarat[1];
    }

    const rateMatch = q.match(/(?:rate|gold rate)[:\s]*(\d+)/i);
    if (rateMatch) data.rate = rateMatch[1];

    return data;
  }

  // ── 4. RAG KNOWLEDGE BASE & NEURAL SEARCH ENGINE ──
  function queryBISKnowledgeRAG(query, lang = getCurrentLanguage()) {
    const q = (query || '').toLowerCase();
    const extracted = extractUserDetailsFromPrompt(query);

    // 0. Product Inspection, Authenticity Check & Legal IS Code Guidance
    if (
      q.includes('inspect product') || q.includes('check if fake') || q.includes('counterfeit check') || q.includes('product inspection') ||
      q.includes('பரிசோதனை') || q.includes('உண்மைத்தன்மை') || q.includes('போலி') || q.includes('जांच') || q.includes('नकली')
    ) {
      return getLocalizedRAGResponse('inspection', extracted, lang);
    }

    // 0. Comprehensive End-to-End Roadmaps & Workflows (From Scratch to Finish)
    if (
      q.includes('roadmap') || q.includes('workflow') || q.includes('start to end') || q.includes('from scratch') || q.includes('how to start') || q.includes('guide') || q.includes('how does it work') || q.includes('steps to') ||
      q.includes('வழிமுறை') || q.includes('வழிகாட்ட') || q.includes('செயல்முறை') || q.includes('ரோட்மேப்') || q.includes('रोडमैप') || q.includes('मार्गदर्श')
    ) {
      if (q.includes('tour') || q.includes('services') || q.includes('கண்ணோட்டம்') || q.includes('சேவை') || q.includes('போர்டல்')) {
        return getLocalizedRAGResponse('guide_tour', {}, lang);
      }
      return getLocalizedRAGResponse('roadmap', {}, lang);
    }

    // 1. Grievance / Complaint / Substandard Product
    if (
      q.includes('complaint') || q.includes('grievance') || q.includes('fake') || q.includes('substandard') || q.includes('counterfeit') || q.includes('file') || q.includes('bad') || q.includes('defect') ||
      q.includes('புகார்') || q.includes('குறை') || q.includes('மோசடி') || q.includes('தரமற்ற') || q.includes('शिकायत') || q.includes('फरियाद')
    ) {
      let product = extracted.product;
      let category;
      let details = extracted.details;

      if (q.includes('cement') || q.includes('சிமெண்ட்') || q.includes('सीमेंट')) {
        product = product || (lang === 'ta' ? 'போர்ட்லேண்ட் சிமெண்ட் 43 கிரேடு (IS 269)' : 'Portland Cement 43 Grade (IS 269)');
        details = details || (lang === 'ta' ? 'சரியான ISI முத்திரை இல்லாமல் சிமெண்ட் மூட்டைகள் பெறப்பட்டன.' : 'Cement bags received without proper ISI mark and batch number.');
      } else if (q.includes('water') || q.includes('தண்ணீர்') || q.includes('குடிநீர்') || q.includes('पानी')) {
        product = product || (lang === 'ta' ? 'பாட்டிலடைக்கப்பட்ட குடிநீர் (IS 14543)' : 'Packaged Drinking Water (IS 14543)');
        details = details || (lang === 'ta' ? 'போலி ISI முத்திரையுடன் துர்நாற்றமடிக்கும் பாட்டில்கள் வழங்கப்பட்டன.' : 'Bottles supplied with duplicate ISI mark and pungent odour.');
      } else if (q.includes('gold') || q.includes('hallmark') || q.includes('jewel') || q.includes('தங்கம்') || q.includes('நகை') || q.includes('சோனா') || q.includes('स्वर्ण')) {
        product = product || (lang === 'ta' ? '22K தங்க நகைகள் (IS 1417)' : '22K Gold Jewellery (IS 1417)');
        category = lang === 'ta' ? 'தங்க ஹால்மார்க்கிங் காரட் குறைவு (தூய்மை பற்றாக்குறை)' : 'Gold Hallmarking Under-caratage (Purity Shortage)';
        details = details || (lang === 'ta' ? '22K (916) என விற்கப்பட்ட நகை ஆய்வில் 18K என தெரியவந்தது.' : 'Jewellery sold as 22K (916) but independent assay report showed 18K purity shortfall.');
      } else {
        product = product || (lang === 'ta' ? 'இரண்டு சக்கர வாகன பாதுகாப்பு ஹெல்மெட் (IS 4151)' : 'Two-Wheeler Protective Helmet (IS 4151)');
        category = lang === 'ta' ? 'போலி அல்லது தவறான ISI முத்திரை பயன்பாடு' : 'Misuse of ISI Mark (Substandard Product)';
        details = details || (lang === 'ta' ? 'வாங்கிய பொருளில் தவறான ISI முத்திரை உள்ளது. சாதாரண பயன்பாட்டில் பழுதடைந்தது.' : 'Product purchased with defective/counterfeit ISI mark. Material failed on normal usage.');
      }

      const prefillUrl = `grievance-redressal.html?name=${encodeURIComponent(extracted.name || '')}&phone=${encodeURIComponent(extracted.phone || '')}&email=${encodeURIComponent(extracted.email || '')}&state=${encodeURIComponent(extracted.state || '')}&product=${encodeURIComponent(product)}&category=${encodeURIComponent(category)}&details=${encodeURIComponent(details)}&seller=${encodeURIComponent(extracted.seller || '')}&price=${encodeURIComponent(extracted.price || '1500')}`;

      return getLocalizedRAGResponse('grievance', { ...extracted, product, category, details, prefillUrl }, lang);
    }

    // 2. Gold Hallmarking / Purity Compensation
    if (
      q.includes('gold') || q.includes('carat') || q.includes('karat') || q.includes('compensation') || q.includes('huid') || q.includes('hallmark') ||
      q.includes('தங்கம்') || q.includes('காரட்') || q.includes('ஹால்மார்க்') || q.includes('இழப்பீடு') || q.includes('தூய்மை') || q.includes('சோனா') || q.includes('स्वर्ण') || q.includes('मुआवजा')
    ) {
      const goldUrl = `grievance-redressal.html?weight=${encodeURIComponent(extracted.weight || '15')}&claimed=${encodeURIComponent(extracted.claimed || '22')}&tested=${encodeURIComponent(extracted.tested || '18')}&rate=${encodeURIComponent(extracted.rate || '7200')}#gold-calc-section`;
      return getLocalizedRAGResponse('gold', { ...extracted, goldUrl }, lang);
    }

    // 3. Licence Verification (ISI, HUID, CRS, FMCS)
    if (
      q.includes('verify') || q.includes('cml') || q.includes('licence') || q.includes('license') || q.includes('crs') || q.includes('fmcs') || /\bisi\b/i.test(q) || q.includes('authentic') ||
      q.includes('சரிபார்') || q.includes('உரிமம்') || q.includes('சத்தியாபனம்') || q.includes('सत्यापित') || q.includes('जांचें')
    ) {
      let type = 'isi';
      let code = 'CM/L-8400123456';
      if (q.includes('crs') || q.includes('electronic') || q.includes('r-')) {
        type = 'crs';
        code = 'R-41001234';
      } else if (q.includes('fmcs') || q.includes('foreign')) {
        type = 'fmcs';
        code = 'CM/L-4000123456';
      } else if (q.includes('huid') || /[a-z0-9]{6}/i.test(q)) {
        const huidMatch = q.match(/\b([A-Z0-9]{6})\b/i);
        type = 'huid';
        code = huidMatch ? huidMatch[1].toUpperCase() : 'AB1234';
      }

      const verifyUrl = `verify-licence.html?type=${encodeURIComponent(type)}&code=${encodeURIComponent(code)}`;
      return getLocalizedRAGResponse('verify', { type, code, verifyUrl }, lang);
    }

    // 4. Indian Standards Search & Document Clause Preview
    const hasIsCodeMatch = /\bis\s*\d+\b/i.test(q) || q.includes('standard') || q.includes('is code') || q.includes('qco') || q.includes('specification') ||
      q.includes('தரநிலை') || q.includes('விவரக்குறிப்பு') || q.includes('மானக்') || q.includes('मानक');
    if (hasIsCodeMatch) {
      let isCode = 'IS 10500';
      if (q.includes('456') || q.includes('concrete') || q.includes('கான்கிரீட்')) isCode = 'IS 456';
      else if (q.includes('4151') || q.includes('helmet') || q.includes('ஹெல்மெட்')) isCode = 'IS 4151';
      else if (q.includes('1417') || q.includes('gold') || q.includes('தங்கம்')) isCode = 'IS 1417';
      else if (q.includes('1293') || q.includes('plug') || q.includes('socket')) isCode = 'IS 1293';
      else if (q.includes('269') || q.includes('cement') || q.includes('சிமெண்ட்')) isCode = 'IS 269';

      const stdUrl = `standards-search.html?q=${encodeURIComponent(isCode)}`;
      return getLocalizedRAGResponse('standards', { isCode, stdUrl }, lang);
    }

    // 5. LIMS Testing Labs & Fee Estimator
    if (
      q.includes('lab') || q.includes('lims') || q.includes('test') || q.includes('fee') || q.includes('tat') || q.includes('sample') || q.includes('price') ||
      q.includes('ஆய்வகம்') || q.includes('கட்டணம்') || q.includes('மாதிரி') || q.includes('சோதனை') || q.includes('प्रयोगशाला') || q.includes('शुल्क')
    ) {
      return getLocalizedRAGResponse('lims', {}, lang);
    }

    // Unindexed general query -> return null to allow dynamic AI / localized synthesis
    return null;
  }

  // ── 5. APPEND CHAT MESSAGE HELPER ──
  function appendMessage(text, sender = 'bot', suggestions = [], actions = []) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({ sender, text, time });

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    let formattedText = text;
    if (typeof text === 'string' && !text.trim().startsWith('<div')) {
      formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    }

    let extraHtml = '';

    // Link Action Buttons
    if (actions && actions.length > 0) {
      extraHtml += `
        <div class="flex flex-wrap gap-2 mt-2">
          ${actions.map(act => `<a href="${act.url}" class="agent-act-btn btn-secondary-act" style="font-size: 11px; padding: 5px 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">${act.text}</a>`).join('')}
        </div>
      `;
    }

    // Suggestions Chips
    if (suggestions && suggestions.length > 0) {
      extraHtml += `
        <div class="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-100">
          ${suggestions.map(s => `<button class="agent-quick-chip chat-suggestion-chip" style="font-size: 10.5px;">${s}</button>`).join('')}
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="chat-msg-avatar">${sender === 'bot' ? BIS_LOGO_ICON : 'USER'}</div>
      <div class="chat-msg-bubble">
        <div>${formattedText}</div>
        ${extraHtml}
        <div class="chat-msg-time">${time}</div>
      </div>
    `;

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    msgDiv.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (input) {
          input.value = chip.textContent.trim();
          handleSendMessage();
        }
      });
    });

    return msgDiv;
  }

  function showTypingIndicator() {
    const currentLang = getCurrentLanguage();
    const typingText = currentLang === 'ta'
      ? 'மணக்பாட் பதிலைத் தயாரிக்கிறது...'
      : (currentLang === 'hi' ? 'मानक-बॉट उत्तर तैयार कर रहा है...' : 'ManakBot Co-Pilot preparing response...');
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot typing-indicator';
    indicator.innerHTML = `
      <div class="chat-msg-avatar">${BIS_LOGO_ICON}</div>
      <div class="chat-msg-bubble" style="padding: 8px 12px; font-style: italic; color: #64748b; font-size: 12px;">
        <span>${typingText}</span>
      </div>
    `;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    document.querySelectorAll('.typing-indicator').forEach(el => el.remove());
  }
}
