Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\mine\scene_room.png')
Write-Output "scene_room size: $($img.Width)x$($img.Height)"

# In scene_room.png (1024x430):
# 1. Speech bubble:
# Let's crop the drawn speech bubble:
function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

Save-Slice "test_drawn_bubble" 175 40 160 100
Save-Slice "test_drawn_btn_dress" 710 65 200 95
Save-Slice "test_drawn_btn_pet" 710 185 210 100
Save-Slice "test_drawn_cat" 550 280 180 120
Save-Slice "test_drawn_girl" 350 40 230 380

$img.Dispose()
