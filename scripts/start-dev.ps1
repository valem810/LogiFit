# Abre dos ventanas de PowerShell: una para el backend y otra para el frontend.
# Ejecútalo desde la raíz del proyecto: `.	emplates\start-dev.ps1` o `scripts\start-dev.ps1`.
# Nota: este script asume que tienes `python` y `npm` disponibles en PATH.

$repo = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backendDir = Join-Path $repo 'backend'

# Comando para arrancar el backend
$backendCmd = "Set-Location -Path '$backendDir'; python app.py"

# Comando para arrancar el frontend (desde la raíz del repo)
$frontendCmd = "Set-Location -Path '$repo'; npm run dev"

Write-Host "Iniciando backend en nueva ventana de PowerShell..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', $backendCmd

Start-Sleep -Milliseconds 500

Write-Host "Iniciando frontend en nueva ventana de PowerShell..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', $frontendCmd

Write-Host "Ambos procesos se han iniciado en ventanas separadas."