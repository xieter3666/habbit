Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\menu\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

Save-Slice "menu_profile" 122 926 48 48
Save-Slice "menu_msg" 122 988 48 48
Save-Slice "menu_reward" 122 1050 48 48
Save-Slice "menu_feedback" 122 1112 48 48
Save-Slice "menu_about" 122 1174 48 48

$img.Dispose()
