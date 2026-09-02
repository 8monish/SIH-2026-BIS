#!/usr/bin/env bash
# ==============================================================================
# BIS Intelligent Compliance Assistant — Linux / macOS Launcher Script
# Starts static web server (port 8080) and FastAPI backend (port 8000)
# ==============================================================================

set -e

# Base directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "=========================================================="
echo " 🇮🇳 Bureau of Indian Standards (BIS) Portal Launcher"
echo "=========================================================="

# Check for Python 3
if command -v python3 &>/dev/null; then
    PY_CMD="python3"
elif command -v python &>/dev/null; then
    PY_CMD="python"
else
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Optional Backend Startup
if [ -d "backend" ] && [ -f "backend/main.py" ]; then
    echo "⚙️  Starting FastAPI Backend on http://localhost:8000..."
    if [ -d "backend/venv" ]; then
        source backend/venv/bin/activate 2>/dev/null || true
    fi
    (cd backend && $PY_CMD -m uvicorn main:app --host 0.0.0.0 --port 8000 &) 2>/dev/null || true
fi

# Start Frontend Static HTTP Server
echo "🌐 Starting BIS Web Portal on http://localhost:8080..."
echo "Press Ctrl+C to stop the servers."
echo "=========================================================="

# Try opening default browser
(sleep 1.5 && (xdg-open "http://localhost:8080" || open "http://localhost:8080") 2>/dev/null) &

# Run static HTTP server
$PY_CMD -m http.server 8080
