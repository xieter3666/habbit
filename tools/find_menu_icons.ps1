Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('d:\habbit\assets\raw\mine_list.png')

function Save-Slice($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropped.Save("d:\habbit\assets\menu\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved $name : ${w}x${h}"
}

# In mine_list.png:
# Menu rows x=115 to 175:
# 1. 个人信息 (User icon):
Save-Slice "test_m1" 120 780 55 55
# 2. 我的消息 (Message icon):
Save-Slice "test_m2" 120 855 55 55
# 3. 兑换记录 (Gift box icon):
Save-Slice "test_m3" 120 930 55 55
# 4. 意见反馈 (Feedback bubble icon):
Save-Slice "test_m4" 120 1005 55 55
# 5. 关于我们 (Info icon):
Save-Slice "test_m5" 120 1080 55 55

$img.Dispose()
