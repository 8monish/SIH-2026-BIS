# BIS Intelligent Compliance Assistant

> **Smart India Hackathon 2026 — Problem Statement ID: SIH26107**  
> *AI-Powered Intelligent Assistance for Indian Standards and BIS Services for Industries and Consumers*

An intelligent, web-based platform for the Bureau of Indian Standards (BIS), featuring automated e-verification, Indian Standards exploration, consumer grievance redressal, gold hallmarking compensation calculations, and a RAG-grounded Multimodal AI Co-Pilot (ManakBot AI).

---

## ⚡ Quick Start

Run the project immediately using the launcher scripts:

### Linux / macOS
```bash
./run.sh
```

### Windows
```cmd
run.bat
```

The launcher will start the static web server at **`http://localhost:8080`** (and optional FastAPI backend at `http://localhost:8000`), then automatically open the portal in your default browser.

---

## 🛠️ Portal Features & Modules

| Module | File | Description |
| :--- | :--- | :--- |
| **ManakBot AI Co-Pilot** | [`manak-bot.html`](manak-bot.html) / [`assets/js/chatbot.js`](assets/js/chatbot.js) | Fullscreen & sidebar AI co-pilot with RAG knowledge search (IS Codes & BIS Act 2016), Multimodal Vision OCR receipt auto-filling, Speech-to-Text, and voice readout. |
| **e-Verification Suite** | [`verify-licence.html`](verify-licence.html) | Instant verification for ISI Marks (CM/L), Gold Hallmarking (6-digit HUID), CRS Electronics (R-Number), and Foreign Manufacturers (FMCS) with live camera QR scanner. |
| **Indian Standards Catalog** | [`standards-search.html`](standards-search.html) | Catalog of 22,000+ IS specifications with technical division filters, Quality Control Order (QCO) tags, and document clause preview modal. |
| **Consumer Grievances** | [`grievance-redressal.html`](grievance-redressal.html) | 4-step complaint registration wizard, live investigation stepper timeline, and statutory gold purity compensation calculator under BIS Act 2016. |
| **Hallmarking Directory** | [`hallmarking-centres.html`](hallmarking-centres.html) | Filterable directory of recognized Assaying & Hallmarking Centres (AHC) across states and pincodes. |
| **LIMS Laboratory Network** | [`lims-lab-directory.html`](lims-lab-directory.html) | Directory of Central, Regional, and NABL-accredited labs with sample testing fee estimator and turnaround schedules. |

---

## 💻 Manual Setup

### 1. Web Portal Frontend
```bash
# Serve static site on port 8080
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### 2. FastAPI Backend & MongoDB (Optional)
```bash
cd backend

# Create & activate environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies & start API
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
View interactive Swagger API docs at `http://localhost:8000/docs`.

---

## 📂 Project Structure

```
.
├── assets/
│   ├── css/          # Modular CSS tokens, layout, chatbot, and theme variables
│   ├── images/       # Official BIS branding assets and logos
│   └── js/           # Actuators, RAG search engine, vision OCR, and page modules
├── backend/          # FastAPI REST endpoints, MongoDB database schemas, and models
├── docs/             # Technical knowledge base and documentation
├── grievance-redressal.html
├── hallmarking-centres.html
├── index.html
├── lims-lab-directory.html
├── manak-bot.html
├── standards-search.html
├── verify-licence.html
├── run.sh            # Linux / macOS launcher script
└── run.bat           # Windows launcher batch script
```

---

## 📜 License & Branding
Official Bureau of Indian Standards (BIS) colors (`#003082` Royal Blue and `#f26522` Saffron) and emblem specifications are strictly maintained across all user interface components.
