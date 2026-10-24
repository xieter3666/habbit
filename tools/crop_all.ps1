Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param([string]$src, [string]$dst, [int]$x, [int]$y, [int]$w, [int]$h)
    $dir = [System.IO.Path]::GetDirectoryName($dst)
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $img = [System.Drawing.Bitmap]::FromFile($src)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    $img.Dispose()
    Write-Output "Saved $dst : ${w}x${h}"
}

# Avatar candidates from mine_list.png
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\user\avatar_cand1.png' 85 90 180 180
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\user\avatar_cand2.png' 95 100 160 160
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\user\avatar_cand3.png' 90 100 170 170

# Accurate stickers from pets_meadow.png
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\cat_orange_sticker.png' 40 985 220 185
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\cat_grey_sticker.png' 280 985 200 185
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\dog_sticker.png' 505 985 210 185
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_pink_sticker.png' 740 1000 155 170
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_black_sticker.png' 925 1000 155 170
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_dark_sticker.png' 1105 1000 155 170
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\meadow_full.png' 0 0 1312 970

# Also crop toolbox icons from mine_scene.png (width 1024, height 1536)
# Toolbox is roughly between y=850 and 1100
Crop-Image 'd:\habbit\assets\raw\mine_scene.png' 'd:\habbit\assets\toolbox\toolbox_full.png' 80 840 864 220
# Achievements section from mine_scene.png
Crop-Image 'd:\habbit\assets\raw\mine_scene.png' 'd:\habbit\assets\achievements\achievements_full.png' 80 1090 864 260
