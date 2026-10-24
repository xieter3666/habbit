/**
 * utils/cloud.js
 * 微信云开发客户端调用层
 * 实现「云端持久化 / 本地安全离线」双模平滑切换
 */

const CloudConfig = require('../config/cloud.js');

let isCloudInitialized = false;
let currentOpenid = null;

const CloudService = {
  // 1. 初始化云开发
  init() {
    if (typeof wx === 'undefined' || !wx.cloud) {
      console.log('[CloudService] 当前环境不支持 wx.cloud，启用纯本地模式');
      return false;
    }

    if (!CloudConfig.env || CloudConfig.env.trim() === '') {
      console.log('[CloudService] 未配置 cloud.env，启用本地安全模式运行');
      return false;
    }

    try {
      wx.cloud.init({
        env: CloudConfig.env,
        traceUser: true
      });
      isCloudInitialized = true;
      console.log('[CloudService] 云开发环境初始化成功, env:', CloudConfig.env);
      return true;
    } catch (e) {
      console.error('[CloudService] 云开发初始化失败:', e);
      isCloudInitialized = false;
      return false;
    }
  },

  // 2. 获取用户可信身份 OPENID
  async getOpenid() {
    if (currentOpenid) return currentOpenid;

    // 先读本地缓存中的 OPENID
    try {
      const cached = wx.getStorageSync('BUZHI_USER_OPENID');
      if (cached) {
        currentOpenid = cached;
      }
    } catch (e) {}

    if (!isCloudInitialized) {
      if (!currentOpenid) {
        currentOpenid = 'local_user_' + Date.now();
        wx.setStorageSync('BUZHI_USER_OPENID', currentOpenid);
      }
      return currentOpenid;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'login'
      });
      if (res && res.result && res.result.openid) {
        currentOpenid = res.result.openid;
        wx.setStorageSync('BUZHI_USER_OPENID', currentOpenid);
        return currentOpenid;
      }
    } catch (e) {
      console.warn('[CloudService] 获取云端 openid 失败，降级使用本地身份:', e);
    }

    return currentOpenid;
  },

  // 3. 上传同步至云端
  async pushUserData(stateData) {
    if (!isCloudInitialized) {
      return {
        success: false,
        mode: 'local',
        message: '当前为本地存储模式（未连接云端）'
      };
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'syncUserData',
        data: {
          action: 'push',
          data: stateData
        }
      });
      if (res && res.result && res.result.success) {
        return {
          success: true,
          mode: 'cloud',
          message: '数据已安全同步至云端'
        };
      }
      return {
        success: false,
        mode: 'local',
        message: (res && res.result && res.result.error) || '云端同步未完成'
      };
    } catch (e) {
      return {
        success: false,
        mode: 'local',
        message: '网络异常，已保存在本地'
      };
    }
  },

  // 4. 从云端拉取数据
  async pullUserData() {
    if (!isCloudInitialized) {
      return { success: false, mode: 'local' };
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'syncUserData',
        data: { action: 'pull' }
      });
      if (res && res.result && res.result.success && res.result.data) {
        return {
          success: true,
          mode: 'cloud',
          data: res.result.data
        };
      }
    } catch (e) {
      console.warn('[CloudService] 拉取云端数据失败:', e);
    }
    return { success: false, mode: 'local' };
  },

  // 5. 当前云连接状态判断
  isOnline() {
    return isCloudInitialized;
  }
};

module.exports = CloudService;
