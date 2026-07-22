$folderPath = "c:\Users\info\OneDrive\Documentos\Desarrollo\PROYECTO-DRFOAM\doctor-foam\public"
$shell = New-Object -COMObject Shell.Application
$folder = $shell.Namespace($folderPath)
$file = $folder.ParseName("video-hero.mp4")

for ($i = 0; $i -le 350; $i++) {
    $detailName = $folder.GetDetailsOf($null, $i)
    $detailValue = $folder.GetDetailsOf($file, $i)
    if ($detailValue -and ($detailName -match "Dimensions|Resolution|Frame width|Frame height" -or $detailValue -match "1920|1080|1280|720|640|x")) {
        Write-Host "$i - $detailName : $detailValue"
    }
}
