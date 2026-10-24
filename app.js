const Store = require('./utils/store.js');
const CloudService = require('./utils/cloud.js');

App({
  onLaunch() {
    console.log('不止日常 小程序启动中...');

    // 1. 初始化云开发能力 (若未配置环境自动降级为本地模式)
    CloudService.init();

    // 2. 初始化用户身份并载入数据
    CloudService.getOpenid().then(openid => {
      console.log('[App] 用户身份标识就绪:', openid);
    });

    // 3. 计算系统状态栏与微信胶囊安全距离
    let statusBarHeight = 24;
    let capsuleTop = 48;
    try {
      const sys = wx.getSystemInfoSync();
      statusBarHeight = sys.statusBarHeight || 24;
      const menu = wx.getMenuButtonBoundingClientRect();
      if (menu && menu.top) {
        capsuleTop = menu.top;
      }
    } catch (e) {}

    this.globalData.statusBarHeight = statusBarHeight;
    this.globalData.capsuleTop = capsuleTop;

    const state = Store.getState();
    Store.saveState(state);
  },

  globalData: {
    store: Store,
    cloud: CloudService,
    statusBarHeight: 24,
    capsuleTop: 48
  }
});
