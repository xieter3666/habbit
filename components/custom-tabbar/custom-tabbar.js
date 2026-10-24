const Assets = require('../../config/assets.js');

Component({
  properties: {
    show: {
      type: Boolean,
      value: true
    },
    active: {
      type: String,
      value: 'explore'
    }
  },

  data: {
    assets: Assets
  },

  methods: {
    switchTab(e) {
      const target = e.currentTarget.dataset.tab;
      if (target === this.data.active) return;

      const pageMap = {
        explore: '/pages/explore/explore',
        room: '/pages/room/room',
        mine: '/pages/mine/mine',
        pets: '/pages/pets/pets'
      };

      const url = pageMap[target];
      if (!url) return;

      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && ('/' + currentPage.route) === url) return;

      // 使用 wx.redirectTo 平滑切换主 Tab，避免 reLaunch 导致整个应用重新加载
      wx.redirectTo({
        url: url
      });
    }
  }
});
