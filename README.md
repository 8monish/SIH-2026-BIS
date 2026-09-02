# 🇮🇳 BIS Intelligent Compliance Assistant | SIH 2026

> **Smart India Hackathon 2026 — Problem Statement ID: SIH26107**  
> **Title:** *AI-Powered Intelligent Assistance for Indian Standards and BIS Services for Industries and Consumers*  
> **Theme:** Smart Automation | **Category:** Software

---

## 🏛️ Project Features & Capabilities

- **Strict Brand Integrity**: Preserves official BIS Royal Blue (`#003082`) and Saffron (`#f26522`) color identity.
- **e-Verification Suite (`verify-licence.html`)**: Instant authentication of ISI Mark (CM/L), Gold Hallmarking (6-digit HUID), CRS Electronics (R-Number), and Foreign Manufacturers (FMCS) with live QR camera simulator and printable digital certificates.
- **Indian Standards Catalog (`standards-search.html`)**: Interactive browser for 22,000+ IS Codes with division filtering, mandatory QCO tagging, and in-browser standard previewer modal.
- **Consumer Grievance Redressal (`grievance-redressal.html`)**: 4-step complaint registration wizard, live investigation stepper timeline, and statutory gold purity compensation calculator (BIS Act 2016).
- **Assaying & Hallmarking Directory (`hallmarking-centres.html`)**: Directory of recognized AHC centres and certified jewellers.
- **Laboratory Network LIMS (`lims-lab-directory.html`)**: Apex Central and Regional Testing Labs directory with sample test fee estimator and turnaround time schedule.
- **ManakBot AI Studio (`manak-bot.html`)**: Fullscreen conversational AI assistant with Speech-to-Text, voice readout, transcript exporter, and Google Gemini API live bridge.
- **Agentic Multimodal OCR & Vision**: Upload document photos or receipts directly into the AI drawer to auto-fill form fields across the site.
- **FastAPI Backend Services (`backend/`)**: Compliance roadmap generation, MongoDB data models, and document management.

---

## 🚀 Quick Start

### 1. Web Portal Frontend

```bash
# Start local static HTTP server
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.

### 2. FastAPI Backend Server (Optional)

```bash
cd backend
~/.local/bin/uv venv --python 3.12 venv
source venv/bin/activate
~/.local/bin/uv pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Visit `http://localhost:8000/docs` for Swagger API documentation.

---

## 👥 Contributors

- **SIH 2026 Team**
- Bureau of Indian Standards (BIS)
