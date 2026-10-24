Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\explore.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\icons\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# In explore.png (width 852, height 1846):
# Daily tasks section is roughly between y=540 and y=1050.
# The 3 tasks have icons on the left:
# Let's sample crops across y=600 to 1050:
Save-Slice "test_task1_cam" 70 610 120 120
Save-Slice "test_task2_note" 70 760 120 120
Save-Slice "test_task3_book" 70 910 120 120

# Growth stats icons (around y=1520 to 1660)
Save-Slice "test_growth_star" 80 1520 80 80
Save-Slice "test_growth_sprout" 170 1520 80 80
Save-Slice "test_growth_chest" 280 1520 80 80
Save-Slice "test_growth_book" 390 1520 80 80

$img.Dispose()
