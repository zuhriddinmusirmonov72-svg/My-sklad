@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   BARCHA SERVISLARNI TO'XTATISH
echo ========================================
echo.
echo Node.js jarayonlarini to'xtatish...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM ngrok.exe >nul 2>&1
timeout /t 2 >nul
echo.
echo ✅ Barcha servislar to'xtatildi!
echo.
pause
