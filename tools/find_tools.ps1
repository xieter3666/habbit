$sh = New-Object -ComObject WScript.Shell
$lnk = Get-ChildItem -Path "C:\Users\11363\Desktop" -Filter "*微信*.lnk" | Select-Object -First 1
if ($lnk) {
    $sc = $sh.CreateShortcut($lnk.FullName)
    Write-Output "WeChat DevTools target: $($sc.TargetPath)"
    $devtoolsDir = [System.IO.Path]::GetDirectoryName($sc.TargetPath)
    Write-Output "DevTools Dir: $devtoolsDir"
    $node = Get-ChildItem -Path $devtoolsDir -Filter "node.exe" -Recurse -Depth 3 -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($node) {
        Write-Output "Found node: $($node.FullName)"
    }
    $cli = Get-ChildItem -Path $devtoolsDir -Filter "cli.bat" -Recurse -Depth 3 -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($cli) {
        Write-Output "Found cli: $($cli.FullName)"
    }
} else {
    Write-Output "Lnk not found"
}
