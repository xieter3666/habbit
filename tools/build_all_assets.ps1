Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param(
        [Parameter(Mandatory=$true)][string]$src,
        [Parameter(Mandatory=$true)][string]$dst,
        [Parameter(Mandatory=$true)][int]$x,
        [Parameter(Mandatory=$true)][int]$y,
        [Parameter(Mandatory=$true)][int]$w,
        [Parameter(Mandatory=$true)][int]$h,
        [string]$format = "Png"
    )
    $dir = [System.IO.Path]::GetDirectoryName($dst)
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $img = [System.Drawing.Bitmap]::FromFile($src)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    if ($format -eq "Jpeg") {
        $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    } else {
        $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $cropped.Dispose()
    $img.Dispose()
    Write-Output "Extracted: $dst (${w}x${h})"
}

Write-Output "=== Starting Fine-Tuned Master Asset Regeneration ==="

$rawDir = "d:\habbit\assets\raw"
$exploreSrc = "$rawDir\explore.png"
$mineSceneSrc = "$rawDir\mine_scene.png"
$mineListSrc = "$rawDir\mine_list.png"
$meadowSrc = "$rawDir\pets_meadow.png"

# 1. Warm Cozy Room scene from mine_scene.png (width 1024, height 1536)
Crop-Image -src $mineSceneSrc -dst "d:\habbit\assets\mine\scene_bg.jpg" -x 0 -y 405 -w 1024 -h 430 -format "Jpeg"
Crop-Image -src $mineSceneSrc -dst "d:\habbit\assets\mine\scene_room.png" -x 0 -y 405 -w 1024 -h 430

# 2. Scenic banner from mine_list.png (wooden sign & mountains, clean without borders)
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\bottom_banner.png" -x 70 -y 1222 -w 884 -h 160

# 3. Tab Bar Icons from mine_list.png
# Orange cat head (without text stroke)
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\tab\explore.png" -x 168 -y 1390 -w 84 -h 62
# Dark cat head (without text stroke)
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\tab\mine_gray.png" -x 768 -y 1390 -w 84 -h 62
# Center golden dog head
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\tab\dog_head.png" -x 465 -y 1378 -w 94 -h 78
# Paw watermarks from pets_meadow.png
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\tab\paw_pink.png" -x 740 -y 1000 -w 155 -h 170
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\tab\paw_black.png" -x 925 -y 1000 -w 155 -h 170

# 4. Explore Task Icons from explore.png (width 852, height 1846)
Crop-Image -src $exploreSrc -dst "d:\habbit\assets\icons\cam.png" -x 75 -y 618 -w 110 -h 110
Crop-Image -src $exploreSrc -dst "d:\habbit\assets\icons\list.png" -x 75 -y 768 -w 110 -h 110
Crop-Image -src $exploreSrc -dst "d:\habbit\assets\icons\book.png" -x 75 -y 918 -w 110 -h 110

# Sleeping puppy on weekly challenge (with moon, stars, alarm clock, speech bubble)
Crop-Image -src $exploreSrc -dst "d:\habbit\assets\explore\challenge_dog.png" -x 460 -y 1070 -w 350 -h 165
# Encouragement puppy on grass hill (clean without speech bubble text)
Crop-Image -src $exploreSrc -dst "d:\habbit\assets\explore\puppy_encourage.png" -x 530 -y 1545 -w 240 -h 145

# 5. Wardrobe Clothing Items from mine_list.png (clean centered crops)
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\dress_hat.png" -x 280 -y 580 -w 85 -h 85
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\dress_jacket.png" -x 396 -y 580 -w 85 -h 85
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\dress_pants.png" -x 518 -y 580 -w 85 -h 85
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\dress_shoes.png" -x 625 -y 580 -w 85 -h 85
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\dress_backpack.png" -x 738 -y 595 -w 68 -h 76

# 6. Pet Card Illustration & 6 Pet Slots
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_cat1.png" -x 148 -y 765 -w 85 -h 85
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_card_art.png" -x 740 -y 715 -w 180 -h 150
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_1.png" -x 140 -y 775 -w 80 -h 80
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_2.png" -x 235 -y 775 -w 80 -h 80
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_3.png" -x 330 -y 775 -w 80 -h 80
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_4.png" -x 425 -y 775 -w 80 -h 80
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_5.png" -x 520 -y 775 -w 80 -h 80
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\mine\pet_slot_6.png" -x 615 -y 775 -w 80 -h 80

# 7. Menu Icons from mine_list.png
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\menu\menu_profile.png" -x 122 -y 926 -w 48 -h 48
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\menu\menu_msg.png" -x 122 -y 988 -w 48 -h 48
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\menu\menu_reward.png" -x 122 -y 1050 -w 48 -h 48
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\menu\menu_feedback.png" -x 122 -y 1112 -w 48 -h 48
Crop-Image -src $mineListSrc -dst "d:\habbit\assets\menu\menu_about.png" -x 122 -y 1174 -w 48 -h 48

# 8. User avatar from mine_scene.png
Crop-Image -src $mineSceneSrc -dst "d:\habbit\assets\user\avatar.png" -x 74 -y 116 -w 126 -h 126

# 9. Stickers & Meadow from pets_meadow.png
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\cat_orange_sticker.png" -x 40 -y 985 -w 220 -h 185
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\cat_grey_sticker.png" -x 280 -y 985 -w 200 -h 185
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\dog_sticker.png" -x 505 -y 985 -w 210 -h 185
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\paw_pink_sticker.png" -x 740 -y 1000 -w 155 -h 170
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\paw_black_sticker.png" -x 925 -y 1000 -w 155 -h 170
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\paw_dark_sticker.png" -x 1105 -y 1000 -w 155 -h 170
Crop-Image -src $meadowSrc -dst "d:\habbit\assets\pets\meadow_full.png" -x 0 -y 0 -w 1312 -h 970

Write-Output "=== Fine-Tuned Master Asset Regeneration Complete! ==="
