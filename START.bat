@echo off
title Finanzas OpenFriends - Openbank
color 0A

echo.
echo ============================================================
echo   FINANZAS OPENFRIENDS - OPENBANK
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado.
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org/
    echo Descarga la version LTS y ejecuta el instalador.
    echo.
    pause
    start https://nodejs.org/
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas correctamente
    echo.
)

echo ============================================================
echo   INICIANDO APLICACION...
echo ============================================================
echo.
echo La aplicacion se abrira automaticamente en tu navegador.
echo Si no se abre, visita: http://localhost:3000
echo.
echo Para mejor experiencia:
echo   1. Presiona F12 (DevTools)
echo   2. Presiona Ctrl+Shift+M (Vista movil)
echo   3. Selecciona un dispositivo iPhone/Pixel
echo.
echo Para detener el servidor: Presiona Ctrl+C
echo.
echo ============================================================
echo.

npm run dev

pause

