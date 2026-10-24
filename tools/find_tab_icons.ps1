Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\tab\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# The bottom tabbar in mine_list.png (width 1024, height 1536)
# Left cat icon is around x=140 to 260, y=1380 to 1480
Save-Slice "test_tab_cat_orange" 160 1390 100 100
# Center dog button is around x=450 to 570, y=1360 to 1480
Save-Slice "test_tab_dog" 455 1370 115 115
# Right cat icon is around x=760 to 880, y=1390 to 1480
Save-Slice "test_tab_cat_black" 760 1390 100 100
# Paw prints on tabbar
Save-Slice "test_tab_paw1" 320 1420 60 60

$img.Dispose()
