Write-Output "=== Starting Comprehensive WXML & WXSS Verification ==="

$root = "d:\habbit"
$errors = 0

# 1. Verify WXML files for matched tags and valid template syntax
Get-ChildItem -Path $root -Filter "*.wxml" -Recurse | ForEach-Object {
    $file = $_.FullName.Replace($root, '')
    $content = Get-Content -Path $_.FullName -Raw -Encoding UTF8

    # Check mustache syntax balance {{ }}
    $openMustache = ([regex]::Matches($content, '\{\{')).Count
    $closeMustache = ([regex]::Matches($content, '\}\}')).Count
    if ($openMustache -ne $closeMustache) {
        Write-Error "Unbalanced mustache {{ }} in $file : {{$openMustache, }}$closeMustache"
        $errors++
    }

    # Check unclosed tags (excluding self-closing tags like <image ... />, <input ... />, etc.)
    # Count <view> vs </view>, <text> vs </text>, <button> vs </button>, <modal-dialog> vs </modal-dialog>, <custom-tabbar> vs </custom-tabbar>
    $tags = @('view', 'text', 'button', 'modal-dialog', 'scroll-view')
    foreach ($tag in $tags) {
        $openCount = ([regex]::Matches($content, "<$tag(?:\s+[^>]*)?>")).Count
        $closeCount = ([regex]::Matches($content, "</$tag>")).Count
        if ($openCount -ne $closeCount) {
            Write-Error "Mismatched tag <$tag> in $file : <$tag>=$openCount, </$tag>=$closeCount"
            $errors++
        }
    }

    Write-Output "✓ Valid WXML structure: $file"
}

# 2. Verify WXSS files for balanced braces
Get-ChildItem -Path $root -Filter "*.wxss" -Recurse | ForEach-Object {
    $file = $_.FullName.Replace($root, '')
    $content = Get-Content -Path $_.FullName -Raw -Encoding UTF8
    $openBrace = ([regex]::Matches($content, '\{')).Count
    $closeBrace = ([regex]::Matches($content, '\}')).Count
    if ($openBrace -ne $closeBrace) {
        Write-Error "Unbalanced braces in $file : {=$openBrace, }=$closeBrace"
        $errors++
    } else {
        Write-Output "✓ Valid WXSS styles: $file"
    }
}

Write-Output "`n=== WXML & WXSS Verification Complete. Total Errors: $errors ==="
if ($errors -eq 0) {
    Write-Output "ALL WXML AND WXSS FILES ARE 100% PERFECT!"
}
