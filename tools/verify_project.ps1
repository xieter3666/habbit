Write-Output "=== Starting Project Verification ==="

$root = "d:\habbit"
$errors = 0

# 1. Check all JSON files
Get-ChildItem -Path $root -Filter "*.json" -Recurse | ForEach-Object {
    try {
        $content = Get-Content -Path $_.FullName -Raw -Encoding UTF8
        $json = ConvertFrom-Json $content
        Write-Output "✓ Valid JSON: $($_.FullName.Replace($root, ''))"
    } catch {
        Write-Error "✗ Invalid JSON in $($_.FullName): $_"
        $errors++
    }
}

# 2. Check all Pages referenced in app.json
$appJson = ConvertFrom-Json (Get-Content -Path "$root\app.json" -Raw -Encoding UTF8)
foreach ($page in $appJson.pages) {
    $wxml = "$root\$page.wxml"
    $wxss = "$root\$page.wxss"
    $js = "$root\$page.js"
    $json = "$root\$page.json"
    if ((Test-Path $wxml) -and (Test-Path $wxss) -and (Test-Path $js) -and (Test-Path $json)) {
        Write-Output "✓ Page complete: $page"
    } else {
        Write-Error "✗ Incomplete page files for: $page"
        $errors++
    }
}

# 3. Scan all /assets/... references in wxml, js, wxss
$assetRefs = @()
Get-ChildItem -Path $root -Include *.wxml,*.js,*.wxss -Recurse | ForEach-Object {
    $txt = Get-Content -Path $_.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($txt, '(?:"|'')(/assets/[^"'']+\.(?:png|jpg|jpeg|webp))(?:"|'')')
    foreach ($m in $matches) {
        $ref = $m.Groups[1].Value
        $assetRefs += [PSCustomObject]@{
            File = $_.FullName.Replace($root, '')
            Asset = $ref
        }
    }
}

$uniqueAssets = $assetRefs | Select-Object -ExpandProperty Asset -Unique
Write-Output "`nTotal unique asset references found: $($uniqueAssets.Count)"

foreach ($asset in $uniqueAssets) {
    $diskPath = "$root$($asset.Replace('/', '\'))"
    if (Test-Path $diskPath) {
        Write-Output "✓ Found Asset: $asset"
    } else {
        Write-Error "✗ Missing Asset: $asset"
        $errors++
    }
}

Write-Output "`n=== Verification Complete. Total Errors: $errors ==="
if ($errors -eq 0) {
    Write-Output "ALL CHECKS PASSED PERFECTLY!"
}
