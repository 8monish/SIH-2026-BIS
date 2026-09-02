# 🇮🇳 BIS Intelligent Compliance Assistant | SIH 2026

**Smart India Hackathon 2026 — Problem Statement ID: SIH26107**  
**Title:** *AI-Powered Intelligent Assistance for Indian Standards and BIS Services for Industries and Consumers*  
**Theme:** Smart Automation | **Category:** Software

---

## 🌟 Overview

The **BIS Intelligent Compliance Assistant** is a unified, AI-driven platform designed to simplify Indian Standards (IS), mandatory Quality Control Orders (QCOs), and certification pathways for MSMEs, manufacturers, consumers, and testing laboratories.

### 💡 Core Capabilities
- 🤖 **Conversational AI Compliance Assistant**: Plain-language query resolution with verifiable citations directly linked to official BIS gazette notifications and standard clauses.
- 🔍 **Product-to-Standard Matrix Explorer**: Instant mapping from consumer/industrial products to mandatory IS codes, scopes, and testing parameters.
- 🛣️ **Interactive 5-Phase Compliance Roadmap**: Step-by-step guidance from documentation and factory audits to sample testing and Grant of License (GoL).
- 🧪 **Accredited Testing Labs Directory**: Location and capability-based discovery for BIS Central, Regional, and NABL-accredited test facilities.
- 📊 **MSME Compliance Gap Analyzer**: Interactive self-assessment tool evaluating factory readiness, missing documentation, and estimated timelines.

---

## 🚀 Quick Start

### Frontend (React 19 + TypeScript + Vite)

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Backend (Python FastAPI - Optional / RAG Service)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 🏛️ Architecture & Token Guide

For a full blueprint of modules, data flows, and token-saving tips, refer to [ARCHITECTURE.md](file:///home/monish/Projects/SIH-2026-BIS/ARCHITECTURE.md).