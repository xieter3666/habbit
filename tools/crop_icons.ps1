Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param(
        [Parameter(Mandatory=$true)][string]$src,
        [Parameter(Mandatory=$true)][string]$dst,
        [Parameter(Mandatory=$true)][int]$x,
        [Parameter(Mandatory=$true)][int]$y,
        [Parameter(Mandatory=$true)][int]$w,
        [Parameter(Mandatory=$true)][int]$h
    )
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

# 1. Avatar from mine_scene.png:
# girl avatar circle is at x=78, y=118, w=122, h=122
Crop-Image -src 'd:\habbit\assets\raw\mine_scene.png' -dst 'd:\habbit\assets\user\avatar.png' -x 76 -y 118 -w 124 -h 124

# 2. Individual toolbox icons from toolbox_full.png (864x220)
# Start y at 50, h=110 to exclude top title and bottom label
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\camera.png' -x 55 -y 52 -w 108 -h 108
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\album.png' -x 195 -y 52 -w 108 -h 108
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\note.png' -x 335 -y 52 -w 108 -h 108
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\calendar.png' -x 475 -y 52 -w 108 -h 108
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\focus.png' -x 612 -y 52 -w 108 -h 108
Crop-Image -src 'd:\habbit\assets\toolbox\toolbox_full.png' -dst 'd:\habbit\assets\toolbox\more.png' -x 745 -y 52 -w 108 -h 108

# 3. Individual achievement badges from achievements_full.png (864x260)
# Badges y=40, h=120 to only keep the badge art
Crop-Image -src 'd:\habbit\assets\achievements\achievements_full.png' -dst 'd:\habbit\assets\achievements\badge1.png' -x 58 -y 40 -w 120 -h 120
Crop-Image -src 'd:\habbit\assets\achievements\badge2.png' -dst 'd:\habbit\assets\achievements\badge2.png' -x 212 -y 40 -w 120 -h 120
Crop-Image -src 'd:\habbit\assets\achievements\achievements_full.png' -dst 'd:\habbit\assets\achievements\badge2.png' -x 212 -y 40 -w 120 -h 120
Crop-Image -src 'd:\habbit\assets\achievements\achievements_full.png' -dst 'd:\habbit\assets\achievements\badge3.png' -x 372 -y 40 -w 120 -h 120
Crop-Image -src 'd:\habbit\assets\achievements\achievements_full.png' -dst 'd:\habbit\assets\achievements\badge4.png' -x 532 -y 40 -w 120 -h 120
Crop-Image -src 'd:\habbit\assets\achievements\achievements_full.png' -dst 'd:\habbit\assets\achievements\badge5.png' -x 692 -y 40 -w 120 -h 120
