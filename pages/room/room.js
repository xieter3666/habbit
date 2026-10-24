const Store = require('../../utils/store.js');
const Assets = require('../../config/assets.js');
const CloudService = require('../../utils/cloud.js');

let focusInterval = null;

const ROOM_BACKGROUNDS = [
  {
    id: 'sunwood',
    name: '暖阳木屋',
    image: '/assets/mine/scene_bg.jpg',
    desc: '阳光透过木窗洒在地毯上，安静温柔的卧室书房'
  },
  {
    id: 'meadow',
    name: '原野清风',
    image: '/assets/pets/meadow_full.jpg',
    desc: '被白云与花海环抱的蓝天大自然乐园'
  }
];

Page({
  data: {
    assets: Assets,
    user: {},
    pets: [],
    activePetId: 'orange_cat',
    activePet: {},
    wardrobe: [],
    unlockedOutfitCount: 5,
    equippedItems: {
      hat: { equipped: true, layerImage: '' },
      jacket: { equipped: true, layerImage: '' },
      backpack: { equipped: true, layerImage: '' }
    },
    achievements: [],
    album: [],
    notes: [],
    focusStats: {},
    expPercent: 48,
    syncStatus: 'local', // 'local' | 'synced'

    // 房间场景
    currentBgId: 'sunwood',
    currentBg: ROOM_BACKGROUNDS[0],
    backgroundThemes: ROOM_BACKGROUNDS,
    characterQuote: '今天也要开心呀～ ❤️',
    showHeartAnim: false,

    // 工具箱抽屉
    showToolboxDrawer: false,
    activeDrawerTab: 'outfits', // 'outfits' | 'backgrounds' | 'pets' | 'tools'

    // 荣誉徽章弹窗
    showHonorBadgeModal: false,
    selectedBadge: {},

    // Focus Timer
    isFocusRunning: false,
    focusSecondsRemaining: 15 * 60,
    focusFormattedTime: '15:00',

    // Calendar
    calendarDays: [],

    // Modals
    showAlbumModal: false,
    showNoteModal: false,
    showFocusModal: false,
    showCalendarModal: false,
    showSettingsModal: false,

    newNoteTitle: '',
    newNoteContent: ''
  },

  onShow() {
    this.refreshPageData();
    this.initCalendarData();
  },

  onHide() {
    this.clearTimer();
  },

  onUnload() {
    this.clearTimer();
  },

  clearTimer() {
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
    }
  },

  refreshPageData() {
    const state = Store.getState();
    const activePet = state.pets.find(p => p.id === state.activePetId) || state.pets[0];
    const expPercent = Math.min(100, Math.round((state.user.exp / state.user.maxExp) * 100));

    // 计算已穿戴装备状态
    const equippedMap = {};
    state.wardrobe.forEach(item => {
      equippedMap[item.key] = {
        equipped: item.equipped,
        icon: item.icon,
        name: item.name
      };
    });

    const equippedCount = state.wardrobe.filter(w => w.equipped).length;

    // 读取背景偏好
    const savedBgId = state.roomBgId || 'sunwood';
    const currentBg = ROOM_BACKGROUNDS.find(b => b.id === savedBgId) || ROOM_BACKGROUNDS[0];

    // 检测云端同步状态
    const syncStatus = CloudService.isOnline() ? 'synced' : 'local';

    this.setData({
      user: state.user,
      pets: state.pets,
      activePetId: state.activePetId,
      activePet,
      wardrobe: state.wardrobe,
      unlockedOutfitCount: equippedCount,
      equippedItems: equippedMap,
      achievements: state.achievements,
      album: state.album,
      notes: state.notes,
      focusStats: state.focusStats,
      expPercent,
      syncStatus,
      currentBgId: savedBgId,
      currentBg
    });
  },

  // 1. 工具箱抽屉开关
  openToolboxDrawer() {
    this.setData({ showToolboxDrawer: true });
  },

  closeToolboxDrawer() {
    this.setData({ showToolboxDrawer: false });
  },

  switchDrawerTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeDrawerTab: tab });
  },

  // 2. 换装逻辑 (独立图层切换与持久化)
  handleToggleOutfit(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;

    Store.toggleWardrobeItem(key);
    this.refreshPageData();

    const item = this.data.wardrobe.find(w => w.key === key);
    const isEquipped = item ? item.equipped : true;
    wx.showToast({
      title: isEquipped ? `已穿戴「${item.name}」` : `已卸下「${item.name}」`,
      icon: 'none'
    });
  },

  // 3. 房间背景切换 (独立于角色与宠物)
  handleSwitchBackground(e) {
    const id = e.currentTarget.dataset.id;
    if (id === this.data.currentBgId) return;

    const targetBg = ROOM_BACKGROUNDS.find(b => b.id === id);
    if (!targetBg) return;

    const state = Store.getState();
    state.roomBgId = id;
    Store.saveState(state);

    this.setData({
      currentBgId: id,
      currentBg: targetBg
    });

    wx.showToast({
      title: `已切换房间背景至「${targetBg.name}」`,
      icon: 'success'
    });
  },

  // 4. 陪伴宠物切换
  handleSelectCompanionPet(e) {
    const id = e.currentTarget.dataset.id;
    const res = Store.setActivePet(id);
    this.refreshPageData();
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none'
    });
  },

  goToPetMeadow() {
    this.closeToolboxDrawer();
    wx.navigateTo({ url: '/pages/pets/pets' });
  },

  // 5. 荣誉展示墙与徽章
  openHonorWallModal() {
    // 默认展示第一个徽章或列表
    this.setData({
      selectedBadge: this.data.achievements[0] || {},
      showHonorBadgeModal: true
    });
  },

  handleTapHonorBadge(e) {
    const id = e.currentTarget.dataset.id;
    const badge = this.data.achievements.find(a => a.id === id);
    if (badge) {
      this.setData({
        selectedBadge: badge,
        showHonorBadgeModal: true
      });
    }
  },

  closeHonorBadgeModal() {
    this.setData({ showHonorBadgeModal: false });
  },

  // 6. 角色与宠物场景互动
  handleTapCharacter() {
    const quotes = [
      '今天也要开心呀～ ❤️',
      '多喝温水，放慢脚步，生活自带光芒！🌿',
      '在不止日常，遇见更好的自己！',
      '每一次小小的生活记录，都是成长的脚印～',
      '窗外的阳光好温暖，你今天过得怎么样？'
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    this.setData({ characterQuote: pick });
    wx.showToast({ title: pick, icon: 'none' });
  },

  handleTapRoomPet() {
    this.setData({ showHeartAnim: true });
    setTimeout(() => {
      this.setData({ showHeartAnim: false });
    }, 1200);

    const activeId = this.data.activePetId || 'orange_cat';
    Store.petAnimal(activeId);
    this.refreshPageData();
    wx.showToast({
      title: `${this.data.activePet.name}：呼噜呼噜~ 轻轻蹭了蹭你 ❤️`,
      icon: 'none'
    });
  },

  // 7. 工具箱内工具点击
  handleToolClick(e) {
    const tool = e.currentTarget.dataset.tool;
    this.closeToolboxDrawer();

    if (tool === 'camera') {
      wx.redirectTo({ url: '/pages/explore/explore' });
    } else if (tool === 'album') {
      this.setData({ showAlbumModal: true });
    } else if (tool === 'note') {
      this.setData({ showNoteModal: true });
    } else if (tool === 'calendar') {
      this.setData({ showCalendarModal: true });
    } else if (tool === 'focus') {
      this.setData({ showFocusModal: true });
    } else if (tool === 'settings') {
      this.setData({ showSettingsModal: true });
    }
  },

  // 8. 云端状态检查与手动同步
  checkSyncStatus() {
    const isOnline = CloudService.isOnline();
    if (isOnline) {
      wx.showModal({
        title: '云端同步正常',
        content: '你的成长档案已安全同步至微信云开发服务器。更换手机登录相同微信账号可随时找回。',
        showCancel: false
      });
    } else {
      wx.showModal({
        title: '本地存储模式 (离线安全)',
        content: '当前未配置微信云开发环境 ID（或处于离线模式）。所有成长数据均完整保存在本机，可离线使用。\n\n如需开启云端跨设备同步，请在 config/cloud.js 中填入已开通的环境 ID。',
        confirmText: '我知道了',
        showCancel: false
      });
    }
  },

  async handleManualSync() {
    wx.showLoading({ title: '正在检测云端...' });
    const isOnline = CloudService.isOnline();
    if (!isOnline) {
      wx.hideLoading();
      wx.showModal({
        title: '尚未连接云开发环境',
        content: '当前为本地存储模式。若已在微信开发者工具开通云开发，请将 envId 填入 config/cloud.js 并重新编译。',
        showCancel: false
      });
      return;
    }

    const state = Store.getState();
    const res = await CloudService.pushUserData(state);
    wx.hideLoading();
    if (res.success) {
      this.setData({ syncStatus: 'synced' });
      wx.showToast({ title: '云端同步成功！', icon: 'success' });
    } else {
      wx.showToast({ title: res.message || '同步失败', icon: 'none' });
    }
  },

  // 9. 相册、便签、专注时钟、日历
  closeAlbumModal() { this.setData({ showAlbumModal: false }); },
  closeNoteModal() { this.setData({ showNoteModal: false }); },
  closeFocusModal() { this.setData({ showFocusModal: false }); },
  closeCalendarModal() { this.setData({ showCalendarModal: false }); },
  closeSettingsModal() { this.setData({ showSettingsModal: false }); },

  onNoteTitleInput(e) { this.setData({ newNoteTitle: e.detail.value }); },
  onNoteContentInput(e) { this.setData({ newNoteContent: e.detail.value }); },

  handleSaveNote() {
    if (!this.data.newNoteTitle.trim() && !this.data.newNoteContent.trim()) {
      wx.showToast({ title: '请填写便签内容～', icon: 'none' });
      return;
    }
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    Store.addNote({
      id: 'note_' + Date.now(),
      title: this.data.newNoteTitle.trim() || '日常便签',
      content: this.data.newNoteContent.trim(),
      date: dateStr
    });
    this.setData({ newNoteTitle: '', newNoteContent: '' });
    this.refreshPageData();
    wx.showToast({ title: '便签已保存！', icon: 'success' });
  },

  handleDeleteNote(e) {
    const id = e.currentTarget.dataset.id;
    Store.deleteNote(id);
    this.refreshPageData();
    wx.showToast({ title: '已删除便签', icon: 'none' });
  },

  handleToggleFocusTimer() {
    if (this.data.isFocusRunning) {
      this.clearTimer();
      this.setData({ isFocusRunning: false });
      wx.showToast({ title: '已暂停专注', icon: 'none' });
    } else {
      this.setData({ isFocusRunning: true });
      focusInterval = setInterval(() => {
        let remaining = this.data.focusSecondsRemaining - 1;
        if (remaining <= 0) {
          this.clearTimer();
          Store.addFocusTime(15);
          this.refreshPageData();
          this.setData({
            isFocusRunning: false,
            focusSecondsRemaining: 15 * 60,
            focusFormattedTime: '15:00'
          });
          wx.showModal({
            title: '🎉 专注达成！',
            content: '完成 15 分钟专注，获得 +30 经验值与 +2 小星星！',
            showCancel: false
          });
          return;
        }
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        this.setData({
          focusSecondsRemaining: remaining,
          focusFormattedTime: `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        });
      }, 1000);
    }
  },

  handleResetFocusTimer() {
    this.clearTimer();
    this.setData({
      isFocusRunning: false,
      focusSecondsRemaining: 15 * 60,
      focusFormattedTime: '15:00'
    });
  },

  initCalendarData() {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({
        day: i,
        checked: i <= 12 || i === 15 || i === 23,
        today: i === 24
      });
    }
    this.setData({ calendarDays: days });
  },

  handleResetAllData() {
    wx.showModal({
      title: '确认重置数据？',
      content: '这将清空所有本地记录并恢复初始演示数据。',
      success: (res) => {
        if (res.confirm) {
          Store.resetState();
          this.refreshPageData();
          wx.showToast({ title: '已恢复初始状态', icon: 'success' });
          this.setData({ showSettingsModal: false });
        }
      }
    });
  },

  handleShowAbout() {
    wx.showModal({
      title: '不止日常 Beyond Daily',
      content: '治愈系生活自律与萌宠陪伴小程序\nv1.3.0 · 生活记录游戏化\n在不止日常，遇见更好的自己～',
      showCancel: false
    });
  },

  handleChangeWeather() {
    wx.showToast({ title: '湖北 · 云梦 22°C 晴天', icon: 'none' });
  },

  goToMineProfile() {
    wx.redirectTo({ url: '/pages/mine/mine' });
  }
});
