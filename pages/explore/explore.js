const Store = require('../../utils/store.js');
const Assets = require('../../config/assets.js');

Page({
  data: {
    assets: Assets,
    user: {},
    dailyTasks: [],
    weeklyChallenge: {},
    dailyReward: {},
    luckyFortune: {},
    expPercent: 48,
    completedTasksCount: 1,

    // Dialogs state
    showRewardModal: false,
    showCameraModal: false,
    showReadModal: false,
    showAddTaskModal: false,

    // Temp form states
    photoTempUrl: '',
    photoCaption: '',
    readingMinutes: 15,
    newTaskTitle: '',
    newTaskDesc: '',

    petEncouragementText: '再努力一点就能解锁新成就哦！'
  },

  onShow() {
    this.refreshPageData();
  },

  onPullDownRefresh() {
    this.refreshPageData();
    wx.stopPullDownRefresh();
  },

  refreshPageData() {
    const state = Store.getState();
    const completedTasksCount = state.dailyTasks.filter(t => t.done).length;
    const expPercent = Math.min(100, Math.round((state.user.exp / state.user.maxExp) * 100));

    this.setData({
      user: state.user,
      dailyTasks: state.dailyTasks,
      weeklyChallenge: state.weeklyChallenge,
      dailyReward: state.dailyReward,
      luckyFortune: state.luckyFortune,
      completedTasksCount,
      expPercent
    });
  },

  // 1. Task actions
  handleTaskAction(e) {
    const { id, type } = e.currentTarget.dataset;
    const task = this.data.dailyTasks.find(t => t.id === id);

    if (!task) return;

    if (task.done) {
      // Toggle back to unfinished
      Store.toggleTask(id);
      this.refreshPageData();
      wx.showToast({ title: '已恢复未完成状态', icon: 'none' });
      return;
    }

    if (type === 'camera') {
      this.setData({
        showCameraModal: true,
        photoTempUrl: '',
        photoCaption: ''
      });
    } else if (type === 'read') {
      this.setData({
        showReadModal: true,
        readingMinutes: 15
      });
    } else {
      // Direct toggle
      Store.toggleTask(id);
      this.refreshPageData();
      wx.showToast({
        title: `打卡成功！+${task.stars}小星星，+${task.exp}经验值`,
        icon: 'success'
      });
    }
  },

  // 2. Camera task modal
  handleChoosePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        if (res.tempFiles && res.tempFiles.length > 0) {
          this.setData({
            photoTempUrl: res.tempFiles[0].tempFilePath
          });
        }
      },
      fail: () => {
        // Fallback for simulation / mock environment
        this.setData({
          photoTempUrl: '/assets/pets/meadow_full.jpg'
        });
      }
    });
  },

  onCaptionInput(e) {
    this.setData({ photoCaption: e.detail.value });
  },

  handleSavePhotoRecord() {
    const imgUrl = this.data.photoTempUrl || '/assets/pets/meadow_full.jpg';
    const caption = this.data.photoCaption || '记录生活的小确幸瞬间～';

    Store.addPhoto({
      id: 'photo_' + Date.now(),
      title: '生活瞬间打卡',
      desc: caption,
      image: imgUrl,
      date: '今天 ' + new Date().getHours() + ':' + String(new Date().getMinutes()).padStart(2, '0')
    });

    Store.toggleTask('cam');
    this.setData({ showCameraModal: false });
    this.refreshPageData();

    wx.showToast({
      title: '记录保存成功！+5 小星星',
      icon: 'success'
    });
  },

  closeCameraModal() {
    this.setData({ showCameraModal: false });
  },

  // 3. Reading modal
  handleFinishReading() {
    Store.addFocusTime(15);
    Store.toggleTask('book');
    this.setData({ showReadModal: false });
    this.refreshPageData();

    wx.showToast({
      title: '阅读达成！+5 小星星，+15专注分',
      icon: 'success'
    });
  },

  closeReadModal() {
    this.setData({ showReadModal: false });
  },

  // 4. Daily Reward
  openDailyReward() {
    this.setData({ showRewardModal: true });
  },

  closeRewardModal() {
    this.setData({ showRewardModal: false });
  },

  handleClaimReward() {
    const res = Store.claimDailyReward();
    this.refreshPageData();
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none',
      duration: 2500
    });
    if (res.success) {
      setTimeout(() => {
        this.setData({ showRewardModal: false });
      }, 1000);
    }
  },

  // 5. Weekly Challenge
  handlePunchChallenge() {
    const res = Store.punchWeeklyChallenge();
    this.refreshPageData();
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none',
      duration: 2500
    });
  },

  openChallengeModal() {
    this.handlePunchChallenge();
  },

  // 6. Fortune Draw
  handleDrawFortune() {
    const res = Store.drawLuckyFortune();
    this.refreshPageData();
    wx.showToast({
      title: `签文更新：${res.fortune.luck}`,
      icon: 'none'
    });
  },

  // 7. Add custom habit
  openAddTaskDialog() {
    this.setData({
      showAddTaskModal: true,
      newTaskTitle: '',
      newTaskDesc: ''
    });
  },

  closeAddTaskModal() {
    this.setData({ showAddTaskModal: false });
  },

  onNewTaskTitleInput(e) {
    this.setData({ newTaskTitle: e.detail.value });
  },

  onNewTaskDescInput(e) {
    this.setData({ newTaskDesc: e.detail.value });
  },

  handleCreateNewTask() {
    if (!this.data.newTaskTitle.trim()) {
      wx.showToast({ title: '请输入任务名称哦', icon: 'none' });
      return;
    }
    Store.addTask(this.data.newTaskTitle.trim(), this.data.newTaskDesc.trim());
    this.setData({ showAddTaskModal: false });
    this.refreshPageData();
    wx.showToast({ title: '新挑战添加成功！', icon: 'success' });
  },

  // 8. Pet encouragement interaction
  handleEncouragePet() {
    const quotes = [
      '再努力一点就能解锁新成就哦！🐾',
      '汪汪！今天你已经很棒啦，继续加油！⭐',
      '摸摸小脑袋，烦恼全抛开～ 🌸',
      '每完成一个小任务，地球Online就会多一份可爱！'
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    this.setData({ petEncouragementText: pick });
    wx.showToast({ title: pick, icon: 'none' });
  },

  // 9. Growth dialog
  openGrowthDialog() {
    wx.showModal({
      title: '生活探索档案',
      content: `当前拥有 ${this.data.user.stars} 颗小星星，等级 Lv.${this.data.user.level}（${this.data.user.title}），已解锁 ${this.data.user.achievementsCount} 枚荣誉徽章与 ${this.data.user.collectionsCount} 份生活收藏。保持热爱，奔赴山海～`,
      showCancel: false,
      confirmText: '继续探索',
      confirmColor: '#5C7C57'
    });
  }
});
