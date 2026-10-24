Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# In mine_list.png (width 1024, height 1536):
# Wardrobe card is roughly between y=380 and y=560
# Let's crop test slices:
Save-Slice "test_wardrobe_full" 80 390 864 160
Save-Slice "test_hat" 280 430 80 80
Save-Slice "test_jacket" 380 430 80 80
Save-Slice "test_pants" 490 430 80 80
Save-Slice "test_shoes" 600 430 80 80
Save-Slice "test_backpack" 710 430 80 80

# Also pet slots in mine_list.png (between y=560 and y=750):
Save-Slice "test_pets_row" 80 570 864 160
Save-Slice "test_pet_slot1" 140 620 90 90

$img.Dispose()
