const Store = require('../../utils/store.js');
const Assets = require('../../config/assets.js');
const CloudService = require('../../utils/cloud.js');

let focusInterval = null;

Page({
  data: {
    assets: Assets,
    viewMode: 'list', // 默认作为独立个人中心 (Page C)，角色房间已独立至 pages/room/room (Page B)
    syncStatus: 'local',
    user: {},
    pets: [],
    activePetId: 'orange_cat',
    activePet: {},
    wardrobe: [],
    achievements: [],
    album: [],
    notes: [],
    focusStats: {},
    messages: [],
    exchangeRecords: [],
    hasUnreadMsg: true,
    expPercent: 48,

    sceneBgImg: '/assets/mine/scene_bg.jpg',
    characterQuote: '今天也要开心呀～ ❤️',
    showHeartAnim: false,

    // Focus Timer
    isFocusRunning: false,
    focusSecondsRemaining: 15 * 60,
    focusFormattedTime: '15:00',

    // Calendar
    calendarDays: [],

    // Modals visibility
    showWardrobeModal: false,
    showPetModal: false,
    showAlbumModal: false,
    showNoteModal: false,
    showFocusModal: false,
    showCalendarModal: false,
    showAchievementsModal: false,
    showProfileModal: false,
    showMessagesModal: false,
    showExchangeModal: false,
    showFeedbackModal: false,
    showAboutModal: false,

    // Form inputs
    newNoteTitle: '',
    newNoteContent: '',
    editName: '',
    editBio: '',
    editLoc: ''
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
    const hasUnread = state.messages.some(m => !m.read);

    this.setData({
      user: state.user,
      pets: state.pets,
      activePetId: state.activePetId,
      activePet,
      wardrobe: state.wardrobe,
      achievements: state.achievements,
      album: state.album,
      notes: state.notes,
      focusStats: state.focusStats,
      messages: state.messages,
      exchangeRecords: state.exchangeRecords,
      hasUnreadMsg: hasUnread,
      expPercent,
      syncStatus: CloudService.isOnline() ? 'synced' : 'local',
      editName: state.user.name,
      editBio: state.user.bio,
      editLoc: state.user.weather.loc
    });
  },

  handleCheckCloudSync() {
    const isOnline = CloudService.isOnline();
    if (isOnline) {
      wx.showModal({
        title: '云端同步正常',
        content: '你的成长记录已安全保存在微信云开发环境。',
        showCancel: false
      });
    } else {
      wx.showModal({
        title: '本地存储模式 (离线安全)',
        content: '当前为本地安全存储模式。若已开通微信云开发，请在 config/cloud.js 中配置环境 ID (envId)，重新编译后即可开启跨设备持久化。',
        confirmText: '我知道了',
        showCancel: false
      });
    }
  },

  // Switch between Cozy Room Scene and Profile List
  switchViewMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ viewMode: mode });
  },

  // Character quotes on room tap
  handleTapCharacter() {
    const quotes = [
      '今天也要开心呀～ ❤️',
      '多喝温水，偶尔发发呆也很棒哦～',
      '在不止日常，遇见更好的自己！🌿',
      '看着窗外的白云，心情就变得好柔软呢～',
      '谢谢你一直在身边陪伴我！'
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    this.setData({ characterQuote: pick });
    wx.showToast({ title: pick, icon: 'none' });
  },

  // Tap room pet cat
  handleTapRoomPet() {
    this.setData({ showHeartAnim: true });
    setTimeout(() => {
      this.setData({ showHeartAnim: false });
    }, 1200);

    const res = Store.petAnimal('orange_cat');
    this.refreshPageData();
    wx.showToast({
      title: '橘宝：呼噜呼噜~ 蹭了蹭你的手 ❤️',
      icon: 'none'
    });
  },

  // Toolbox actions
  handleToolboxClick(e) {
    const tool = e.currentTarget.dataset.tool;
    if (tool === 'camera') {
      wx.navigateTo({ url: '/pages/explore/explore' });
    } else if (tool === 'album') {
      this.setData({ showAlbumModal: true });
    } else if (tool === 'note') {
      this.setData({ showNoteModal: true });
    } else if (tool === 'calendar') {
      this.setData({ showCalendarModal: true });
    } else if (tool === 'focus') {
      this.setData({ showFocusModal: true });
    } else if (tool === 'more') {
      this.openSettingsModal();
    }
  },

  openToolboxMoreModal() {
    this.openSettingsModal();
  },

  // 1. Wardrobe
  openWardrobeModal() {
    this.setData({ showWardrobeModal: true });
  },
  closeWardrobeModal() {
    this.setData({ showWardrobeModal: false });
  },
  handleToggleOutfit(e) {
    const key = e.currentTarget.dataset.key;
    if (key) {
      Store.toggleWardrobeItem(key);
      this.refreshPageData();
      const item = this.data.wardrobe.find(w => w.key === key);
      const isEquipped = item ? item.equipped : true;
      wx.showToast({
        title: isEquipped ? '已穿戴该装扮～' : '已卸下该装扮～',
        icon: 'success'
      });
    }
  },

  // 2. Pet selection
  openPetSelectorModal() {
    this.setData({ showPetModal: true });
  },
  closePetModal() {
    this.setData({ showPetModal: false });
  },
  handleSelectPet(e) {
    const id = e.currentTarget.dataset.id;
    const res = Store.setActivePet(id);
    this.refreshPageData();
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none'
    });
    if (res.success) {
      this.setData({ showPetModal: false });
    }
  },

  // 3. Album
  openAlbumModal() {
    this.setData({ showAlbumModal: true });
  },
  closeAlbumModal() {
    this.setData({ showAlbumModal: false });
  },

  // 4. Notes
  openNoteModal() {
    this.setData({ showNoteModal: true });
  },
  closeNoteModal() {
    this.setData({ showNoteModal: false });
  },
  onNoteTitleInput(e) {
    this.setData({ newNoteTitle: e.detail.value });
  },
  onNoteContentInput(e) {
    this.setData({ newNoteContent: e.detail.value });
  },
  handleSaveNote() {
    if (!this.data.newNoteTitle.trim() && !this.data.newNoteContent.trim()) {
      wx.showToast({ title: '写点什么再保存吧～', icon: 'none' });
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
    wx.showToast({ title: '便签保存成功！', icon: 'success' });
  },
  handleDeleteNote(e) {
    const id = e.currentTarget.dataset.id;
    Store.deleteNote(id);
    this.refreshPageData();
    wx.showToast({ title: '已删除便签', icon: 'none' });
  },

  // 5. Focus Timer
  openFocusModal() {
    this.setData({ showFocusModal: true });
  },
  closeFocusModal() {
    this.setData({ showFocusModal: false });
  },
  handleToggleFocusTimer() {
    if (this.data.isFocusRunning) {
      this.clearTimer();
      this.setData({ isFocusRunning: false });
    } else {
      this.setData({ isFocusRunning: true });
      focusInterval = setInterval(() => {
        let sec = this.data.focusSecondsRemaining - 1;
        if (sec <= 0) {
          this.handleFinishFocusSession();
          return;
        }
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        this.setData({
          focusSecondsRemaining: sec,
          focusFormattedTime: formatted
        });
      }, 1000);
    }
  },
  handleFinishFocusSession() {
    this.clearTimer();
    Store.addFocusTime(15);
    this.setData({
      isFocusRunning: false,
      focusSecondsRemaining: 15 * 60,
      focusFormattedTime: '15:00',
      showFocusModal: false
    });
    this.refreshPageData();
    wx.showToast({
      title: '专注达成！获得 +30 经验值，+2 小星星！',
      icon: 'success'
    });
  },

  // 6. Calendar
  openCalendarModal() {
    this.setData({ showCalendarModal: true });
  },
  closeCalendarModal() {
    this.setData({ showCalendarModal: false });
  },
  initCalendarData() {
    const days = [];
    const today = 24;
    for (let i = 1; i <= 31; i++) {
      days.push({
        day: i,
        today: i === today,
        checked: i <= today && (i % 2 === 0 || i % 3 === 0 || i === today)
      });
    }
    this.setData({ calendarDays: days });
  },

  // 7. Achievements
  openAchievementsModal() {
    this.setData({ showAchievementsModal: true });
  },
  closeAchievementsModal() {
    this.setData({ showAchievementsModal: false });
  },
  handleTapBadge(e) {
    const id = e.currentTarget.dataset.id;
    const ach = this.data.achievements.find(a => a.id === id);
    if (!ach) return;
    wx.showModal({
      title: ach.name,
      content: `${ach.desc}\n达成状态：${ach.unlocked ? '已解锁 ✓' : '未解锁 🔒'}`,
      showCancel: false,
      confirmText: '知道啦',
      confirmColor: '#5C7C57'
    });
  },

  // 8. Profile Edit
  openProfileModal() {
    this.setData({ showProfileModal: true });
  },
  closeProfileModal() {
    this.setData({ showProfileModal: false });
  },
  onEditNameInput(e) { this.setData({ editName: e.detail.value }); },
  onEditBioInput(e) { this.setData({ editBio: e.detail.value }); },
  onEditLocInput(e) { this.setData({ editLoc: e.detail.value }); },
  handleSaveProfile() {
    Store.updateUserProfile({
      name: this.data.editName.trim() || '苗苗',
      bio: this.data.editBio.trim() || '在不止日常，遇见更好的自己～',
      weather: Object.assign({}, this.data.user.weather, { loc: this.data.editLoc.trim() || '湖北 · 云梦' })
    });
    this.setData({ showProfileModal: false });
    this.refreshPageData();
    wx.showToast({ title: '资料更新成功！', icon: 'success' });
  },

  // 9. Messages
  openMessagesModal() {
    this.setData({ showMessagesModal: true });
  },
  closeMessagesModal() {
    this.setData({ showMessagesModal: false });
  },

  // 10. Exchange Records
  openExchangeModal() {
    this.setData({ showExchangeModal: true });
  },
  closeExchangeModal() {
    this.setData({ showExchangeModal: false });
  },

  // 11. Feedback
  openFeedbackModal() {
    this.setData({ showFeedbackModal: true });
  },
  closeFeedbackModal() {
    this.setData({ showFeedbackModal: false });
  },
  handleSubmitFeedback() {
    this.setData({ showFeedbackModal: false });
    wx.showToast({ title: '感谢你的宝贵心声！❤️', icon: 'success' });
  },

  // 12. About
  openAboutModal() {
    this.setData({ showAboutModal: true });
  },
  closeAboutModal() {
    this.setData({ showAboutModal: false });
  },

  // Settings & Weather
  openSettingsModal() {
    wx.showActionSheet({
      itemList: ['切换视图模式', '编辑个人资料', '重置体验数据', '关于不止日常'],
      success: (res) => {
        if (res.tapIndex === 0) {
          const next = this.data.viewMode === 'scene' ? 'list' : 'scene';
          this.setData({ viewMode: next });
        } else if (res.tapIndex === 1) {
          this.openProfileModal();
        } else if (res.tapIndex === 2) {
          Store.resetState();
          this.refreshPageData();
          wx.showToast({ title: '体验数据已重置', icon: 'none' });
        } else if (res.tapIndex === 3) {
          this.openAboutModal();
        }
      }
    });
  },

  handleChangeWeather() {
    const weathers = [
      { temp: '22°C', cond: '晴', loc: '湖北 · 云梦', icon: '☀️' },
      { temp: '19°C', cond: '多云', loc: '浙江 · 杭州', icon: '⛅' },
      { temp: '24°C', cond: '晴朗', loc: '云南 · 大理', icon: '🌤️' }
    ];
    const pick = weathers[Math.floor(Math.random() * weathers.length)];
    Store.updateUserProfile({ weather: pick });
    this.refreshPageData();
    wx.showToast({ title: `天气已切换：${pick.loc} ${pick.temp} ${pick.cond}`, icon: 'none' });
  },

  openGrowthDialog() {
    wx.showModal({
      title: '生活探索家称号',
      content: '当前称号：生活探索家 ⭐\n在生活中坚持记录美好，累计完成多项日常任务与早睡挑战！下一称号：森林守护者（Lv.5解锁）',
      showCancel: false,
      confirmText: '继续前行',
      confirmColor: '#5C7C57'
    });
  }
});
