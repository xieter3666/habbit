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

# Avatar from mine_scene.png:
Crop-Image 'd:\habbit\assets\raw\mine_scene.png' 'd:\habbit\assets\user\avatar.png' 65 135 150 150

# Chibi character preview and backpack:
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\mine\char_mini.png' 730 520 165 170
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\mine\dress_backpack.png' 738 596 68 76

# Pet card illustration in mine_list:
Crop-Image 'd:\habbit\assets\raw\mine_list.png' 'd:\habbit\assets\mine\pet_card_art.png' 745 715 175 145

# Also top banner logo from explore.png:
# "不止日常" title calligraphy & sun & cat
Crop-Image 'd:\habbit\assets\raw\explore.png' 'd:\habbit\assets\explore\explore_banner_art.png' 30 70 790 270
