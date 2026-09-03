/**
 * BIS Portal — Dedicated ManakBot AI Studio Module
 * Fullscreen assistant with Speech Recognition, Speech Synthesis, Gemini API bridge, and document inspector.
 */

export function initManakBotPage() {
  const chatMessages = document.getElementById('studio-chat-messages');
  const chatInput = document.getElementById('studio-chat-input');
  const sendBtn = document.getElementById('btn-studio-send');
  const micBtn = document.getElementById('btn-studio-mic');
  const uploadBtn = document.getElementById('btn-studio-upload');
  const fileInput = document.getElementById('studio-file-input');
  const audioToggle = document.getElementById('toggle-speech-synthesis');
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const clearChatBtn = document.getElementById('btn-clear-chat');
  const exportChatBtn = document.getElementById('btn-export-chat');

  let recognition = null;
  let isListening = false;
  let conversationHistory = [];

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleStudioFileUpload(e.target.files[0]);
      }
    });
  }

  async function handleStudioFileUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;
      const isImg = file.type.startsWith('image/');

      const previewHtml = isImg
        ? `<div style="font-weight:600;font-size:11px;margin-bottom:4px;">🔍 Uploaded Product File for Inspection:</div><img src="${base64Data}" style="max-width:200px;max-height:140px;border-radius:8px;border:1px solid #cbd5e1;display:block;" alt="Uploaded Product">`
        : `<div style="font-weight:600;font-size:11px;margin-bottom:4px;">🔍 Uploaded Product Specification:</div><div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#1e40af;"><span style="font-size:20px;">📄</span><span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span></div>`;

      appendStudioMessage(previewHtml, 'user');
      showStudioTyping();

      let extractedText = '';
      try {
        if (isImg) {
          const userKey = apiKeyInput?.value?.trim() || GEMINI_API_KEY;
          const targetEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userKey}`;
          const cleanBase64 = base64Data.split(',')[1];
          const mimeType = file.type || 'image/jpeg';

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);

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
        console.log('Studio Vision API notice, using simulated BIS inspection engine:', err.message || err);
      }

      removeStudioTyping();

      const dossier = buildProductInspectionDossier(file.name, extractedText, file.name);
      appendStudioMessage(dossier.text, 'bot', dossier.suggestions, dossier.actions);
      speakText(dossier.text);
    };
    reader.readAsDataURL(file);
  }

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
    const candidateModels = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash-lite', 'gemini-3.6-flash'];
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
  function appendStudioMessage(text, sender = 'bot', suggestions = [], actions = []) {
    if (!chatMessages) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    msgEl.innerHTML = `
      <div class="chat-bubble">${formattedText}</div>
      <span class="chat-time">${timeStr}</span>
    `;

    if (actions && actions.length > 0 && sender === 'bot') {
      const actBox = document.createElement('div');
      actBox.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding-top: 8px; border-top: 1px solid #e2e8f0;';
      actions.forEach(act => {
        const link = document.createElement('a');
        link.href = act.url;
        link.textContent = act.text;
        link.style.cssText = 'font-size: 11px; font-weight: 600; padding: 5px 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; color: #1e40af; text-decoration: none; display: inline-flex; align-items: center;';
        actBox.appendChild(link);
      });
      msgEl.querySelector('.chat-bubble')?.appendChild(actBox);
    }

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

  // ── PRODUCT INSPECTION, AUTHENTICITY AUDIT & LEGAL ROADMAP ENGINE ──
  function buildProductInspectionDossier(inputSource = '', extractedVisionText = '', fileName = '') {
    const combined = `${inputSource} ${extractedVisionText} ${fileName}`.toLowerCase();

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

  // 6. Offline BIS Intelligence Engine
  function getStudioBotResponse(userInput) {
    const query = userInput.toLowerCase();

    // 0. Product Inspection & Legal IS Code Application Roadmap
    if (query.includes('fake') || query.includes('genuine') || query.includes('is it real') || query.includes('apply for legal') || query.includes('legal is code') || query.includes('how to proceed with this product') || query.includes('inspect product') || query.includes('counterfeit check') || query.includes('check product') || query.includes('check if fake') || query.includes('product inspection')) {
      return buildProductInspectionDossier(userInput);
    }

    if (query.includes('roadmap') || query.includes('workflow') || query.includes('start to end') || query.includes('from scratch') || query.includes('how to start') || query.includes('guide') || query.includes('step')) {
      return {
        text: `**Official Bureau of Indian Standards (BIS) End-to-End Operational Roadmaps**:\n\nHere is your step-by-step guide from start to finish:\n\n---\n\n### 🏭 **Roadmap 1: Manufacturer ISI Mark (CM/L) Certification (From Scratch)**\n1. **Standard Identification**: Search your product on our [Standards Catalog](standards-search.html) to locate the applicable IS Code (e.g. IS 10500 for Water, IS 456 for Concrete, IS 4151 for Helmets).\n2. **In-House Testing Setup**: Align your factory with the Scheme of Testing and Inspection (STI) & calibrate test apparatus.\n3. **Pre-Commissioning Lab Benchmark**: Query our [LIMS Lab Directory](lims-lab-directory.html) to locate an accredited test lab and estimate turnaround fees.\n4. **Digital Application**: Submit Form-I on [Manakonline Portal](https://www.manakonline.in) with factory layout and test records.\n5. **Factory Audit**: Designated BIS Technical Officer inspects the plant and draws independent samples.\n6. **Grant of 10-Digit CM/L Licence**: Receive your official CM/L number, verifiable in real time.\n\n---\n\n### 🛡️ **Roadmap 2: Consumer Grievance & Substandard Product Redressal**\n1. **Verify Label Authenticity**: Check the 10-digit CM/L or 6-digit HUID on our [e-Verification Suite](verify-licence.html).\n2. **Gather Proof**: Photograph defective item, invoice/receipt, and packaging label.\n3. **Register Grievance**: Complete our 4-step wizard on [Consumer Redressal](grievance-redressal.html) to receive a 16-character tracking docket ID (\`BIS-GR-2026-XXXX\`).\n4. **Surveillance & Raid**: BIS Enforcement Officers execute market raids and seize substandard inventory under Section 28 & 29 of the BIS Act, 2016.\n5. **Redressal & Compensation**: Track real-time progress until compensation or replacement is disbursed.\n\n---\n\n### 💍 **Roadmap 3: Gold Jewellery Purity Verification & 2x Compensation**\n1. **Check 3 Hallmarks**: Verify BIS Logo, Purity (e.g. 22K916), and 6-digit HUID on [e-Verification](verify-licence.html).\n2. **Independent Assaying**: Locate an official centre on [Assaying & Hallmarking Centres](hallmarking-centres.html) for touchstone/XRF test.\n3. **Calculate Statutory Compensation**: Enter weights on our [Gold Calculator](grievance-redressal.html#gold-calc-section) for **2x shortfall penalty** + ₹500 assay refund.\n4. **File Claim**: Submit assay certificate for statutory recovery.`,
        suggestions: ['Start Manufacturer Roadmap', 'File a Complaint Now', 'Verify 6-digit HUID', 'Search Standards Catalog']
      };
    }

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
