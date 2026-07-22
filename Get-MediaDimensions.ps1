$folder = "c:\Users\info\OneDrive\Documentos\Desarrollo\PROYECTO-DRFOAM\doctor-foam\public"

$shell = New-Object -COMObject Shell.Application
$folderObj = $shell.Namespace($folder)

$items = "hero-bg.png", "video-hero.mp4"

foreach ($file in $items) {
    if (Test-Path "$folder\$file") {
        $item = $folderObj.ParseName($file)
        
        # Depending on windows version, Dimensions is usually 31
        $dimensions = $folderObj.GetDetailsOf($item, 31)
        Write-Host "$file : $dimensions"
    } else {
        Write-Host "$file no encontrado."
    }
}
