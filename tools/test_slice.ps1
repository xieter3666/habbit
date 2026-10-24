Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_scene.png')
Write-Output "mine_scene width=$($img.Width) height=$($img.Height)"

# In mine_scene.png, let's sample colors or crop sections:
# Profile card is around top y=100 to y=270.
# Toolbox card begins around y=830.
# So the room scene itself is roughly from y=0 (or 260) to y=840.
# But wait! What if the entire room illustration in the background goes from y=0 to y=1400, or from y=240 to 850?
# Let's crop a few test slices of mine_scene.png to see exactly what is where.

function Save-Slice($name, $y, $h) {
    $rect = New-Object System.Drawing.Rectangle(0, $y, $img.Width, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name"
}

Save-Slice "room_slice_250_600" 250 600
Save-Slice "room_slice_260_580" 260 580
Save-Slice "room_slice_0_900" 0 900

$img.Dispose()
