$root = "d:\habbit"

Get-ChildItem -Path $root -Filter "*.js" -Recurse | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw -Encoding UTF8
    # Check for basic unbalanced braces/parentheses
    $openParen = ([regex]::Matches($content, '\(')).Count
    $closeParen = ([regex]::Matches($content, '\)')).Count
    $openBrace = ([regex]::Matches($content, '\{')).Count
    $closeBrace = ([regex]::Matches($content, '\}')).Count
    $openBracket = ([regex]::Matches($content, '\[')).Count
    $closeBracket = ([regex]::Matches($content, '\]')).Count

    if ($openParen -ne $closeParen) {
        Write-Error "Unbalanced parentheses in $($_.FullName): (=$openParen, )=$closeParen"
    } elseif ($openBrace -ne $closeBrace) {
        Write-Error "Unbalanced braces in $($_.FullName): {=$openBrace, }=$closeBrace"
    } elseif ($openBracket -ne $closeBracket) {
        Write-Error "Unbalanced brackets in $($_.FullName): [=$openBracket, ]=$closeBracket"
    } else {
        Write-Output "✓ Syntax balance check passed: $($_.Name)"
    }
}
