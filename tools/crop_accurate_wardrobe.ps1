Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# The clothing slots in mine_list.png (y=475, w=90, h=90):
Save-Slice "dress_hat_clean" 235 480 95 95
Save-Slice "dress_jacket_clean" 360 480 95 95
Save-Slice "dress_pants_clean" 485 480 95 95
Save-Slice "dress_shoes_clean" 610 480 95 95
Save-Slice "dress_backpack_clean" 735 480 95 95

# Pet card in mine_list.png (y=570 to 720):
Save-Slice "test_pets_card_full" 80 570 864 160

$img.Dispose()
