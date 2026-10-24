Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\explore.png')
Write-Output "explore width=$($img.Width) height=$($img.Height)"

# In explore.png:
# Let's crop the sleeping puppy area:
# The sleeping puppy is on the right side of the "本周挑战" card.
# The "本周挑战" card is roughly at y ~ 1070 to 1320 in explore.png.
# Let's test a few crops:
function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\explore\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# Let's find sleeping dog
Save-Slice "test_sleeping_dog1" 450 1060 380 260
Save-Slice "test_sleeping_dog2" 490 1070 330 220

# Let's also check encourage puppy card at the bottom of explore.png
# It is around y ~ 1500 to 1700
Save-Slice "test_encourage_bottom" 500 1500 320 220
Save-Slice "test_encourage_dog_only" 580 1550 220 170

$img.Dispose()
