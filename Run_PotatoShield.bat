@echo off
title PotatoShield AI Launcher
echo ===================================================
echo     INITIALIZING POTATOSHIELD AI DIAGNOSTICS
echo ===================================================
echo.
echo Please wait while the Neural Vision Engine boots up...
echo.

:: Start the Python FastAPI Backend in a new window
echo [SERVER 1] Starting robust FastAPI Backend...
start "PotatoShield Backend (FastAPI)" cmd /c "cd /d C:\Users\91990\.gemini\antigravity\scratch\leaf-classification\backend && title PotatoShield Backend && color 0A && echo Booting Neural Engine... && py -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

:: Start the React/Vite Frontend in a new window
echo [SERVER 2] Starting Vite React Frontend...
start "PotatoShield Frontend (React)" cmd /c "cd /d C:\Users\91990\.gemini\antigravity\scratch\leaf-classification\frontend && title PotatoShield Frontend && color 0B && echo Booting Glassmorphism UI... && npm run dev"

:: Give the servers 4 seconds to spin up completely
echo.
echo Giving servers 4 seconds to spin up and compile...
timeout /t 4 /nobreak > NUL

:: Automatically open the user's default web browser
echo.
echo Opening the application in your default web browser!
start http://localhost:5173

echo.
echo All subsystems are officially online. You can safely close this launcher window.
timeout /t 3 > NUL
exit
