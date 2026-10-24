// 云函数：syncUserData
// 处理用户成长数据云端原子写入与拉取
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const USERS_COLLECTION = 'buzhi_users';

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (!openid) {
    return {
      success: false,
      error: '无法获取微信用户身份凭据 (OPENID)'
    };
  }

  const action = event.action || 'sync'; // 'pull' | 'push' | 'sync'
  const clientData = event.data;

  try {
    const userDocRef = db.collection(USERS_COLLECTION).doc(openid);
    const getRes = await userDocRef.get().catch(() => null);

    if (action === 'pull') {
      if (getRes && getRes.data) {
        return {
          success: true,
          data: getRes.data,
          source: 'cloud'
        };
      }
      return {
        success: true,
        data: null,
        message: '云端尚无历史存档'
      };
    }

    // push 或 sync 模式：云端更新或创建
    const now = new Date();
    const payload = {
      _openid: openid,
      user: clientData.user,
      dailyTasks: clientData.dailyTasks,
      weeklyChallenge: clientData.weeklyChallenge,
      dailyReward: clientData.dailyReward,
      activePetId: clientData.activePetId,
      pets: clientData.pets,
      wardrobe: clientData.wardrobe,
      achievements: clientData.achievements,
      updatedAt: now
    };

    if (getRes && getRes.data) {
      // 增量合并，保护等级和经验不回退
      const cloudExp = (getRes.data.user && getRes.data.user.exp) || 0;
      const clientExp = (clientData.user && clientData.user.exp) || 0;
      if (cloudExp > clientExp && !event.forceOverride) {
        payload.user.exp = cloudExp;
        payload.user.level = Math.max(payload.user.level, getRes.data.user.level);
      }
      await userDocRef.update({ data: payload });
    } else {
      payload.createdAt = now;
      await userDocRef.set({ data: payload });
    }

    return {
      success: true,
      message: '云端同步成功',
      updatedAt: now.toISOString()
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || '云端同步异常'
    };
  }
};
