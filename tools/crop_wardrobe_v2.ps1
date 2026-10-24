Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# In mine_list.png:
# Clothes slots are between y=580 and y=710:
# Slot 1 (Hat): x=300 to 400
Save-Slice "dress_hat_v2" 305 590 100 100
# Slot 2 (Jacket): x=420 to 520
Save-Slice "dress_jacket_v2" 425 590 100 100
# Slot 3 (Pants): x=540 to 640
Save-Slice "dress_pants_v2" 545 590 100 100
# Slot 4 (Shoes): x=660 to 760
Save-Slice "dress_shoes_v2" 670 590 100 100
# Slot 5 (Backpack): x=780 to 880
Save-Slice "dress_backpack_v2" 790 590 90 100

# The Pet card is below clothes: y=720 to y=880:
Save-Slice "test_actual_pet_card" 80 720 864 160

$img.Dispose()
