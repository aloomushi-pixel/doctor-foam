$exePath = "C:\Users\info\AppData\Local\Programs\Antigravity\Antigravity.exe"
$workspacePath = "c:\Users\info\OneDrive\Documentos\Desarrollo\PROYECTO-DRFOAM\doctor-foam"

if (-not (Test-Path $exePath)) {
    exit 0
}

$running = Get-Process -Name "Antigravity" -ErrorAction SilentlyContinue
if (-not $running) {
    Start-Process -FilePath $exePath -ArgumentList "`"$workspacePath`""
}
