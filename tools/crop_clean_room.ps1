Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_scene.png')
$rect = New-Object System.Drawing.Rectangle(0, 405, 1024, 435)
$cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$cropped.Save("d:\habbit\assets\mine\test_room_slice_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$img.Dispose()
Write-Output "Clean room slice cropped successfully!"
