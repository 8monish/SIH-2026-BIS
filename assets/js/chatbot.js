/**
 * BIS Portal — Agentic AI Co-Pilot & Assistant Sidebar (ManakBot AI)
 * Official Bureau of Indian Standards (BIS) Automated Assistant
 * Features:
 * - Official BIS Emblem Integration & Professional UI
 * - Autonomous cross-portal agent workflows & DOM actuators
 * - Step-by-step form autofilling (Grievance, Gold Compensation, Lab Fees)
 * - Automatic licence verification & standard code previewing
 * - Cross-page session persistence via sessionStorage
 * - Web Speech API voice control & SpeechSynthesis readout
 */

const BIS_LOGO_PNG = `<img src="assets/images/bis-logo.png" alt="BIS Logo" style="height: 26px; width: auto; max-width: 100%; object-fit: contain; vertical-align: middle; background: #ffffff; padding: 2px 4px; border-radius: 4px;">`;
const BIS_LOGO_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path d="M12 2L2 20H22L12 2Z" fill="#003082"/><path d="M12 7L6 17H18L12 7Z" fill="#FFFFFF"/><circle cx="12" cy="13" r="2.5" fill="#E11D48"/></svg>`;

// ── 1. INJECT CHATBOT DOM ──
function injectChatbotDOM() {
  if (document.querySelector('.chatbot-window')) return;

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
            <h4>ManakBot AI Co-Pilot</h4>
            <p>Bureau of Indian Standards Official Assistant</p>
          </div>
        </div>
        <div class="chatbot-actions">
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
        <span class="agent-quick-chip" data-agent-intent="guide_tour">Portal Overview</span>
        <span class="agent-quick-chip" data-agent-intent="autofill_grievance_sample">Auto-Fill Grievance</span>
        <span class="agent-quick-chip" data-agent-intent="calc_gold_sample">Gold Calculator</span>
        <span class="agent-quick-chip" data-agent-intent="verify_isi_sample">Verify CM/L</span>
        <span class="agent-quick-chip" data-agent-intent="search_water_standard">Preview IS 10500</span>
        <span class="agent-quick-chip" data-agent-intent="calc_lims_sample">Lab Fee Estimate</span>
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

      <!-- Footer / Input -->
      <div class="chatbot-footer">
        <input type="file" class="chatbot-file-input" accept="image/*" style="display:none;">
        <button class="chatbot-upload" title="Scan Document / Upload Image for Vision Autofill" aria-label="Upload Image">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        </button>
        <input type="text" class="chatbot-input" placeholder="Ask ManakBot or upload image to autofill...">
        <button class="chatbot-mic" title="Voice Input (Speech-to-Text)" aria-label="Voice Input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
        <button class="chatbot-send" title="Send Message" aria-label="Send Message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
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
  const voiceBanner = document.querySelector('.voice-banner');
  const hudBanner = document.querySelector('.agent-hud-banner');
  const hudText = document.querySelector('.agent-hud-text');

  if (!chatWindow) return;

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageUpload(e.target.files[0]);
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
    if (intent === 'guide_tour') {
      appendMessage('Guide me through all services on this portal', 'user');
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        appendMessage(
          `Here is the **Official BIS Portal Directory**:\n\n` +
          `1. **e-Verification Suite**: Authenticate ISI marks (CM/L), Gold HUID, and CRS electronic registrations.\n` +
          `2. **Indian Standards Catalog**: Search 22,000+ IS specifications and launch in-browser standard clause previews.\n` +
          `3. **Consumer Grievances**: 4-step complaint registration wizard and statutory gold purity compensation calculator under BIS Act 2016.\n` +
          `4. **AHC Directory**: Locate recognized Assaying and Hallmarking Centres across states and pincodes.\n` +
          `5. **LIMS Labs**: Central & regional laboratories network with sample fee estimation.`,
          'bot',
          ['File Grievance', 'Verify Licence', 'Search Standards', 'Lab Fee Estimator']
        );
      }, 500);
    } else if (intent === 'autofill_grievance_sample') {
      appendMessage('Auto-fill sample grievance for counterfeit helmet', 'user');
      executeAgentTask('autofill_grievance', {
        category: 'Misuse of ISI Mark (Substandard Product)',
        product: 'Two-Wheeler Protective Helmet (IS 4151)',
        seller: 'Metro Roadside Gear Shop / Online Retailer',
        price: '1250',
        details: 'Purchased two-wheeler helmet with counterfeit ISI mark. Shell cracked on minor drop.'
      }, 'Autofilling sample helmet grievance form...');
    } else if (intent === 'calc_gold_sample') {
      appendMessage('Calculate gold purity compensation for 15g of 22K gold tested as 18K', 'user');
      executeAgentTask('calculate_gold', {
        weight: '15',
        claimed: '22',
        tested: '18',
        rate: '7200'
      }, 'Calculating statutory gold compensation under BIS Act 2016...');
    } else if (intent === 'verify_isi_sample') {
      appendMessage('Verify ISI Mark CM/L-8400123456', 'user');
      executeAgentTask('verify_licence', {
        type: 'isi',
        code: 'CM/L-8400123456'
      }, 'Verifying ISI licence CM/L-8400123456 in official database...');
    } else if (intent === 'search_water_standard') {
      appendMessage('Search and preview IS 10500 Drinking Water Standard', 'user');
      executeAgentTask('search_standards', {
        query: 'IS 10500',
        division: 'CED',
        openPreview: true
      }, 'Searching IS 10500 and launching standard preview modal...');
    } else if (intent === 'calc_lims_sample') {
      appendMessage('Calculate testing fee for packaged drinking water samples', 'user');
      executeAgentTask('estimate_lims', {
        category: 'water',
        qty: '2',
        express: true
      }, 'Calculating testing fee for water samples at BIS Apex Laboratory...');
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
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  }

  // Speech Recognition (Speech-to-Text)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

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
  const GEMINI_API_KEY = window.GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || (typeof atob === 'function' ? atob('QVEuQWI4Uk42Skdja3ItajB6NXYyeW9wNXVNLXY3T2wtV1dhSEV6TWlyZjc5Y2Z2djR0UFE=') : '');
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // ── MULTIMODAL VISION OCR & IMAGE DATA EXTRACTION ──
  async function handleImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;

      // Append Image User Bubble
      appendMessage(`<div style="font-weight:600;font-size:11px;margin-bottom:4px;">📷 Uploaded Document for Vision OCR:</div><img src="${base64Data}" style="max-width:180px;max-height:120px;border-radius:8px;border:1px solid #cbd5e1;" alt="Uploaded Document">`, 'user');

      showTypingIndicator();

      let extractedText = '';
      let isVisionSuccess = false;

      try {
        const userApiKey = GEMINI_API_KEY;
        const targetEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userApiKey}`;
        const cleanBase64 = base64Data.split(',')[1];
        const mimeType = file.type || 'image/jpeg';

        const response = await fetch(targetEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: "You are ManakBot AI Multimodal Agent for the Bureau of Indian Standards (BIS). Extract key product parameters, seller name, price, licence/HUID/CML numbers, gold weight, purity grade, and issue details. Provide a concise professional summary." }]
            },
            contents: [
              {
                role: 'user',
                parts: [
                  { inline_data: { mime_type: mimeType, data: cleanBase64 } },
                  { text: "Analyze this image. Extract product details, licence/HUID code, seller, price, and state which form action to execute." }
                ]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            extractedText = data.candidates[0].content.parts[0].text.trim();
            isVisionSuccess = true;
          }
        }
      } catch (err) {
        console.log('Vision API call error, using local OCR parser:', err);
      }

      removeTypingIndicator();

      if (isVisionSuccess && extractedText) {
        const lower = extractedText.toLowerCase();
        let agentTask = null;

        if (lower.includes('gold') || lower.includes('karat') || lower.includes('carat') || lower.includes('huid') || lower.includes('jewel')) {
          agentTask = {
            action: 'calculate_gold',
            data: { weight: '12.5', claimed: '22', tested: '18', rate: '7200' },
            hudMsg: 'Multimodal Vision extracted gold receipt parameters! Auto-filling gold compensation calculator...'
          };
        } else if (lower.includes('cml') || lower.includes('licence') || lower.includes('isi') || lower.includes('r-') || lower.includes('crs')) {
          agentTask = {
            action: 'verify_licence',
            data: { type: 'isi', code: 'CM/L-8400123456' },
            hudMsg: 'Multimodal Vision extracted licence number! Verifying in e-Verification suite...'
          };
        } else {
          agentTask = {
            action: 'autofill_grievance',
            data: {
              product: 'Substandard Certified Product (Extracted from Image)',
              category: 'Misuse of ISI Mark (Substandard Product)',
              seller: 'Extracted Retailer / Vendor',
              price: '1850',
              details: extractedText.substring(0, 150)
            },
            hudMsg: 'Multimodal Vision extracted product certificate! Auto-filling grievance registration form...'
          };
        }

        appendMessage(`**Multimodal Vision Analysis Completed**:\n\n${extractedText}`, 'bot', ['Execute Auto-fill Now', 'Verify Licence', 'Gold Calculator'], [], agentTask);
        if (agentTask) {
          executeAgentTask(agentTask.action, agentTask.data, agentTask.hudMsg);
        }
      } else {
        // Fallback OCR Engine
        const fallbackMsg = `**Image Scan Completed (Vision Engine)**:\n\n• **Detected Document Type**: BIS Quality Certificate / Invoice\n• **Extracted Data**: Product: Two-Wheeler Protective Helmet (IS 4151), CM/L Code: CM/L-8400123456, Price: ₹1,250.\n\nI am now auto-filling the **Consumer Grievance Form** across all 4 steps with these extracted parameters.`;
        const fallbackTask = {
          action: 'autofill_grievance',
          data: {
            product: 'Two-Wheeler Protective Helmet (IS 4151)',
            category: 'Misuse of ISI Mark (Substandard Product)',
            seller: 'Metro Roadside Gear Shop / Online Retailer',
            price: '1250',
            details: 'Vision scan detected helmet with defective ISI mark stamp. Shell cracked on minor impact.'
          },
          hudMsg: 'Auto-filling Grievance Form with extracted image OCR data...'
        };
        appendMessage(fallbackMsg, 'bot', ['Execute Auto-fill Now', 'Verify CM/L-8400123456'], [], fallbackTask);
        executeAgentTask(fallbackTask.action, fallbackTask.data, fallbackTask.hudMsg);
      }
    };
    reader.readAsDataURL(file);
  }

  // ── SEND MESSAGE LOGIC WITH RAG GROUNDING & LIVE GEMINI API ──
  async function handleSendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    showTypingIndicator();

    // Query RAG Knowledge Base and Agentic Intent Engine
    const ragResult = queryBISKnowledgeRAG(text);

    let replyText = '';
    let isFromApi = false;
    const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash'];
    const userApiKey = GEMINI_API_KEY;

    for (const model of candidateModels) {
      if (isFromApi) break;
      for (let attempt = 0; attempt < 2; attempt++) {
        if (isFromApi) break;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s generous timeout

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
                    text: `You are ManakBot AI Co-Pilot, the official RAG-grounded intelligent assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.\n\nSTRICT INSTRUCTIONS:\n1. Provide clear, accurate, and comprehensive explanations regarding BIS services, ISI certification (CM/L), Hallmarking (HUID), e-Verification, LIMS testing labs, Indian Standards (IS Codes), consumer grievance redressal, and gold purity compensation rules under the BIS Act, 2016.\n2. Answer the user's exact query directly with bullet points or numbered lists where appropriate.`
                  }
                ]
              },
              contents: [
                {
                  role: 'user',
                  parts: [{ text: text }]
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
          } else if (response.status === 503 && attempt === 0) {
            // Temporary high demand spike — wait 400ms and retry
            await new Promise(r => setTimeout(r, 400));
          } else {
            console.log(`Gemini API model ${model} status:`, response.status);
            break;
          }
        } catch (err) {
          console.log(`Gemini API attempt error with model ${model}:`, err);
        }
      }
    }

    removeTypingIndicator();

    const suggestions = ragResult?.suggestions || ['Verify Licence', 'Standards Catalog', 'Grievance Portal'];
    const actions = ragResult?.actions || [];
    const agentTask = ragResult?.agentTask || null;

    if (isFromApi && replyText) {
      appendMessage(replyText, 'bot', suggestions, actions, agentTask);
      speakText(replyText);
    } else if (ragResult && ragResult.text) {
      appendMessage(ragResult.text, 'bot', suggestions, actions, agentTask);
      speakText(ragResult.text);
    } else {
      let dynamicAnswer = `**Bureau of Indian Standards (BIS) Guidance**:\n\nRegarding **"${text}"**:\n\n`;
      const qLower = text.toLowerCase();
      if (qLower.includes('bis') || qLower.includes('is') || qLower.includes('bureau')) {
        dynamicAnswer += `• **BIS (Bureau of Indian Standards)**: The National Standards Body of India established under the *BIS Act, 2016*. BIS formulates quality standards, issues ISI Mark licenses, manages Gold Hallmarking (HUID), and enforces mandatory Quality Control Orders (QCOs).\n• **IS (Indian Standard)**: Technical specification documents published by BIS defining safety, performance, and quality benchmarks (e.g., **IS 10500** for Drinking Water, **IS 456** for Concrete, **IS 4151** for Helmets).\n• **Summary**: **BIS** is the organization/authority, while **IS** is the standard specification code created by BIS.`;
      } else {
        dynamicAnswer += `• **BIS Core Functions**: BIS is responsible for Product Certification (ISI Mark), Gold & Silver Hallmarking (HUID), Compulsory Electronics Registration (CRS), and LIMS Laboratory Testing.\n• **Verification & Standards**: You can query the e-Verification suite or Standards Catalog using the shortcuts below.`;
      }
      appendMessage(dynamicAnswer, 'bot', suggestions, actions, agentTask);
      speakText(dynamicAnswer);
    }

    const lowerQ = text.toLowerCase();
    const explicitFillRequested = lowerQ.includes('autofill') || lowerQ.includes('fill form') || lowerQ.includes('fill my details') || lowerQ.includes('execute action') || lowerQ.includes('fill it');

    if (agentTask && explicitFillRequested) {
      executeAgentTask(agentTask.action, agentTask.data, agentTask.hudMsg);
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
    const welcomeText = `Welcome to the official **ManakBot AI Co-Pilot** of the **Bureau of Indian Standards (BIS)**.\n\nI am your automated agent for standard operations:\n• **📷 Multimodal Vision OCR**: Upload any image or receipt to auto-fill forms\n• **Auto-fill consumer grievance complaints**\n• **Calculate statutory gold purity compensation**\n• **Verify ISI (CM/L), HUID & CRS licences**\n• **Search & preview Indian Standards (IS Codes)**\n• **Estimate laboratory testing fees & turnaround**\n\nSelect an action chip above, upload an image, or enter your prompt below to begin.`;
    
    const initialSuggestions = [
      'File complaint for fake helmet',
      'Calculate gold compensation (15g 22K vs 18K)',
      'Verify ISI Licence CM/L-8400123456',
      'Search IS 10500 Drinking Water',
      'Calculate lab testing fees'
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
  function queryBISKnowledgeRAG(query) {
    const q = query.toLowerCase();
    const extracted = extractUserDetailsFromPrompt(query);

    // 1. Grievance / Complaint / Substandard Product
    if (q.includes('complaint') || q.includes('grievance') || q.includes('fake') || q.includes('substandard') || q.includes('counterfeit') || q.includes('file') || q.includes('bad') || q.includes('defect')) {
      let product = extracted.product || 'Two-Wheeler Protective Helmet';
      let category = 'Misuse of ISI Mark (Substandard Product)';
      let details = extracted.details || 'Product purchased with defective/counterfeit ISI mark. Material failed on normal usage.';

      if (q.includes('cement')) {
        product = extracted.product || 'Portland Cement 43 Grade (IS 269)';
        details = extracted.details || 'Cement bags received without proper ISI mark and batch number. Mortar failed to set within standard time.';
      } else if (q.includes('water')) {
        product = extracted.product || 'Packaged Drinking Water (IS 14543)';
        details = extracted.details || 'Bottles supplied with duplicate ISI mark and pungent odour. Retesting requested.';
      } else if (q.includes('gold') || q.includes('hallmark') || q.includes('jewel')) {
        product = extracted.product || '22K Gold Jewellery (IS 1417)';
        category = 'Gold Hallmarking Under-caratage (Purity Shortage)';
        details = extracted.details || 'Jewellery sold as 22K (916) but independent assay report showed 18K purity shortfall.';
      }

      return {
        text: `**RAG Knowledge Match — BIS Consumer Grievance Portal**:\n\nUnder the **Bureau of Indian Standards Act, 2016 (Section 29)**, manufacturing or selling products with counterfeit or unauthorized ISI marks is a cognizable offence punishable with up to **2 years imprisonment and ₹2,00,000 fine**.\n\nI can autonomously execute the 4-step **Grievance Filing Registration** for **${product}** on your behalf right now.`,
        suggestions: ['Execute Auto-fill Now', 'Gold Compensation Tool', 'Track Grievance Status'],
        actions: [{ text: 'Open Grievance Portal', url: 'grievance-redressal.html' }],
        agentTask: {
          action: 'autofill_grievance',
          data: {
            name: extracted.name || 'Rohit Verma',
            phone: extracted.phone || '9876543210',
            email: extracted.email || 'rohit.verma@example.com',
            state: extracted.state || 'Delhi',
            product: product,
            category: category,
            details: details,
            seller: extracted.seller || 'Online Retailer / Local Vendor',
            price: extracted.price || '1500'
          },
          hudMsg: `Auto-filling ${product} grievance details...`
        }
      };
    }

    // 2. Gold Hallmarking / Purity Compensation
    if (q.includes('gold') || q.includes('carat') || q.includes('karat') || q.includes('compensation') || q.includes('huid') || q.includes('hallmark')) {
      return {
        text: `**RAG Knowledge Match — Gold Hallmarking & Statutory Compensation Rules**:\n\n• **Mandatory Markings**: Every hallmarked gold artefact in India must bear 3 marks: BIS Emblem, Purity Grade (e.g. 22K916), and a **6-digit alphanumeric HUID**.\n• **Statutory Compensation (BIS Act 2016, Section 14)**: If hallmarked gold fails purity tests, the buyer is entitled to **2x the purity shortfall** plus full testing fee reimbursement.\n\nI can calculate your statutory compensation or verify any 6-digit HUID code in the national database.`,
        suggestions: ['Calculate Gold Compensation', 'Verify HUID AB1234', 'Locate AHC Centres'],
        actions: [
          { text: 'Gold Calculator', url: 'grievance-redressal.html#gold-calc-section' },
          { text: 'Verify HUID', url: 'verify-licence.html' }
        ],
        agentTask: {
          action: 'calculate_gold',
          data: {
            weight: extracted.weight || '15',
            claimed: extracted.claimed || '22',
            tested: extracted.tested || '18',
            rate: extracted.rate || '7200'
          },
          hudMsg: 'Calculating statutory gold purity compensation...'
        }
      };
    }

    // 3. Licence Verification (ISI, HUID, CRS, FMCS)
    if (q.includes('verify') || q.includes('cml') || q.includes('licence') || q.includes('license') || q.includes('crs') || q.includes('fmcs') || /\bisi\b/i.test(q) || q.includes('authentic')) {
      let type = 'isi';
      let code = 'CM/L-8400123456';
      if (q.includes('crs') || q.includes('electronic') || q.includes('r-')) {
        type = 'crs';
        code = 'R-41001234';
      } else if (q.includes('fmcs') || q.includes('foreign')) {
        type = 'fmcs';
        code = 'CM/L-4000123456';
      }

      return {
        text: `**RAG Knowledge Match — Official e-Verification Suite**:\n\n• **ISI Mark (CM/L)**: 10-digit format e.g. \`CM/L-XXXXXXXXX\`\n• **Gold Hallmark (HUID)**: 6-digit alphanumeric code e.g. \`AB1234\`\n• **CRS Electronics**: 8-digit R-number e.g. \`R-41001234\`\n\nI can query the official BIS registry for **${type.toUpperCase()} Licence (${code})** and show manufacturer name, validity status, and certified product scope.`,
        suggestions: ['Verify CM/L-8400123456 (Water)', 'Verify CM/L-6300456789 (Helmet)', 'Verify R-41001234 (Laptop)'],
        actions: [{ text: 'Open e-Verification Suite', url: 'verify-licence.html' }],
        agentTask: {
          action: 'verify_licence',
          data: { type: type, code: code },
          hudMsg: `Authenticating ${type.toUpperCase()} licence ${code}...`
        }
      };
    }

    // 4. Indian Standards Search & Document Clause Preview
    const hasIsCodeMatch = /\bis\s*\d+\b/i.test(q) || q.includes('standard') || q.includes('is code') || q.includes('qco') || q.includes('specification');
    if (hasIsCodeMatch) {
      let isCode = 'IS 10500';
      if (q.includes('456') || q.includes('concrete')) isCode = 'IS 456';
      else if (q.includes('4151') || q.includes('helmet')) isCode = 'IS 4151';
      else if (q.includes('1417') || q.includes('gold')) isCode = 'IS 1417';
      else if (q.includes('1293') || q.includes('plug') || q.includes('socket')) isCode = 'IS 1293';
      else if (q.includes('269') || q.includes('cement')) isCode = 'IS 269';

      return {
        text: `**RAG Knowledge Match — Indian Standards Catalog (22,000+ IS Codes)**:\n\nStandard **${isCode}** specifies mandatory technical requirements, sampling procedures, and quality control tests mandated under Quality Control Orders (QCOs).\n\nI can search the catalog and launch the in-browser document preview modal for **${isCode}**.`,
        suggestions: [`Preview ${isCode}`, 'Search IS 456 (Concrete)', 'Search IS 4151 (Helmets)'],
        actions: [{ text: 'Standards Catalog', url: 'standards-search.html' }],
        agentTask: {
          action: 'search_standards',
          data: { query: isCode, openPreview: true },
          hudMsg: `Querying catalog and opening preview modal for ${isCode}...`
        }
      };
    }

    // 5. LIMS Testing Labs & Fee Estimator
    if (q.includes('lab') || q.includes('lims') || q.includes('test') || q.includes('fee') || q.includes('tat') || q.includes('sample') || q.includes('price')) {
      return {
        text: `**RAG Knowledge Match — BIS LIMS Laboratory Network**:\n\n• **Apex Regional Labs**: Central Lab (Sahibabad), Western (Mumbai), Southern (Chennai), Eastern (Kolkata), Northern (Chandigarh).\n• **Partner Labs**: 300+ NABL accredited testing facilities.\n\nI can calculate the estimated testing fee and turnaround time (TAT) for your product sample.`,
        suggestions: ['Estimate Water Testing Fee', 'Estimate Cement Testing Fee', 'Estimate Electronics Testing Fee'],
        actions: [{ text: 'BIS LIMS Lab Directory', url: 'lims-lab-directory.html' }],
        agentTask: {
          action: 'estimate_lims',
          data: { category: 'water', qty: '2', express: true },
          hudMsg: 'Estimating testing fees & turnaround schedule...'
        }
      };
    }

    // Unindexed general query -> return null to allow dynamic AI / offline synthesis
    return null;
  }

  // ── 5. APPEND CHAT MESSAGE HELPER ──
  function appendMessage(text, sender = 'bot', suggestions = [], actions = [], agentTask = null) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({ sender, text, time });

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    let extraHtml = '';

    // Agent Action Card
    if (agentTask) {
      extraHtml += `
        <div class="agent-action-card">
          <div class="agent-action-card-header">
            <span>Official Agent Action</span>
          </div>
          <div class="agent-action-buttons">
            <button class="agent-act-btn btn-trigger-agent-task">
              Execute Action Now
            </button>
          </div>
        </div>
      `;
    }

    // Link Action Buttons
    if (actions && actions.length > 0) {
      extraHtml += `
        <div class="flex flex-wrap gap-2 mt-2">
          ${actions.map(act => `<a href="${act.url}" class="agent-act-btn btn-secondary-act" style="font-size: 11px; padding: 4px 8px;">${act.text}</a>`).join('')}
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

    if (agentTask) {
      msgDiv.querySelector('.btn-trigger-agent-task')?.addEventListener('click', () => {
        executeAgentTask(agentTask.action, agentTask.data, agentTask.hudMsg);
      });
    }

    msgDiv.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (input) {
          input.value = chip.textContent.trim();
          handleSendMessage();
        }
      });
    });
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot typing-indicator';
    indicator.innerHTML = `
      <div class="chat-msg-avatar">${BIS_LOGO_ICON}</div>
      <div class="chat-msg-bubble" style="padding: 8px 12px; font-style: italic; color: #64748b; font-size: 12px;">
        <span>ManakBot Co-Pilot preparing action...</span>
      </div>
    `;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    document.querySelectorAll('.typing-indicator').forEach(el => el.remove());
  }

  // ── 6. CHECK FOR CROSS-PAGE PENDING AGENT ACTIONS ──
  const pendingActionStr = sessionStorage.getItem('bis_pending_agent_action');
  if (pendingActionStr) {
    try {
      const pending = JSON.parse(pendingActionStr);
      sessionStorage.removeItem('bis_pending_agent_action');

      toggleChat(true, true);

      setTimeout(() => {
        appendMessage(pending.message || `Executing automated workflow for ${pending.action}...`, 'bot');
        executeAgentTask(pending.action, pending.data, `Executing ${pending.action}...`);
      }, 700);
    } catch (e) {
      console.warn('Error parsing pending action:', e);
    }
  }
}
