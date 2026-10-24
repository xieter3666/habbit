Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')
# User card is near y = 100 to 300
Write-Output "Scanning mine_list.png near top left"
for ($y = 100; $y -lt 300; $y += 20) {
    $line = ""
    for ($x = 60; $x -lt 300; $x += 10) {
        $c = $img.GetPixel($x, $y)
        # Check if border or color
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) { $line += "#" } else { $line += "." }
    }
    Write-Output "y=$y $line"
}
$img.Dispose()
