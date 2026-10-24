/**
 * config/assets.js
 * 「不止日常」全量静态素材统一配置
 * 集中管理所有图标、立绘、插画、背景与装饰素材的路径
 * 方便后续随时替换图片文件或迁移目录而无需修改业务代码
 */

const Assets = {
  // 底部导航栏与指示素材
  navigation: {
    tabExplore: '/assets/tab/explore.png',
    tabRoom: '/assets/tab/dog_head.png',
    tabMine: '/assets/tab/mine_gray.png',
    pawPink: '/assets/tab/paw_pink.png',
    pawBlack: '/assets/tab/paw_black.png'
  },

  // 用户与角色
  user: {
    avatar: '/assets/user/avatar.png',
    chibi: '/assets/mine/char_mini.png'
  },

  // 探索页任务、卡片与活动素材
  explore: {
    bannerArt: '/assets/explore/explore_banner_art.png',
    earth: '/assets/explore/earth.png',
    gift: '/assets/explore/gift.png',
    challengeDog: '/assets/explore/challenge_dog.png',
    puppyEncourage: '/assets/explore/puppy_encourage.png',
    taskCamera: '/assets/icons/cam.png',
    taskList: '/assets/icons/list.png',
    taskBook: '/assets/icons/book.png',
    pawFortune: '/assets/icons/paw_fortune.png'
  },

  // 角色空间与工具箱图标
  tools: {
    camera: '/assets/toolbox/camera.png',
    album: '/assets/toolbox/album.png',
    note: '/assets/toolbox/note.png',
    calendar: '/assets/toolbox/calendar.png',
    focus: '/assets/toolbox/focus.png',
    more: '/assets/toolbox/more.png'
  },

  // 成就徽章
  achievements: {
    badge1: '/assets/achievements/badge1.png',
    badge2: '/assets/achievements/badge2.png',
    badge3: '/assets/achievements/badge3.png',
    badge4: '/assets/achievements/badge4.png',
    badge5: '/assets/achievements/badge5.png'
  },

  // 装扮服饰
  outfits: {
    hat: '/assets/mine/dress_hat.png',
    jacket: '/assets/mine/dress_jacket.png',
    pants: '/assets/mine/dress_pants.png',
    shoes: '/assets/mine/dress_shoes.png',
    backpack: '/assets/mine/dress_backpack.png'
  },

  // 宠物与贴纸图鉴
  pets: {
    roomCat: '/assets/mine/pet_cat1.png',
    roomDog: '/assets/pets/dog.png',
    meadowFull: '/assets/pets/meadow_full.png',
    slot1: '/assets/mine/pet_slot_1.png',
    slot2: '/assets/mine/pet_slot_2.png',
    slot3: '/assets/mine/pet_slot_3.png',
    slot4: '/assets/mine/pet_slot_4.png',
    slot5: '/assets/mine/pet_slot_5.png',
    slot6: '/assets/mine/pet_slot_6.png',
    cardArt: '/assets/mine/pet_card_art.png',
    orangeCatSticker: '/assets/pets/cat_orange_sticker.png',
    greyCatSticker: '/assets/pets/cat_grey_sticker.png',
    dogSticker: '/assets/pets/dog_sticker.png',
    pawPinkSticker: '/assets/pets/paw_pink_sticker.png',
    pawBlackSticker: '/assets/pets/paw_black_sticker.png',
    pawDarkSticker: '/assets/pets/paw_dark_sticker.png'
  },

  // 个人中心菜单图标
  menu: {
    profile: '/assets/menu/menu_profile.png',
    message: '/assets/menu/menu_msg.png',
    reward: '/assets/menu/menu_reward.png',
    feedback: '/assets/menu/menu_feedback.png',
    about: '/assets/menu/menu_about.png'
  },

  // 背景与长幅插画
  backgrounds: {
    roomScene: '/assets/mine/scene_bg.jpg',
    bottomBanner: '/assets/mine/bottom_banner.png'
  }
};

module.exports = Assets;
