/**
 * config/cloud.js
 * 微信云开发环境与数据集合配置
 * 支持本地离线模式与云端持久化双模自适应切换
 */

const CloudConfig = {
  // 微信云开发环境 ID (若未开通或未配置，小程序将自动降级为「本地安全模式」平滑运行)
  env: '', 

  // 云数据库集合定义
  collections: {
    users: 'buzhi_users',      // 用户成长档案、等级、经验、装扮、宠物
    records: 'buzhi_records',  // 每日任务打卡流水与挑战历史记录
    photos: 'buzhi_photos'     // 生活回忆相册
  },

  // 是否已配置有效云环境
  isCloudAvailable() {
    return typeof wx !== 'undefined' && !!wx.cloud && !!this.env && this.env.trim().length > 0;
  }
};

module.exports = CloudConfig;
