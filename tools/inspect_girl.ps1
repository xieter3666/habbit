Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\mine\test_drawn_girl.png')
$c = $img.GetPixel(0, 0)
Write-Output "Format: $($img.PixelFormat) Size: $($img.Width)x$($img.Height) Alpha: $($c.A)"
$img.Dispose()
