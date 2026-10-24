const Store = require('./utils/store.js');

App({
  onLaunch() {
    console.log('不止日常 小程序启动中...');
    const state = Store.getState();
    Store.saveState(state);
  },

  globalData: {
    store: Store,
    statusBarHeight: 20
  }
});
