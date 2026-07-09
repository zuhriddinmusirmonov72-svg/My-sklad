@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   LOYIHANI ISHGA TUSHIRISH
echo ========================================
echo.
echo [1/3] Admin Panel ishga tushmoqda...
start "Admin Panel (Frontend)" cmd /k "cd /d d:\beckend\Admin && npm run dev"
timeout /t 3 >nul

echo [2/3] Backend API ishga tushmoqda...
start "Backend API (Express)" cmd /k "cd /d d:\beckend\Admin\backend && node server.js"
timeout /t 3 >nul

echo [3/3] Swagger Backend ishga tushmoqda...
start "Swagger Backend (NestJS)" cmd /k "cd /d d:\beckend && npm run start:dev"
timeout /t 3 >nul

echo.
echo ========================================
echo   ✅ BARCHA SERVISLAR ISHGA TUSHDI!
echo ========================================
echo.
echo 🌐 Admin Panel:  http://localhost:5173
echo 🔧 Backend API:  http://localhost:5000
echo 📚 Swagger API:  http://localhost:3000/api/docs
echo.
echo ⚠️  Terminallarni yopmang - loyiha ishlashi uchun zarur!
echo.
pause
