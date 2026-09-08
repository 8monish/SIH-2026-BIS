/**
 * BIS Portal — Dedicated ManakBot AI Studio Module
 * Fullscreen assistant with Real Vision OCR, Speech Recognition, Multilingual Support, and 1-Click Form Autofill.
 */

import { performClientOCR, parseExtractedText, generateAccurateInspectionReport } from './ocr-engine.js';
import { SUPPORTED_LANGUAGES, getCurrentLanguage, setLanguage, t, getVoiceLanguage, renderLanguageSelector, updatePageDOMTranslations, getLocalizedRAGResponse } from './i18n.js';
import { resolveExactBISQuery } from './bis-knowledge-engine.js';
import { getActiveGeminiApiKey, saveActiveGeminiApiKey, getActiveGeminiModel, saveActiveGeminiModel, callLiveGeminiAPI } from './gemini-bridge.js';

export function initManakBotPage() {
  const chatContainer = document.querySelector('.studio-chat-container');
  const chatMessages = document.getElementById('studio-chat-messages');
  const chatInput = document.getElementById('studio-chat-input');
  const sendBtn = document.getElementById('btn-studio-send');
  const micBtn = document.getElementById('btn-studio-mic');
  const uploadBtn = document.getElementById('btn-studio-upload');
  const fileInput = document.getElementById('studio-file-input');
  const cameraBtn = document.getElementById('btn-studio-camera');
  const cameraInput = document.getElementById('studio-camera-input');
  const attachmentPreview = document.getElementById('studio-attachment-preview');
  const previewImg = document.getElementById('studio-preview-img');
  const previewName = document.getElementById('studio-preview-name');
  const previewSize = document.getElementById('studio-preview-size');
  const previewRemoveBtn = document.getElementById('studio-preview-remove');

  // Studio Camera Modal Elements
  const cameraModal = document.getElementById('studio-camera-modal');
  const cameraBackdrop = document.getElementById('studio-camera-backdrop');
  const cameraVideo = document.getElementById('studio-camera-video');
  const cameraCanvas = document.getElementById('studio-camera-canvas');
  const cameraCloseBtn = document.getElementById('studio-camera-close');
  const cameraCaptureBtn = document.getElementById('studio-camera-capture');
  const cameraSwitchBtn = document.getElementById('studio-camera-switch');
  const cameraFilesBtn = document.getElementById('studio-camera-files');

  const audioToggle = document.getElementById('toggle-speech-synthesis');
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const modelSelect = document.getElementById('studio-gemini-model-select');
  const customModelContainer = document.getElementById('studio-custom-model-container');
  const customModelInput = document.getElementById('studio-custom-model-input');
  const clearChatBtn = document.getElementById('btn-clear-chat');
  const exportChatBtn = document.getElementById('btn-export-chat');

  if (apiKeyInput) {
    const activeKey = getActiveGeminiApiKey();
    if (activeKey) apiKeyInput.value = activeKey;
    apiKeyInput.addEventListener('input', () => {
      saveActiveGeminiApiKey(apiKeyInput.value.trim());
    });
  }

  // Gemini Model Selector & Custom Model input handling in Studio
  function refreshStudioModelUI() {
    if (!modelSelect) return;
    const currentModel = getActiveGeminiModel();
    const options = Array.from(modelSelect.querySelectorAll('option'));
    const isPreset = options.some(opt => opt.value === currentModel);

    if (isPreset) {
      modelSelect.value = currentModel;
      if (customModelContainer) customModelContainer.style.display = 'none';
    } else {
      modelSelect.value = 'custom';
      if (customModelContainer) customModelContainer.style.display = 'block';
      if (customModelInput) customModelInput.value = currentModel;
    }
  }

  if (modelSelect) {
    refreshStudioModelUI();

    modelSelect.addEventListener('change', () => {
      if (modelSelect.value === 'custom') {
        if (customModelContainer) customModelContainer.style.display = 'block';
        if (customModelInput) {
          customModelInput.focus();
          if (customModelInput.value.trim()) {
            saveActiveGeminiModel(customModelInput.value.trim());
          }
        }
      } else {
        if (customModelContainer) customModelContainer.style.display = 'none';
        saveActiveGeminiModel(modelSelect.value);
      }
    });

    if (customModelInput) {
      customModelInput.addEventListener('input', () => {
        const val = customModelInput.value.trim();
        if (val && modelSelect.value === 'custom') {
          saveActiveGeminiModel(val);
        }
      });
    }

    window.addEventListener('gemini-model-changed', () => {
      refreshStudioModelUI();
    });
  }

  let recognition = null;
  let isListening = false;
  let conversationHistory = [];
  let pendingAttachment = null;
  let cameraStream = null;
  let currentFacingMode = 'environment';

  // Render language selectors
  renderLanguageSelector('studio-lang-container');
  renderLanguageSelector('topbar-lang-container');
  updatePageDOMTranslations();

  // Listen for language changes
  window.addEventListener('bis_language_changed', (e) => {
    const newLang = e.detail.lang;
    if (chatInput) chatInput.placeholder = t('chatPlaceholder', newLang);
    if (recognition) recognition.lang = getVoiceLanguage(newLang);
  });

  // ── ATTACHMENT PREVIEW CONTROLS ──
  function showStudioAttachment(file, dataUrl) {
    pendingAttachment = { file, dataUrl, name: file.name, size: file.size };
    if (attachmentPreview) {
      attachmentPreview.style.display = 'flex';
      if (previewImg) {
        if (file.type && file.type.startsWith('image/')) {
          previewImg.src = dataUrl;
          previewImg.style.display = 'block';
        } else {
          previewImg.style.display = 'none';
        }
      }
      if (previewName) previewName.textContent = file.name;
      if (previewSize) {
        const kb = (file.size / 1024).toFixed(1);
        previewSize.textContent = `${kb} KB • Ready for BIS Forensic Inspection`;
      }
    }
  }

  function clearStudioAttachment() {
    pendingAttachment = null;
    if (attachmentPreview) {
      attachmentPreview.style.display = 'none';
      if (previewImg) previewImg.src = '';
    }
    if (fileInput) fileInput.value = '';
    if (cameraInput) cameraInput.value = '';
  }

  if (previewRemoveBtn) {
    previewRemoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearStudioAttachment();
    });
  }

  function handleStudioFileSelected(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      showStudioAttachment(file, e.target.result);
      if (chatInput) chatInput.focus();
    };
    reader.readAsDataURL(file);
  }

  // ── STUDIO CAMERA SCANNER MODAL CONTROLS ──
  async function openStudioCamera() {
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
      await startStudioCameraStream();
    }
  }

  async function startStudioCameraStream() {
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
      console.warn('Studio camera stream error:', err);
      closeStudioCamera();
      if (cameraInput) {
        cameraInput.click();
      } else {
        alert('Camera access could not be initialized. Please check permissions or upload an existing photo.');
      }
    }
  }

  function closeStudioCamera() {
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

  async function captureStudioCameraSnapshot() {
    if (!cameraVideo) {
      closeStudioCamera();
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
    const photoFile = new File([blob], `bis_studio_camera_${nowStr}.jpg`, { type: 'image/jpeg' });

    closeStudioCamera();
    showStudioAttachment(photoFile, dataUrl);
  }

  function switchStudioCamera() {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    startStudioCameraStream();
  }

  // Camera event triggers
  if (cameraBtn) {
    cameraBtn.addEventListener('click', () => openStudioCamera());
  }
  if (cameraCloseBtn) {
    cameraCloseBtn.addEventListener('click', () => closeStudioCamera());
  }
  if (cameraBackdrop) {
    cameraBackdrop.addEventListener('click', () => closeStudioCamera());
  }
  if (cameraCaptureBtn) {
    cameraCaptureBtn.addEventListener('click', () => captureStudioCameraSnapshot());
  }
  if (cameraSwitchBtn) {
    cameraSwitchBtn.addEventListener('click', () => switchStudioCamera());
  }
  if (cameraFilesBtn) {
    cameraFilesBtn.addEventListener('click', () => {
      closeStudioCamera();
      if (fileInput) fileInput.click();
    });
  }
  if (cameraInput) {
    cameraInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleStudioFileSelected(e.target.files[0]);
      }
    });
  }

  // File upload trigger
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleStudioFileSelected(e.target.files[0]);
      }
    });
  }

  // Drag and drop support
  if (chatContainer) {
    chatContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      chatContainer.style.borderColor = 'var(--color-primary, #003082)';
    });
    chatContainer.addEventListener('dragleave', () => {
      chatContainer.style.borderColor = '';
    });
    chatContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      chatContainer.style.borderColor = '';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleStudioFileSelected(e.dataTransfer.files[0]);
      }
    });
  }

  // Paste image directly into chat input
  if (chatInput) {
    chatInput.addEventListener('paste', (e) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            if (blob) {
              const pastedFile = new File([blob], `pasted_studio_${Date.now()}.png`, { type: blob.type });
              handleStudioFileSelected(pastedFile);
              e.preventDefault();
              break;
            }
          }
        }
      }
    });
  }

  async function handleStudioFileUpload(file, userNote = '', cachedDataUrl = null) {
    if (!file) return;

    const isImg = file.type && file.type.startsWith('image/');

    const processData = async (base64Data) => {
      // Show user message with file preview
      const previewHtml = isImg
        ? `<div style="font-weight:600;font-size:11px;margin-bottom:4px;color:var(--color-primary, #003082);">📎 Attached Image:</div><img src="${base64Data}" style="max-width:240px;max-height:160px;border-radius:8px;border:1.5px solid var(--color-primary-100, #d0def2);display:block;box-shadow:0 2px 6px rgba(0,48,130,0.12);" alt="Uploaded file">`
        : `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--color-primary, #003082);padding:8px 12px;background:var(--color-primary-50, #e8eef8);border-radius:8px;border:1px solid var(--color-primary-100, #d0def2);margin-top:4px;"><span style="font-size:22px;">📄</span><span><strong>${file.name}</strong> · ${(file.size / 1024).toFixed(1)} KB</span></div>`;

      const userNoteHtml = userNote ? `<div style="margin-bottom:6px;font-size:13px;line-height:1.4;">${userNote}</div>` : '';
      appendStudioMessage(`${userNoteHtml}${previewHtml}`, 'user');
      showStudioTyping();

      // Send file directly to Gemini — no OCR, no preprocessing
      const apiKey = getActiveGeminiApiKey();
      if (apiKey) {
        const primaryModel = getActiveGeminiModel() || 'gemini-2.0-flash';
        const candidateModels = [primaryModel, 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']
          .filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

        const fileMimeType = file.type || (isImg ? 'image/png' : 'application/octet-stream');
        const pureBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

        // User's message is the prompt; if none, ask Gemini to describe it
        const userPromptText = userNote || 'What is this file? Describe what it contains and what it is about.';

        const parts = [
          { inlineData: { mimeType: fileMimeType, data: pureBase64 } },
          { text: userPromptText }
        ];

        for (const model of candidateModels) {
          try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal,
              body: JSON.stringify({ contents: [{ role: 'user', parts }] })
            });

            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (replyText && replyText.trim()) {
                removeStudioTyping();
                appendStudioMessage(`${replyText.trim()}\n\n<div class="model-badge">✨ Generated by Google Gemini AI (${model})</div>`, 'bot');
                speakText(replyText.trim());
                return;
              }
      }

      // === Offline Fallback: Clean natural file summary ===
      // Extract text content for non-image files
      let extractedText = '';
      try {
        if (!isImg) {
          extractedText = await file.text();
        } else {
          const ocrResult = await performClientOCR(file, base64Data);
          extractedText = ocrResult.text || '';
        }
      } catch (_) { extractedText = ''; }

      removeStudioTyping();

      // Build a clean, natural summary card
      const sizeKb = (file.size / 1024).toFixed(1);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const sizeDisplay = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${sizeKb} KB`;
      const ext = file.name.split('.').pop().toUpperCase();
      const fileTypeLabel = isImg ? `${ext} Image` : `${ext} Document`;

      // Snippet of extracted text for preview
      const textSnippet = extractedText.trim().slice(0, 600).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const hasText = textSnippet.length > 10;

      // If user asked something, try to answer from extracted text
      let userNoteAnswerHtml = '';
      if (userNote && hasText) {
        userNoteAnswerHtml = `
          <div style="margin-top:12px;padding:10px 14px;background:#f0f7ff;border-left:4px solid #3b82f6;border-radius:8px;font-size:13px;color:#1e3a5f;line-height:1.6;">
            <strong style="display:block;margin-bottom:4px;">💬 Regarding your question:</strong>
            Based on the file content, here is what I found — ${textSnippet.slice(0, 300)}${textSnippet.length > 300 ? '…' : ''}
          </div>`;
      }

      const summaryHtml = `
        <div style="font-family:inherit;font-size:13px;line-height:1.6;color:#1e293b;">
          <div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:8px;">
            ${isImg ? '🖼️' : '📄'} ${file.name}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
            <span style="background:#e8eef8;color:#003082;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;">📁 ${fileTypeLabel}</span>
            <span style="background:#f1f5f9;color:#475569;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;">📏 ${sizeDisplay}</span>
            ${hasText ? `<span style="background:#ecfdf5;color:#065f46;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;">✅ Text Extracted</span>` : ''}
          </div>

          ${hasText ? `
          <div style="margin-bottom:12px;">
            <div style="font-weight:600;font-size:12px;color:#475569;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">File Contents Preview</div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:12px;color:#334155;white-space:pre-wrap;max-height:140px;overflow-y:auto;font-family:monospace;line-height:1.5;">${textSnippet}${extractedText.trim().length > 600 ? '\n…' : ''}</div>
          </div>` : `
          <div style="padding:10px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#64748b;margin-bottom:12px;">
            ${isImg ? '🖼️ Image file — no readable text detected. Add a Gemini API key for full AI-powered image understanding.' : '📄 Binary or unsupported format — no text content could be extracted.'}
          </div>`}

          ${userNoteAnswerHtml}

          <div style="margin-top:10px;font-size:12px;color:#94a3b8;border-top:1px dashed #e2e8f0;padding-top:8px;">
            💡 Add a Gemini API key in the sidebar for full AI-powered multimodal file analysis.
          </div>
        </div>`;

      appendStudioMessage(summaryHtml, 'bot', [
        'What is this file about?',
        'Summarize the key points',
        'Translate this document'
      ]);
      speakText(`File received: ${file.name}. ${hasText ? 'Text content has been extracted.' : 'No text could be extracted from this file.'}`);
    };

    if (cachedDataUrl) {
      processData(cachedDataUrl);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => processData(e.target.result);
      reader.readAsDataURL(file);
    }
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
      const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/[*_#`[\]()]/g, '').replace(/https?:\/\/\S+/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = getVoiceLanguage(getCurrentLanguage());
      window.speechSynthesis.speak(utterance);
    }
  }

  // 3. Message Handling
  async function handleSendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();

    if (pendingAttachment) {
      const { file, dataUrl } = pendingAttachment;
      clearStudioAttachment();
      chatInput.value = '';
      await handleStudioFileUpload(file, text, dataUrl);
      return;
    }

    if (!text) return;

    appendStudioMessage(text, 'user');
    chatInput.value = '';

    showStudioTyping();

    let botReply = '';
    let suggestions = [];
    let actions = [];

    try {
      const liveRes = await callLiveGeminiAPI(text, {
        lang: currentLang,
        langObj,
        history: conversationHistory
      });

      if (liveRes.success && liveRes.text) {
        botReply = `${liveRes.text}\n\n<div class="model-badge">✨ Generated by Google Gemini AI (${liveRes.model})</div>`;
        const responseObj = getStudioBotResponse(text);
        suggestions = responseObj.suggestions;
        actions = responseObj.actions || [];
      } else {
        throw new Error(liveRes.error || 'Gemini API not active');
      }
    } catch (err) {
      console.log('Gemini API notice, using BIS domain engine:', err.message || err);
      const responseObj = getStudioBotResponse(text);
      botReply = responseObj.text;
      suggestions = responseObj.suggestions;
      actions = responseObj.actions || [];
    }

    setTimeout(() => {
      removeStudioTyping();
      appendStudioMessage(botReply, 'bot', suggestions, actions);
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

  // 5. Append Message in Studio
  function appendStudioMessage(text, sender = 'bot', suggestions = [], actions = []) {
    if (!chatMessages) return null;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let formattedText = text;
    if (typeof text === 'string' && !text.trim().startsWith('<div')) {
      formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }

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
        link.style.cssText = 'font-size: 11px; font-weight: 600; padding: 5px 10px; background: var(--color-primary-50, #e8eef8); border: 1px solid var(--color-primary-100, #d0def2); border-radius: 6px; color: var(--color-primary, #003082); text-decoration: none; display: inline-flex; align-items: center;';
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

    // No longer binds autofill button listeners — extracted details shown as copy cards

    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversationHistory.push({ sender, text, time: timeStr });
    return msgEl;
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

  // 6. Deep Grounded BIS Intelligence Engine
  function getStudioBotResponse(userInput) {
    const currentLang = getCurrentLanguage();
    const query = (userInput || '').toLowerCase();

    // Check if user uploaded text has parsed licence details
    const parsed = parseExtractedText(userInput, 'Text Query');
    if ((query.includes('fake') || query.includes('inspect') || query.includes('பரிசோதனை')) && (parsed.standard || parsed.cml || parsed.huid || parsed.crs)) {
      if (currentLang !== 'en') {
        return getLocalizedRAGResponse('inspection', { parsed }, currentLang);
      }
      return {
        text: `**BIS Statutory Inspection & Verification Analysis**:\n\n` +
          (parsed.product ? `• **Identified Category**: **${parsed.product}**\n` : '') +
          (parsed.brand ? `• **Brand / Manufacturer**: ${parsed.brand}\n` : '') +
          (parsed.standard ? `• **Statutory Standard**: **${parsed.standard}** (*${parsed.standardTitle || 'Indian Standard'}*)\n` : '') +
          (parsed.cml ? `• **Claimed CM/L Licence**: \`${parsed.cml}\`\n` : '') +
          (parsed.huid ? `• **Claimed Hallmark HUID**: \`${parsed.huid}\`\n` : '') +
          `\nUse the buttons below to verify this licence directly in the e-Verification registry, search the standards catalog, or submit a formal grievance.`,
        suggestions: ['Verify Licence on Portal', 'Search Standards Catalog', 'File Consumer Grievance'],
        actions: [
          { text: '🔍 Verify Licence', url: `verify-licence.html?type=${parsed.huid ? 'huid' : 'isi'}&code=${encodeURIComponent(parsed.cml || parsed.huid || '')}` },
          { text: '📖 Standards Catalog', url: `standards-search.html?q=${encodeURIComponent((parsed.standard || '').split(':')[0])}` },
          { text: '📝 File Grievance', url: 'grievance-redressal.html' }
        ]
      };
    }

    // Resolve exact statutory domain question using deep BIS engine
    return resolveExactBISQuery(userInput, currentLang);
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
