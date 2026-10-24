Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')
Write-Output "mine_list width=$($img.Width) height=$($img.Height)"

# In mine_list.png:
# Total height is 1536.
# Let's crop from y=1200 to 1420 to find the scenic wooden banner!
function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\mine\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

Save-Slice "test_scenic_banner1" 50 1200 920 220
Save-Slice "test_scenic_banner2" 70 1220 880 180
Save-Slice "test_scenic_banner3" 70 1210 880 200

$img.Dispose()
