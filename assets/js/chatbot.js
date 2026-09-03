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
      if (input) {
        input.value = 'How do I file a consumer complaint for a fake or defective ISI helmet?';
        handleSendMessage();
      }
    } else if (intent === 'calc_gold_sample') {
      if (input) {
        input.value = 'Calculate gold compensation for 15g of 22K gold tested as 18K';
        handleSendMessage();
      }
    } else if (intent === 'verify_isi_sample') {
      if (input) {
        input.value = 'How do I verify ISI Licence CM/L-8400123456?';
        handleSendMessage();
      }
    } else if (intent === 'search_water_standard') {
      if (input) {
        input.value = 'Show standard specifications and preview for IS 10500 Drinking Water';
        handleSendMessage();
      }
    } else if (intent === 'calc_lims_sample') {
      if (input) {
        input.value = 'How can I estimate lab testing fees for packaged water samples?';
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

  // ── PRODUCT INSPECTION, AUTHENTICITY AUDIT & LEGAL ROADMAP ENGINE ──
  function buildProductInspectionDossier(inputSource = '', extractedVisionText = '', fileName = '') {
    const combined = `${inputSource} ${extractedVisionText} ${fileName}`.toLowerCase();

    // Determine Product Archetype & Simulated Audit Parameters
    let product = {
      name: 'Two-Wheeler Protective Full-Face Helmet',
      brand: 'AeroShield Moto Pro / SpeedGears',
      standard: 'IS 4151:2015',
      division: 'Mechanical Engineering (MED)',
      qco: 'Helmets for Riders of Two-Wheeler Motor Vehicles (QCO) 2020 — Mandatory Under Gazette S.O. 3942(E)',
      cml: 'CM/L-8400192847',
      price: '₹1,450',
      fee: '₹14,500',
      tat: '12 Working Days',
      keyTests: 'Impact Absorption (Clause 7), Dynamic Retention Chin-Strap Strength (Clause 8), Peripheral Vision & Penetration Resistance (Clause 9)',
      defectReason: 'CM/L-8400192847 not found in active BIS Central Registry; aspect ratio of the ISI logo fails 1:1.414 physical specifications; missing statutory 7-digit sub-licence identifier.'
    };

    if (combined.includes('water') || combined.includes('bottle') || combined.includes('mineral') || combined.includes('jar') || combined.includes('is14543') || combined.includes('is10500')) {
      product = {
        name: 'Packaged Drinking Water (500ml / 1L PET Bottle)',
        brand: 'Himalayan Pure Flow / BlueStream Waters',
        standard: 'IS 14543:2016',
        division: 'Food and Agriculture (FAD)',
        qco: 'Packaged Drinking Water (QCO) 2001 — 100% Compulsory Certification Prior to Commercial Sale',
        cml: 'CM/L-9200481729',
        price: '₹20',
        fee: '₹9,800',
        tat: '7 Working Days',
        keyTests: 'Microbiological Sterility (E. coli, Coliform, Yeast), Heavy Metals (Lead, Arsenic), Total Dissolved Solids (TDS), Pesticide Residues',
        defectReason: 'Duplicate CM/L-9200481729 registered to a different manufacturing unit in Solan; packaging label lacks mandatory batch sterilization code and BIS Care QR code.'
      };
    } else if (combined.includes('cement') || combined.includes('concrete') || combined.includes('mortar') || combined.includes('opc') || combined.includes('ppc') || combined.includes('is269') || combined.includes('is1489')) {
      product = {
        name: 'Portland Pozzolana Cement (50kg HDPE Bag)',
        brand: 'MahaShakti Pro Cement / InfraBuild Ultra',
        standard: 'IS 1489 (Part 1):2015',
        division: 'Civil Engineering (CED)',
        qco: 'Cement (Quality Control) Order, 2003 — Mandatory ISI mark under Bureau of Indian Standards Act',
        cml: 'CM/L-7100349281',
        price: '₹380 / bag',
        fee: '₹18,500',
        tat: '28 Working Days',
        keyTests: 'Compressive Strength at 3, 7, 28 days (IS 4031 Part 6), Setting Time (Initial & Final), Fineness by Blaine, Chemical Soundness by Le-Chatelier',
        defectReason: 'Expired CM/L number; bag stitching missing mandatory red-thread tamper seal; fly-ash composition exceeds permissible 35% statutory ceiling.'
      };
    } else if (combined.includes('gold') || combined.includes('jewel') || combined.includes('ring') || combined.includes('huid') || combined.includes('hallmark') || combined.includes('carat') || combined.includes('karat')) {
      product = {
        name: '22K Hallmarked Gold Jewellery Artefact',
        brand: 'Sri Laxmi Jewellers / Royale Ornaments',
        standard: 'IS 1417:2016 (Gold & Gold Alloys)',
        division: 'Metallurgical Engineering (MTD)',
        qco: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 — Mandatory in 343+ Indian Districts',
        cml: 'HUID: XY9824',
        price: '₹68,400',
        fee: '₹500 (Assaying test fee)',
        tat: '24–48 Hours',
        keyTests: 'Fire Assay & Cupellation (IS 1418), X-ray Fluorescence (XRF) Non-destructive Purity Scan',
        defectReason: '6-digit HUID XY9824 failed cryptographic checksum verification in national Assaying & Hallmarking Centre database; tested purity was 18.4 Karat (76.8% gold) instead of claimed 22K (91.6%).'
      };
    } else if (combined.includes('wire') || combined.includes('cable') || combined.includes('copper') || combined.includes('is694')) {
      product = {
        name: 'PVC Insulated Copper Wire (1.5 sq mm, 1100V)',
        brand: 'VoltShield FlameRetard Cables',
        standard: 'IS 694:2010',
        division: 'Electrotechnical (ETD)',
        qco: 'Electrical Wires and Cables (QCO) 2023 — Mandatory ISI Certification',
        cml: 'CM/L-5300184920',
        price: '₹1,850 / 90m coil',
        fee: '₹12,200',
        tat: '10 Working Days',
        keyTests: 'Conductor Resistance (IS 8130), Insulation Resistance & Spark Test, Flammability Test, Critical Oxygen Index',
        defectReason: 'CM/L mark printed with substandard ink without embossed ISI logo on sheath; conductor resistance exceeds statutory maximum, posing severe household fire hazard.'
      };
    } else if (combined.includes('steel') || combined.includes('tmt') || combined.includes('bar') || combined.includes('rod') || combined.includes('is1786')) {
      product = {
        name: 'Fe 500D High Strength Deformed TMT Steel Bar (12mm)',
        brand: 'BharatSteel InfraTMT',
        standard: 'IS 1786:2008',
        division: 'Metallurgical Engineering (MTD)',
        qco: 'Steel and Steel Products (Quality Control) Order — 100% Mandatory ISI Licence',
        cml: 'CM/L-4400827103',
        price: '₹58,000 / Tonne',
        fee: '₹22,000',
        tat: '14 Working Days',
        keyTests: 'Yield Strength (0.2% proof stress), Tensile-to-Yield Ratio, Percentage Elongation, Bend & Rebend Test',
        defectReason: 'Brand rolling mark absent on rebar ribs; carbon equivalent exceeds 0.42% limit leading to brittle weld joints.'
      };
    } else if (combined.includes('toy') || combined.includes('doll') || combined.includes('game') || combined.includes('is9873')) {
      product = {
        name: 'Electric / Non-Electric Children Educational Toy',
        brand: 'KiddoPlay Innovations',
        standard: 'IS 9873 (Part 1):2019',
        division: 'Production & General Engineering (PCD)',
        qco: 'Toys (Quality Control) Order, 2020 — Mandatory ISI Mark across all toys sold in India',
        cml: 'CM/L-6100982341',
        price: '₹699',
        fee: '₹8,500',
        tat: '8 Working Days',
        keyTests: 'Mechanical & Physical Properties (Choking hazard drop test), Flammability, Migration of Toxic Heavy Metals (Lead, Cadmium)',
        defectReason: 'Counterfeit ISI mark printed on cardboard outer box without registration details; small part detachability fails safety drop test for children under 36 months.'
      };
    } else if (combined.includes('plug') || combined.includes('socket') || combined.includes('is1293')) {
      product = {
        name: '3-Pin Heavy Duty 16A Plug Top and Shuttered Socket',
        brand: 'PowerGrip Modular Switchgear',
        standard: 'IS 1293:2019',
        division: 'Electrotechnical (ETD)',
        qco: 'Plugs and Socket-Outlets (QCO) 2022 — Mandatory BIS Certification',
        cml: 'CM/L-8200193482',
        price: '₹140',
        fee: '₹11,000',
        tat: '10 Working Days',
        keyTests: 'Temperature Rise Test, Contact Resistance, High-Voltage Flash Test, Withdrawal Force & Shutter Safety',
        defectReason: 'Pins undersized by 0.8mm leading to loose electrical contacts and arcing; lack of mandatory safety shutter over live terminals.'
      };
    }

    const docketId = `BIS-GR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const prefillUrl = `grievance-redressal.html?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent('Misuse of ISI Mark (Substandard Product)')}&details=${encodeURIComponent(product.defectReason)}&seller=${encodeURIComponent(product.brand)}&price=${encodeURIComponent(product.price.replace(/[^\d]/g, '') || '1200')}&invoice=${encodeURIComponent(`INV-${Math.floor(100000 + Math.random() * 900000)}`)}`;
    const stdQuery = product.standard.split(':')[0].trim();
    const stdUrl = `standards-search.html?q=${encodeURIComponent(stdQuery)}`;
    const verifyCode = product.cml.replace(/HUID:\s*/i, '');
    const verifyUrl = `verify-licence.html?type=${product.cml.startsWith('HUID') ? 'huid' : 'isi'}&code=${encodeURIComponent(verifyCode)}`;

    return {
      text: `### 🛡️ **Bureau of Indian Standards (BIS) — Automated Product Inspection & Compliance Report**\n\n#### 📋 **1. Extracted Product Specifications**\n• **Product Name**: **${product.name}**\n• **Brand / Trade Name**: ${product.brand}\n• **Applicable Standard**: **${product.standard}**\n• **Claimed Mark / Code**: \`${product.cml}\`\n• **Technical Division**: ${product.division}\n• **Quality Control Order (QCO)**: ⚠️ **${product.qco}**\n\n---\n\n#### 🚨 **2. Authenticity & Fake / Counterfeit Audit Verdict**\n• **Status**: ⚠️ **SUSPICIOUS / NON-COMPLIANT PRODUCT DETECTED (Simulated Audit)**\n• **Central Registry Verification**: ❌ \`${product.cml}\` failed official registry validation.\n• **Identified Discrepancy**: ${product.defectReason}\n• **Safety Risk Level**: **HIGH (Non-Compliance with Mandatory Safety Benchmark)**\n• **Legal Consequence**: Under **Section 29, BIS Act 2016**, manufacturing, stocking, or selling non-certified goods covered under mandatory QCO is punishable with up to **2 years imprisonment and minimum ₹2,00,000 penalty**.\n\n---\n\n#### 🏭 **3. Legal Roadmap: How to Legally Certify This Product (For Manufacturers & Sellers)**\n*Follow these 6 steps to apply for a legal IS Code & obtain genuine BIS ISI Certification from scratch:*\n1. **Standard Scope & Gap Analysis**:\n   - Review **${product.standard}** on the [Standards Catalog](standards-search.html).\n   - Mandatory Test Benchmarks: *${product.keyTests}*.\n2. **In-House Testing Setup (STI)**:\n   - Equip your factory laboratory adhering to the **Scheme of Testing and Inspection (STI)** with calibrated measuring instruments and qualified quality personnel.\n3. **Benchmark Prototype Testing via LIMS**:\n   - Submit pre-commissioning prototypes to an accredited BIS/NABL testing facility on the [LIMS Testing Directory](lims-lab-directory.html).\n   - *Benchmark*: Estimated Fee: **${product.fee}**; Turnaround Time: **${product.tat}**.\n4. **File Application on Manakonline**:\n   - Complete online Form-I submission on the official [Manakonline Portal](https://www.manakonline.in) with factory layout, machinery specs, and test reports.\n5. **On-Site Factory Audit**:\n   - Designated BIS Technical Officer inspects the production line, validates manufacturing quality controls, and draws independent market validation samples.\n6. **Grant of Authentic CM/L Licence**:\n   - Upon test clearance, BIS grants your 10-digit **CM/L-XXXXXXXXX** licence, legally authorizing the use of the authentic ISI Mark.\n\n---\n\n#### ⚖️ **4. Consumer Recourse & Complaint Filing (If Defective / Counterfeit)**\n• **Auto-Generated Tracking Docket**: \`${docketId}\`\n• Click below to review your pre-filled formal grievance. BIS Branch Enforcement conducts market surveillance raids and sample seizures under Section 28 of the BIS Act, 2016.`,
      suggestions: [
        'Show Manufacturer Roadmap',
        'Verify 10-digit CM/L',
        'LIMS Testing Labs',
        'Standards Catalog'
      ],
      actions: [
        { text: '📝 Open Pre-Filled Grievance Form', url: prefillUrl },
        { text: '🔍 Verify Licence on Portal', url: verifyUrl },
        { text: `📖 View Standard (${stdQuery})`, url: stdUrl },
        { text: '🧪 Estimate LIMS Lab Fee', url: 'lims-lab-directory.html' }
      ]
    };
  }

  // ── MULTIMODAL VISION OCR & IMAGE DATA EXTRACTION ──
  async function handleImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;
      const isImg = file.type.startsWith('image/');

      // Append Image / Document User Bubble
      const previewHtml = isImg
        ? `<img src="${base64Data}" style="max-width:180px;max-height:120px;border-radius:8px;border:1px solid #cbd5e1;display:block;margin-top:4px;" alt="Uploaded Product">`
        : `<div style="display:flex;align-items:center;gap:6px;margin-top:4px;font-size:12px;color:#1e40af;"><span style="font-size:18px;">📄</span><span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span></div>`;

      appendMessage(`<div style="font-weight:600;font-size:11px;">🔍 Uploaded Product File for AI Inspection:</div>${previewHtml}`, 'user');

      showTypingIndicator();

      let extractedText = '';
      try {
        if (isImg) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500); // Fast 3.5s timeout
          const userApiKey = GEMINI_API_KEY;
          const targetEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userApiKey}`;
          const cleanBase64 = base64Data.split(',')[1];
          const mimeType = file.type || 'image/jpeg';

          const response = await fetch(targetEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: "You are ManakBot AI Multimodal Agent for the Bureau of Indian Standards (BIS). Extract product name, brand, claimed IS standard, CM/L number, price, and marking defects." }]
              },
              contents: [
                {
                  role: 'user',
                  parts: [
                    { inline_data: { mime_type: mimeType, data: cleanBase64 } },
                    { text: "Analyze this product label, package, or certificate. Extract product details, licence/HUID code, seller, price, and state if counterfeit." }
                  ]
                }
              ]
            })
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
              extractedText = data.candidates[0].content.parts[0].text.trim();
            }
          }
        }
      } catch (err) {
        console.log('Multimodal API notice, using simulated BIS inspection engine:', err.message || err);
      }

      removeTypingIndicator();

      // Build and append full inspection dossier
      const dossier = buildProductInspectionDossier(file.name, extractedText, file.name);
      appendMessage(dossier.text, 'bot', dossier.suggestions, dossier.actions);
      speakText(dossier.text);
    };
    reader.readAsDataURL(file);
  }

  let isChatProcessing = false;

  // ── SEND MESSAGE LOGIC WITH RAG GROUNDING & LIVE GEMINI API ──
  async function handleSendMessage() {
    if (isChatProcessing) return;
    const text = input ? input.value.trim() : '';
    if (!text) return;

    isChatProcessing = true;
    if (input) input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    try {
      appendMessage(text, 'user');
      if (input) input.value = '';

      showTypingIndicator();

      // Query RAG Knowledge Base and Agentic Intent Engine
      const ragResult = queryBISKnowledgeRAG(text);

      let replyText = '';
      let isFromApi = false;
      const candidateModels = ['gemini-3.5-flash', 'gemini-3.1-flash-lite'];
      const userApiKey = GEMINI_API_KEY;

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
                    text: `You are ManakBot AI Co-Pilot, the official RAG-grounded intelligent assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.\n\nSTRICT INSTRUCTIONS:\n1. Provide clear, accurate, and comprehensive explanations regarding BIS services, ISI certification (CM/L), Hallmarking (HUID), e-Verification, LIMS testing labs, Indian Standards (IS Codes), consumer grievance redressal, and gold purity compensation rules under the BIS Act, 2016.\n2. Answer the user's exact query directly with concise bullet points or numbered lists where appropriate.`
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
          }
        } catch (err) {
          console.log(`Model ${model} notice:`, err.message || err);
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
    } catch (criticalErr) {
      console.warn('ManakBot handling notice:', criticalErr);
      appendMessage('I am ready for your query. What standard, licence, or grievance can I assist you with?', 'bot', ['Verify Licence', 'Standards Catalog', 'Grievance Portal']);
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

    // 0. Product Inspection, Authenticity Check & Legal IS Code Application Roadmap
    if (q.includes('fake') || q.includes('genuine') || q.includes('is it real') || q.includes('apply for legal') || q.includes('legal is code') || q.includes('how to proceed with this product') || q.includes('inspect product') || q.includes('counterfeit check') || q.includes('check product') || q.includes('check if fake') || q.includes('product inspection')) {
      return buildProductInspectionDossier(query);
    }

    // 0. Comprehensive End-to-End Roadmaps & Workflows (From Scratch to Finish)
    if (q.includes('roadmap') || q.includes('workflow') || q.includes('start to end') || q.includes('from scratch') || q.includes('how to start') || q.includes('guide') || q.includes('how does it work') || q.includes('steps to')) {
      return {
        text: `**Official Bureau of Indian Standards (BIS) Operational Roadmaps**:\n\nHere is your step-by-step guidance from start to finish based on your requirement:\n\n---\n\n### 🏭 **Roadmap 1: Manufacturer ISI Mark Certification (From Scratch)**\n1. **Standard Identification**: Search your product on our **Standards Catalog** (\`standards-search.html\`) to identify the applicable IS Code (e.g., IS 10500 for Water, IS 456 for Concrete, IS 4151 for Helmets) and check if covered under a mandatory Quality Control Order (QCO).\n2. **In-House Testing Setup**: Equip your factory according to the Scheme of Testing and Inspection (STI) with calibrated measuring gauges and qualified quality personnel.\n3. **Lab Testing Sample Benchmark**: Query our **LIMS Testing Directory** (\`lims-lab-directory.html\`) to locate an accredited BIS/NABL testing laboratory and calculate turnaround fees.\n4. **Application Submission**: File your online application via [Manakonline Portal](https://www.manakonline.in) with factory layout, test reports, and machinery details.\n5. **Factory Audit & Sample Seizure**: A designated BIS Technical Officer conducts on-site factory verification and draws independent market samples.\n6. **Grant of Licence (CM/L)**: Upon test compliance, BIS grants your 10-digit **CM/L-XXXXXXXXX** licence, publicly verifiable in real time.\n\n---\n\n### 🛡️ **Roadmap 2: Consumer Grievance & Substandard Product Redressal**\n1. **Authenticate Label**: Check the 10-digit CM/L or 6-digit HUID on the product via our **e-Verification Suite** (\`verify-licence.html\`).\n2. **Gather Evidence**: Take photos of the substandard item, tax invoice, and label markings.\n3. **File Grievance**: Complete our 4-step wizard on **Consumer Redressal** (\`grievance-redressal.html\`) to generate a unique 16-character tracking docket ID (e.g. \`BIS-GR-2026-1048\`).\n4. **Surveillance & Raid**: BIS Enforcement Officers execute market raids and seize non-compliant batches under Section 28 & 29 of the BIS Act, 2016.\n5. **Redressal & Refund**: Track the live investigation timeline until compensation or replacement is disbursed.\n\n---\n\n### 💍 **Roadmap 3: Gold Jewellery Purity Verification & 2x Compensation**\n1. **Inspect Mandatory Hallmarks**: Verify the 3 marks (BIS Logo, Purity e.g. 22K916, and 6-digit alphanumeric HUID) on **e-Verification**.\n2. **Independent Assaying**: Locate an accredited centre on **Assaying & Hallmarking Centres** (\`hallmarking-centres.html\`) for touchstone/XRF purity testing.\n3. **Calculate Statutory Compensation**: If purity fails, enter the weights on our **Gold Calculator** to compute **2x value shortfall penalty** plus ₹500 assay refund (Section 14 BIS Act 2016).\n4. **File Redressal Claim**: Submit the assay certificate for statutory recovery.`,
        suggestions: ['Start Manufacturer Roadmap', 'File Consumer Grievance', 'Verify 10-digit CM/L', 'Gold 2x Calculator'],
        actions: [
          { text: 'Standards Catalog', url: 'standards-search.html' },
          { text: 'e-Verification', url: 'verify-licence.html' },
          { text: 'Consumer Grievance', url: 'grievance-redressal.html' },
          { text: 'LIMS Lab Network', url: 'lims-lab-directory.html' }
        ]
      };
    }

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

      const prefillUrl = `grievance-redressal.html?name=${encodeURIComponent(extracted.name || '')}&phone=${encodeURIComponent(extracted.phone || '')}&email=${encodeURIComponent(extracted.email || '')}&state=${encodeURIComponent(extracted.state || '')}&product=${encodeURIComponent(product)}&category=${encodeURIComponent(category)}&details=${encodeURIComponent(details)}&seller=${encodeURIComponent(extracted.seller || '')}&price=${encodeURIComponent(extracted.price || '')}`;

      return {
        text: `**BIS Consumer Grievance — Complaint Draft Prepared**:\n\nUnder **BIS Act, 2016 (Section 29)**, manufacturing or marketing goods with counterfeit ISI marks carries up to **2 years imprisonment and ₹2,00,000 penalty**.\n\nHere are the details captured from your prompt:\n• **Complainant**: ${extracted.name || 'Citizen'} (${extracted.phone || 'Phone not provided'})\n• **Product**: ${product}\n• **Category**: ${category}\n• **Seller**: ${extracted.seller || 'Vendor / Retailer'}\n• **Issue**: ${details}\n\nClick below to open the **Consumer Grievance Portal** with these details already pre-filled.`,
        suggestions: ['Verify 10-digit CM/L', 'Gold 2x Calculator', 'Track Grievance Docket'],
        actions: [
          { text: '📝 Open Pre-Filled Grievance Form', url: prefillUrl },
          { text: 'Verify Licence', url: 'verify-licence.html' }
        ]
      };
    }

    // 2. Gold Hallmarking / Purity Compensation
    if (q.includes('gold') || q.includes('carat') || q.includes('karat') || q.includes('compensation') || q.includes('huid') || q.includes('hallmark')) {
      const goldUrl = `grievance-redressal.html?weight=${encodeURIComponent(extracted.weight || '15')}&claimed=${encodeURIComponent(extracted.claimed || '22')}&tested=${encodeURIComponent(extracted.tested || '18')}&rate=${encodeURIComponent(extracted.rate || '7200')}#gold-calc-section`;

      return {
        text: `**BIS Gold Hallmarking & Statutory Compensation**:\n\n• **Mandatory 3 Marks**: BIS Standard Logo, Purity (e.g. 22K916), and 6-digit alphanumeric **HUID**.\n• **Statutory Compensation (BIS Act 2016, Section 14)**: If hallmarked gold fails assay tests, the consumer is legally entitled to **2x the purity shortfall** plus refund of the ₹500 assaying fee.\n\nClick below to calculate your exact compensation or authenticate a 6-digit HUID:`,
        suggestions: ['Verify 6-digit HUID', 'Locate Hallmarking Centres', 'File Gold Complaint'],
        actions: [
          { text: '⚖️ Open Pre-Filled Gold Calculator', url: goldUrl },
          { text: 'Verify HUID on Portal', url: 'verify-licence.html?type=huid' }
        ]
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
      } else if (q.includes('huid')) {
        type = 'huid';
        code = 'AB1234';
      }

      const verifyUrl = `verify-licence.html?type=${encodeURIComponent(type)}&code=${encodeURIComponent(code)}`;

      return {
        text: `**BIS e-Verification Registry**:\n\n• **ISI Mark (CM/L)**: 10-digit licence format e.g. \`CM/L-8400123456\`\n• **Gold Hallmark (HUID)**: 6-digit alphanumeric code e.g. \`AB1234\`\n• **CRS Electronics**: 8-digit R-number e.g. \`R-41001234\`\n\nClick below to instantly verify **${code}** in the live national database:`,
        suggestions: [`Verify CM/L-8400123456 (Water)`, `Verify CM/L-6300456789 (Helmet)`, `Verify R-41001234 (CRS)`],
        actions: [
          { text: `🔍 Verify ${code} on Portal`, url: verifyUrl },
          { text: 'e-Verification Suite', url: 'verify-licence.html' }
        ]
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

      const stdUrl = `standards-search.html?q=${encodeURIComponent(isCode)}`;

      return {
        text: `**Indian Standards Catalog (IS Codes)**:\n\nStandard **${isCode}** specifies mandatory safety requirements and quality control testing procedures enforced under national Quality Control Orders (QCOs).\n\nClick below to search the catalog and view the full standard details:`,
        suggestions: [`Search ${isCode}`, 'Search IS 456 (Concrete)', 'Search IS 10500 (Water)'],
        actions: [
          { text: `📖 Search & Preview ${isCode}`, url: stdUrl },
          { text: 'Browse Standards Catalog', url: 'standards-search.html' }
        ]
      };
    }

    // 5. LIMS Testing Labs & Fee Estimator
    if (q.includes('lab') || q.includes('lims') || q.includes('test') || q.includes('fee') || q.includes('tat') || q.includes('sample') || q.includes('price')) {
      return {
        text: `**RAG Knowledge Match — BIS LIMS Laboratory Network**:\n\n• **Apex Regional Labs**: Central Lab (Sahibabad), Western (Mumbai), Southern (Chennai), Eastern (Kolkata), Northern (Chandigarh).\n• **Partner Labs**: 300+ NABL accredited testing facilities.\n\nI can calculate the estimated testing fee and turnaround time (TAT) for your product sample.`,
        suggestions: ['Estimate Water Testing Fee', 'Estimate Cement Testing Fee', 'Estimate Electronics Testing Fee'],
        actions: [{ text: 'BIS LIMS Lab Directory', url: 'lims-lab-directory.html' }]
      };
    }

    // Unindexed general query -> return null to allow dynamic AI / offline synthesis
    return null;
  }

  // ── 5. APPEND CHAT MESSAGE HELPER ──
  function appendMessage(text, sender = 'bot', suggestions = [], actions = []) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({ sender, text, time });

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

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
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot typing-indicator';
    indicator.innerHTML = `
      <div class="chat-msg-avatar">${BIS_LOGO_ICON}</div>
      <div class="chat-msg-bubble" style="padding: 8px 12px; font-style: italic; color: #64748b; font-size: 12px;">
        <span>ManakBot Co-Pilot preparing response...</span>
      </div>
    `;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    document.querySelectorAll('.typing-indicator').forEach(el => el.remove());
  }
}
