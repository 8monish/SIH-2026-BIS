/**
 * BIS Portal — Dedicated ManakBot AI Studio Module
 * Fullscreen assistant with Speech Recognition, Speech Synthesis, Gemini API bridge, and document inspector.
 */

export function initManakBotPage() {
  const chatMessages = document.getElementById('studio-chat-messages');
  const chatInput = document.getElementById('studio-chat-input');
  const sendBtn = document.getElementById('btn-studio-send');
  const micBtn = document.getElementById('btn-studio-mic');
  const audioToggle = document.getElementById('toggle-speech-synthesis');
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const clearChatBtn = document.getElementById('btn-clear-chat');
  const exportChatBtn = document.getElementById('btn-export-chat');

  let recognition = null;
  let isListening = false;
  let conversationHistory = [];

  // 1. Initialize Web Speech Recognition
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Indian English

    recognition.onstart = () => {
      isListening = true;
      if (micBtn) {
        micBtn.classList.add('listening');
        micBtn.title = 'Listening... Speak now';
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (chatInput) {
        chatInput.value = transcript;
        handleSendMessage();
      }
    };

    recognition.onerror = (e) => {
      console.warn('Speech recognition error:', e);
      stopListening();
    };

    recognition.onend = () => {
      stopListening();
    };
  }

  function stopListening() {
    isListening = false;
    if (micBtn) {
      micBtn.classList.remove('listening');
      micBtn.title = 'Click to speak';
    }
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (!recognition) {
        alert('Speech recognition is not supported on this browser. Try Google Chrome or Microsoft Edge.');
        return;
      }
      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch(err) {
          console.warn(err);
        }
      }
    });
  }

  // 2. Speech Synthesis (Text to Speech)
  function speakText(text) {
    if (!audioToggle || !audioToggle.checked) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const cleanText = text.replace(/[*_#`[\]()]/g, '').replace(/https?:\/\/\S+/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  }

  // 3. Message Handling
  async function handleSendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    appendStudioMessage(text, 'user');
    chatInput.value = '';

    showStudioTyping();

    let botReply = '';
    let suggestions = [];

    try {
      botReply = await callLiveFreeLLMAPI(text);
    } catch (err) {
      console.log('FreeLLM API call offline/unreachable, using offline knowledge engine:', err);
      const responseObj = getStudioBotResponse(text);
      botReply = responseObj.text;
      suggestions = responseObj.suggestions;
    }

    setTimeout(() => {
      removeStudioTyping();
      appendStudioMessage(botReply, 'bot', suggestions);
      speakText(botReply);
    }, 400);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  const GEMINI_API_KEY = window.GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || (typeof atob === 'function' ? atob('QVEuQWI4Uk42Skdja3ItajB6NXYyeW9wNXVNLXY3T2wtV1dhSEV6TWlyZjc5Y2Z2djR0UFE=') : '');

  // 4. Google AI Studio Gemini API Bridge with BIS Domain Restrictions
  async function callLiveFreeLLMAPI(userPrompt) {
    const userKey = apiKeyInput?.value?.trim() || GEMINI_API_KEY;
    const candidateModels = ['gemini-3.6-flash', 'gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'];
    const systemContext = "You are ManakBot AI, the official intelligent assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Govt of India.\n\nSTRICT DOMAIN RESTRICTIONS & BOUNDARIES:\n1. ONLY answer queries regarding BIS services, ISI certification, Hallmarking (HUID), e-Verification, LIMS testing labs, Indian Standards (e.g., IS 10500, IS 456), consumer grievance redressal, gold purity compensation calculations, and navigating this BIS portal.\n2. If a query is unrelated to BIS (e.g. general knowledge, programming, non-BIS topics), politely decline and state: 'I am specialized exclusively as the Bureau of Indian Standards (BIS) Co-Pilot. I can assist you with ISI licence verification, Hallmarking HUID, Indian Standards, LIMS testing fees, or Consumer Grievances.'\n3. Maintain a professional, polite tone without emojis. Provide step-by-step guidance.";

    for (const model of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${userKey}`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemContext }]
            },
            contents: [
              { role: "user", parts: [{ text: userPrompt }] }
            ]
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text.trim();
          }
        }
      } catch (err) {
        console.log(`Gemini API model ${model} error:`, err);
      }
    }
    throw new Error('All Gemini API candidate models were unavailable');
  }

  // 5. Append Message in Studio
  function appendStudioMessage(text, sender = 'bot', suggestions = []) {
    if (!chatMessages) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    msgEl.innerHTML = `
      <div class="chat-bubble">${formattedText}</div>
      <span class="chat-time">${timeStr}</span>
    `;

    if (suggestions && suggestions.length > 0 && sender === 'bot') {
      const chipContainer = document.createElement('div');
      chipContainer.className = 'chat-suggestions';
      suggestions.forEach(s => {
        const chip = document.createElement('button');
        chip.className = 'chat-chip';
        chip.textContent = s;
        chip.addEventListener('click', () => {
          chatInput.value = s;
          handleSendMessage();
        });
        chipContainer.appendChild(chip);
      });
      msgEl.appendChild(chipContainer);
    }

    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversationHistory.push({ sender, text, time: timeStr });
  }

  function showStudioTyping() {
    removeStudioTyping();
    if (!chatMessages) return;
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot typing-message';
    indicator.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeStudioTyping() {
    const existing = chatMessages?.querySelector('.typing-message');
    if (existing) existing.remove();
  }

  // 6. Offline BIS Intelligence Engine
  function getStudioBotResponse(userInput) {
    const query = userInput.toLowerCase();

    if (query.includes('isi') || query.includes('mark') || query.includes('product cert') || query.includes('cml')) {
      return {
        text: `**BIS Product Certification (ISI Mark)**:\n\n• **Grant Process**: Apply online via the [Manakonline Portal](https://www.manakonline.in).\n• **Timeline**: Standard procedure takes 60-90 days; **Simplified Scheme** grants license within 30 days based on verified factory test report.\n• **Audit & Surveillance**: Periodic surprise factory audits and market sample seizures ensure uncompromising product quality.\n• **Statistics**: Over **41,000+ active licenses** across 1,000+ products.`,
        suggestions: ['Verify an ISI License Number', 'Mandatory QCO Products List', 'Application Fee Structure']
      };
    }

    if (query.includes('hallmark') || query.includes('gold') || query.includes('huid') || query.includes('silver')) {
      return {
        text: `**Gold & Silver Hallmarking (HUID)**:\n\n• **Mandatory Coverage**: Compulsory gold hallmarking is active across 343+ Indian districts.\n• **3 Mandatory Marks on Gold**:\n  1. **BIS Standard Logo** (Triangle mark)\n  2. **Purity / Fineness Grade** (e.g. 22K916, 18K750, 14K585)\n  3. **6-Digit Alphanumeric HUID** (Unique to each individual jewellery piece)\n• **Verification**: Enter the 6-character HUID on our [e-Verification Portal](verify-licence.html) or BIS CARE App.`,
        suggestions: ['Verify 6-digit HUID', 'Find Hallmarking Centres Near Me', 'Calculate Under-Caratage Compensation']
      };
    }

    if (query.includes('standard') || query.includes('is code') || query.includes('download')) {
      return {
        text: `**Indian Standards (IS Codes) Catalog**:\n\n• BIS has formulated over **22,000+ Indian Standards** across 15 technical divisions.\n• All published standards are accessible for **FREE preview** by citizens on our [Standards Search Portal](standards-search.html).\n• Examples: *IS 10500* (Drinking Water), *IS 456* (Concrete), *IS 4151* (Helmets), *IS 1293* (Electrical Plugs).`,
        suggestions: ['Search IS 10500 Water Standard', 'Search IS 456 Concrete', 'Draft Standards for Review']
      };
    }

    if (query.includes('complaint') || query.includes('fraud') || query.includes('fake') || query.includes('grievance')) {
      return {
        text: `**Consumer Grievance & Redressal**:\n\n• You can register a formal complaint against substandard goods or counterfeit ISI/hallmark marks via our [Grievance Redressal Portal](grievance-redressal.html).\n• You will receive an instant tracking docket (e.g. *BIS-GR-2026-1048*).\n• Under BIS Act 2016, consumers are entitled to **2x financial compensation** for gold purity discrepancies!`,
        suggestions: ['File a Complaint Now', 'Track Existing Grievance Docket', 'Helpline Toll-Free Number']
      };
    }

    return {
      text: `Hello! I am **ManakBot AI Studio Assistant**, the official intelligent agent for the **Bureau of Indian Standards (BIS)**.\n\nI am grounded in official BIS domain knowledge to assist you with:\n• **Product Certification (ISI Mark & CM/L)**\n• **Gold Hallmarking (6-digit HUID Verification)**\n• **Search 22,000+ Indian Standards (IS Codes)**\n• **Consumer Grievance Portal & 2x Compensation**\n• **LIMS Apex Testing Laboratories Network**\n\nHow may I assist your compliance or verification requirement today?`,
      suggestions: ['How to get ISI Mark?', 'Verify Gold Hallmark', 'Indian Standards Search', 'Register Consumer Complaint']
    };
  }

  // 7. Prompt Deck Clicks
  document.querySelectorAll('.prompt-card').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      if (chatInput && prompt) {
        chatInput.value = prompt;
        handleSendMessage();
      }
    });
  });

  // 8. Clear & Export
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (chatMessages) {
        chatMessages.innerHTML = '';
        conversationHistory = [];
        appendStudioMessage('Welcome to **ManakBot AI**, your virtual BIS assistant. How can I assist you today?', 'bot', ['How to get ISI Mark?', 'Check Gold Hallmarking', 'Download Indian Standards']);
      }
    });
  }

  if (exportChatBtn) {
    exportChatBtn.addEventListener('click', () => {
      if (conversationHistory.length === 0) {
        alert('No messages to export yet.');
        return;
      }
      let exportText = `# Bureau of Indian Standards — ManakBot AI Session Transcript\n\nDate: ${new Date().toLocaleString()}\n\n---\n\n`;
      conversationHistory.forEach(item => {
        exportText += `### [${item.time}] ${item.sender === 'bot' ? 'ManakBot AI' : 'User'}:\n${item.text}\n\n`;
      });

      const blob = new Blob([exportText], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ManakBot-BIS-Chat-${Date.now()}.md`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Initial Welcome
  appendStudioMessage('Welcome to **ManakBot AI**, the official assistant of the Bureau of Indian Standards (BIS).\n\nQuery about **ISI Mark Certification**, **Gold Hallmarking (HUID)**, **Indian Standards (IS Codes)**, **FMCS**, or **Consumer Complaints**.', 'bot', ['How to get ISI Mark?', 'Check Gold Hallmarking', 'Download Indian Standards', 'File a Complaint']);
}
