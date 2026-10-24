Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_scene.png')
for ($y = 1200; $y -le 1350; $y += 20) {
    $c = $img.GetPixel(300, $y)
    Write-Output "y=$y : R=$($c.R) G=$($c.G) B=$($c.B)"
}
$img.Dispose()
