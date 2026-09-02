# BIS Portal — System Architecture & Knowledge Manual

> **Purpose**: Single source of truth for the SIH-2026-BIS codebase. Read this document to understand the entire architecture, design tokens, data flows, and AI integration blueprints without re-reading the entire source tree.

---

## 1. Project Overview & Context

- **Entity**: Bureau of Indian Standards (BIS) — Ministry of Consumer Affairs, Food & Public Distribution, Govt. of India.
- **Hackathon Context**: Smart India Hackathon (SIH 2026).
- **Core Objective**: Elevate the government portal with a modern, accessible, modular codebase, smooth 60fps micro-animations, fast load times, and an intelligent AI assistant (**ManakBot**) while strictly preserving the trusted official Navy (`#003082`) & Saffron (`#f26522`) color theme.

---

## 2. Directory & File Organization

```
SIH-2026-BIS/
├── index.html                  # Single entry-point, accessible, semantic HTML5
├── README.md                   # Quickstart guide
├── docs/
│   └── KNOWLEDGE_BASE.md       # Architecture & Token saving manual (this file)
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design tokens (colors, spacing, shadows, radius, z-indices)
│   │   ├── base.css            # Typography, CSS reset, layout utilities, responsive breakpoints
│   │   ├── layout.css          # Topbar, sticky header, mega dropdowns, hero, footer, search overlay
│   │   ├── components.css      # Reusable cards, buttons, badges, ticker marquee, form elements
│   │   ├── animations.css      # Keyframes, scroll-reveal classes, hover micro-interactions
│   │   └── chatbot.css         # ManakBot AI widget UI, floating triggers, glassmorphism panel
│   │
│   └── js/
│       ├── main.js             # Application bootstrapper
│       ├── navigation.js       # Sticky nav, mobile drawer, search modal, back-to-top
│       ├── carousel.js         # Banner slider with touch gestures & autoplay
│       ├── animations.js       # IntersectionObserver scroll-reveal & animated stat counters
│       └── chatbot.js          # Rule-based BIS intelligence engine & Gemini API plug-in
```

---

## 3. Design System & Tokens Reference (`variables.css`)

### Color Palette
- `--color-primary`: `#003082` (BIS Navy Blue)
- `--color-primary-dark`: `#001f57` (Deep Navy)
- `--color-primary-light`: `#1a4a9a` (Soft Navy)
- `--color-primary-50`: `#e8eef8` (Navy Tint for active states)
- `--color-accent`: `#f26522` (BIS Saffron/Orange Accent)
- `--color-accent-dark`: `#d4531a` (Deep Orange)
- `--color-saffron`: `#FF9933` (Tricolor Saffron)
- `--color-green-india`: `#138808` (Tricolor Green)
- `--color-bg`: `#f5f7fa` (Subtle off-white background)
- `--color-surface`: `#ffffff` (Pure white card background)
- `--color-text`: `#1a1a2e` (High contrast dark slate text)
- `--color-text-muted`: `#6b7280` (Medium gray secondary text)

### Typography
- Base font family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Modular scale from `--text-xs` (12px) to `--text-5xl` (48px)

---

## 4. Key Functional Modules

### A. Navigation & Topbar (`navigation.js` + `layout.css`)
- **Accessibility Topbar**: Language switcher (English / हिंदी), screen reader accessibility, toll-free helpdesk link.
- **Sticky Navbar**: Blurs on scroll via `backdrop-filter`, includes hover mega-menus for "About Us", "Standards", "Conformity Assessment", and "Consumer Affairs".
- **Search Modal**: Instant search dialog accessible via top search button or shortcut.
- **Mobile Drawer**: Responsive accordion-style drawer with smooth transitions.

### B. Interactive Banner Carousel (`carousel.js`)
- Auto-advances every 6 seconds.
- Pauses on user hover and supports horizontal touch swipe on mobile devices.
- Keyboard navigation friendly.

### C. Live Marquee Ticker (`components.css`)
- Displays real-time gazette notifications, draft standards for public review, and World Standards Day updates.
- Pauses automatically when hovered.

### D. Animated Stats Counters (`animations.js`)
- Animates numbers smoothly using cubic easing as soon as they scroll into view:
  - **22,000+** Indian Standards Published
  - **41,000+** Active Product Certification Licenses
  - **1,500+** Gold & Silver Hallmarking Centers
  - **8** Regional & Central Laboratories

### E. AI Assistant: ManakBot (`chatbot.js` + `chatbot.css`)
- Floating circular button with pulsing saffron aura.
- Sliding glassmorphic conversation panel with typing indicator simulation.
- Embedded intelligence on:
  1. ISI Mark Certification & simplified application process.
  2. 6-digit HUID Gold Hallmarking verification on BIS CARE app.
  3. Indian Standards search & free viewing guidelines.
  4. Consumer complaint filing & redressal portals.
  5. Foreign Manufacturers Certification Scheme (FMCS).
  6. Laboratory Information Management System (LIMS).
- Interactive quick-action chips for 1-click query execution.
- **Gemini API Blueprint**: Includes pre-configured `callGeminiAPI` scaffolding ready for immediate backend or client-side connection.

---

## 5. Blueprint: Connecting Google Gemini API

When you are ready to enable live Gemini AI:
1. Open `assets/js/chatbot.js`.
2. Replace the heuristic `generateBotResponse(text)` with:
```javascript
async function fetchGeminiResponse(userPrompt) {
  const GEMINI_API_KEY = "YOUR_API_KEY"; // Or route through your backend proxy
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const systemContext = "You are ManakBot, the official AI assistant of Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, India. Answer concisely, accurately, and politely regarding Indian standards, ISI mark, Hallmarking, FMCS, and consumer rights.";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${systemContext}\n\nUser Question: ${userPrompt}` }]
      }]
    })
  });
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}
```

---

## 6. How to Run & Verify

Run any static HTTP server from the root directory:
```bash
# Python 3
python3 -m http.server 8080

# Or Node.js
npx serve .
```
Visit `http://localhost:8080`.
