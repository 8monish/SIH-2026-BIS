# BIS Intelligent Compliance Assistant - Architecture Blueprint

> **SIH 2026 Problem Statement ID:** SIH26107  
> **Title:** AI-Powered Intelligent Assistance for Indian Standards and BIS Services for Industries and Consumers  
> **Theme:** Smart Automation (Software)

---

## 🧭 High-Level System Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │                 User Clients                 │
                               │  (Industry / MSMEs / Consumers / Lab Reps)   │
                               └──────────────────────┬───────────────────────┘
                                                      │
                                                      ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   Frontend Web App (React 19 + TypeScript + Vite)                       │
 ├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌────────────────────────┐  ┌─────────────┐  │
 │  │   AI Compliance Chat    │  │   Standards Explorer    │  │   Compliance Roadmap   │  │ Lab Finder  │  │
 │  │  (RAG / Stream / Cit.)  │  │   (Search / QCO Filter) │  │  (5-Phase Visual Flow) │  │ & Readiness │  │
 │  └───────────┬─────────────┘  └────────────┬────────────┘  └───────────┬────────────┘  └──────┬──────┘  │
 │              │                             │                           │                      │         │
 │              └───────────────────────┬─────┴───────────────────────────┴──────────────────────┘         │
 │                                      ▼                                                                  │
 │                        ┌───────────────────────────┐                                                    │
 │                        │ State / Context & Hooks   │                                                    │
 │                        └─────────────┬─────────────┘                                                    │
 │                                      ▼                                                                  │
 │                        ┌───────────────────────────┐                                                    │
 │                        │  AI Assistant RAG Service │                                                    │
 │                        │ (Semantic Score + Gemini) │                                                    │
 │                        └─────────────┬─────────────┘                                                    │
 └──────────────────────────────────────┼──────────────────────────────────────────────────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
       ┌────────────────────────────────┐   ┌────────────────────────────────┐
       │   FastAPI Backend (Optional)   │   │  Curated BIS Datasets / Cache  │
       │   - PyMuPDF / Vector Store     │   │  - IS Standards & Clauses      │
       │   - Gemini 2.5 / LLM RAG       │   │  - QCO Gazette Notifications   │
       │   - PDF Audit Report Generator │   │  - Lab Directory (NABL/BIS)    │
       └────────────────────────────────┘   └────────────────────────────────┘
```

---

## 📁 Directory Structure & File Map

```
SIH-2026-BIS/
├── ARCHITECTURE.md                  # 📌 System blueprint, data flow & token-saving guide
├── README.md                        # 📌 Project overview, setup & SIH details
├── index.html                       # 📌 HTML entry point with BIS branding & fonts
├── package.json                     # 📌 Node dependencies & scripts
├── tailwind.config.js               # 📌 Color tokens, animations & theme rules
├── vite.config.ts                   # 📌 Vite configuration & alias definitions
│
├── src/
│   ├── main.tsx                     # 🚀 Application mounting point
│   ├── App.tsx                      # 🧩 Root component with responsive navigation
│   ├── index.css                    # 🎨 Global CSS, glassmorphism tokens, keyframe animations
│   │
│   ├── types/
│   │   └── bis.ts                   # 🏷️ TypeScript types (Standards, Labs, Schemes, Chat, Assessment)
│   │
│   ├── data/
│   │   ├── standardsData.ts         # 📚 Curated Indian Standards (IS 10500, IS 14543, IS 13252, etc.)
│   │   ├── labsData.ts              # 🔬 BIS/NABL accredited testing laboratories directory
│   │   ├── schemesData.ts           # 📜 Certification schemes (ISI, CRS, Hallmarking, FMCS, Eco Mark)
│   │   └── sampleQueries.ts         # 💡 Suggested plain-language prompt chips for users
│   │
│   ├── services/
│   │   ├── aiAssistantService.ts    # 🤖 Intelligent RAG engine with citation generation & query routing
│   │   └── geminiClient.ts          # ⚡ Direct Gemini API integration connector (configurable)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # 🇮🇳 Official BIS header, emblem, live QCO ticker, theme switcher
│   │   │   ├── Navigation.tsx       # 🗂️ Smooth view tab switcher (Chat, Standards, Roadmap, Labs, Gap)
│   │   │   └── Footer.tsx           # 📄 BIS portal links, disclaimer, SIH 2026 metadata
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatAssistant.tsx    # 💬 Core conversational AI with streaming, citations & quick chips
│   │   │   ├── MessageItem.tsx      # 🗨️ Rich message card (bot/user, markdown, action badges, sources)
│   │   │   └── CitationModal.tsx    # 📖 Grounded BIS document & clause viewer modal
│   │   │
│   │   ├── standards/
│   │   │   ├── StandardsExplorer.tsx# 🔍 Search, category filter & QCO matrix table
│   │   │   └── StandardDetailModal.tsx # 📑 Clause-by-clause, testing parameters & fee schedule
│   │   │
│   │   ├── roadmap/
│   │   │   └── ComplianceRoadmap.tsx# 🛣️ 5-phase interactive certification journey & timeline
│   │   │
│   │   ├── labs/
│   │   │   └── LabFinder.tsx        # 🧪 Location/state lab locator with testing scope search
│   │   │
│   │   └── gap-analysis/
│   │       └── GapAnalysisModal.tsx # 📊 MSME compliance self-assessment checklist & readiness score
│   │
│   └── hooks/
│       ├── useChat.ts               # 🔄 Custom hook managing chat history, streaming & state
│       └── useTheme.ts              # 🌓 Dark/Light mode management
│
└── backend/                         # 🐍 Python FastAPI Backend (Modular & RAG Ready)
    ├── main.py                      # FastAPI server with /api/query, /api/standards, /api/labs
    ├── requirements.txt             # Python requirements (FastAPI, uvicorn, google-genai)
    └── rag_pipeline.py              # Extensible LangChain / PyMuPDF vector RAG blueprint
```

---

## 🔑 Key Domain Models (`src/types/bis.ts`)

1. **`IndianStandard`**: Contains `isNumber`, `title`, `category`, `scheme`, `isMandatory`, `qcoNotification`, `scope`, `keyClauses`, `requiredTests`, `estimatedFeeRange`.
2. **`CertificationScheme`**: Contains `id`, `name`, `schemeCode` (e.g., Scheme-I ISI Mark, Scheme-II CRS), `description`, `applicableProducts`, `processSteps`.
3. **`TestingLab`**: Contains `id`, `name`, `type` (Central / Regional / NABL), `city`, `state`, `recognizedStandards`, `contactEmail`, `turnaroundDays`.
4. **`ChatMessage`**: Contains `id`, `sender` ('user' | 'assistant' | 'system'), `text`, `timestamp`, `citations`, `suggestedActions`, `structuredData`.
5. **`GapAssessment`**: Contains checklist question items, compliance weights, and auto-generated readiness score (0-100%).

---

## ⚡ Token Optimization Strategy

When querying or updating this project in subsequent prompts:
- Refer to specific files directly (e.g. `src/services/aiAssistantService.ts` for AI logic, `src/data/standardsData.ts` for standards).
- Avoid re-reading large dataset files if only tweaking UI styles in `src/components/`.
- All interfaces are strictly typed in `src/types/bis.ts`.
