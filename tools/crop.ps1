Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param(
        [string]$src,
        [string]$dst,
        [int]$x,
        [int]$y,
        [int]$w,
        [int]$h
    )
    $dir = [System.IO.Path]::GetDirectoryName($dst)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $img = [System.Drawing.Bitmap]::FromFile($src)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    $img.Dispose()
    Write-Output "Saved $dst : ${w}x${h}"
}

# Avatar in mine_scene.png (1024x1536)
Crop-Image 'd:\habbit\assets\raw\mine_scene.png' 'd:\habbit\assets\user\avatar.png' 70 110 135 135

# In pets_meadow.png (1312x1199):
# The sticker heads are at the bottom:
# Let's crop the bottom sticker strip:
# Orange cat sticker, Grey cat sticker, Poodle sticker, Pink paw, Black paw, Dark paw
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\cat_orange_head.png' 35 800 225 220
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\cat_grey_head.png' 280 800 215 220
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\dog_head.png' 500 800 230 220
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_pink_clean.png' 740 820 160 180
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_black_clean.png' 910 820 165 180
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\paw_dark_clean.png' 1090 820 165 180

# Meadow scene without sticker strip (top 0 to 790)
Crop-Image 'd:\habbit\assets\raw\pets_meadow.png' 'd:\habbit\assets\pets\meadow_scene.png' 10 0 1290 790
