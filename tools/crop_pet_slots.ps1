Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

Save-Slice "pet_slot_1" 140 775 80 80
Save-Slice "pet_slot_2" 235 775 80 80
Save-Slice "pet_slot_3" 330 775 80 80
Save-Slice "pet_slot_4" 425 775 80 80
Save-Slice "pet_slot_5" 520 775 80 80
Save-Slice "pet_slot_6" 615 775 80 80

$img.Dispose()
