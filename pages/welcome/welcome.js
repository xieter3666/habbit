Page({
  handleEnterApp() {
    wx.reLaunch({
      url: '/pages/explore/explore'
    });
  }
});
