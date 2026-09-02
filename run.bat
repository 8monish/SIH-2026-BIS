@echo off
:: ==============================================================================
:: BIS Intelligent Compliance Assistant — Windows Launcher Script
:: Starts static web server (port 8080) and FastAPI backend (port 8000)
:: ==============================================================================

title BIS Intelligent Compliance Assistant Launcher

echo ==========================================================
echo  BIS Intelligent Compliance Assistant
echo ==========================================================

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python 3 is not installed or not added to PATH.
    echo Please install Python 3 from https://www.python.org/
    pause
    exit /b 1
)

:: Start FastAPI Backend if present
if exist "backend\main.py" (
    echo Starting FastAPI Backend on http://localhost:8000...
    if exist "backend\venv\Scripts\activate.bat" (
        start "BIS FastAPI Backend" cmd /k "cd backend && call venv\Scripts\activate.bat && uvicorn main:app --port 8000 --reload"
    ) else (
        start "BIS FastAPI Backend" cmd /k "cd backend && uvicorn main:app --port 8000 --reload"
    )
)

:: Start Frontend Web Server
echo Starting BIS Web Portal on http://localhost:8080...
start http://localhost:8080

echo Running static HTTP server on port 8080...
echo Close this window to stop the portal.
echo ==========================================================

python -m http.server 8080

pause
