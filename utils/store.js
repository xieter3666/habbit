const STORAGE_KEY = 'BUZHI_DAILY_STATE_V1';

const DEFAULT_STATE = {
  user: {
    name: '苗苗',
    leaf: ' 🌿',
    bio: '在不止日常，遇见更好的自己～',
    level: 3,
    exp: 240,
    maxExp: 500,
    title: '生活探索家',
    stars: 12,
    achievementsCount: 3,
    medalsCount: 5,
    collectionsCount: 12,
    avatar: '/assets/user/avatar.png',
    weather: {
      temp: '22°C',
      cond: '晴',
      loc: '湖北 · 云梦',
      icon: '☀️'
    }
  },
  dailyTasks: [
    {
      id: 'cam',
      title: '记录生活',
      desc: '拍一张你今天的生活瞬间',
      exp: 10,
      stars: 5,
      icon: '/assets/icons/cam.png',
      done: false,
      buttonText: '去完成',
      type: 'camera'
    },
    {
      id: 'clean',
      title: '整理空间',
      desc: '整理一个小角落',
      exp: 10,
      stars: 5,
      icon: '/assets/icons/list.png',
      done: true,
      buttonText: '已完成',
      type: 'check'
    },
    {
      id: 'book',
      title: '阅读计划',
      desc: '读书或听书15分钟',
      exp: 10,
      stars: 5,
      icon: '/assets/icons/book.png',
      done: false,
      buttonText: '去完成',
      type: 'read'
    }
  ],
  weeklyChallenge: {
    id: 'sleep',
    title: '连续3天早睡',
    desc: '每天22:30前入睡，打卡3天',
    exp: 50,
    stars: 20,
    done: false,
    curDay: 1,
    targetDays: 3,
    days: [true, false, false]
  },
  dailyReward: {
    claimedToday: false,
    streakDays: 3,
    rewardExp: 20,
    rewardStars: 5
  },
  luckyFortune: {
    text: '在路上遇到一只小猫，今天会有好事发生哦～',
    stamp: '/assets/pets/paw_pink_sticker.png',
    luckLevel: '大吉 · 桃花与治愈'
  },
  pets: [
    {
      id: 'orange_cat',
      name: '橘宝',
      species: '猫咪',
      desc: '喜欢趴在阳光地毯上打盹的橘猫',
      avatar: '/assets/pets/cat_orange_sticker.jpg',
      sceneImg: '/assets/mine/pet_cat1.png',
      unlocked: true,
      happiness: 85,
      hunger: 65,
      favoriteFood: '香脆小鱼干',
      quote: '呼噜呼噜~ 今天摸摸我了吗？今天也要开心喵！'
    },
    {
      id: 'poodle_dog',
      name: '旺仔',
      species: '小狗',
      desc: '活泼热情的卷毛小白狗，喜欢户外草地',
      avatar: '/assets/pets/dog_sticker.jpg',
      sceneImg: '/assets/pets/dog.png',
      unlocked: true,
      happiness: 90,
      hunger: 55,
      favoriteFood: '元气肉肉粒',
      quote: '汪汪！主人你回来啦，快带我去草地上奔跑吧！'
    },
    {
      id: 'grey_cat',
      name: '团子',
      species: '猫咪',
      desc: '温柔安静的灰狸花猫，最喜欢听轻音乐',
      avatar: '/assets/pets/cat_grey_sticker.jpg',
      sceneImg: '/assets/pets/cat_grey_sticker.jpg',
      unlocked: false,
      unlockReq: '累计完成 5 个日常任务解锁',
      happiness: 40,
      hunger: 30,
      favoriteFood: '极品冻干丁',
      quote: '喵呜~ 期待和你成为好朋友，一起探索世界！'
    }
  ],
  activePetId: 'orange_cat',
  wardrobe: [
    { key: 'hat', name: '绿芽渔夫帽', icon: '/assets/mine/dress_hat.png', equipped: true },
    { key: 'jacket', name: '森系工装外套', icon: '/assets/mine/dress_jacket.png', equipped: true },
    { key: 'pants', name: '草木绿工装裤', icon: '/assets/mine/dress_pants.png', equipped: true },
    { key: 'shoes', name: '漫步登山鞋', icon: '/assets/mine/dress_shoes.png', equipped: true },
    { key: 'backpack', name: '探险双肩包', icon: '/assets/mine/dress_backpack.png', equipped: true }
  ],
  achievements: [
    {
      id: 'ach1',
      name: '初来乍到',
      sub: '完成3个任务',
      icon: '/assets/achievements/badge1.png',
      unlocked: true,
      claimed: true,
      desc: '迈出探索生活的第一步，累计完成3个日常任务。'
    },
    {
      id: 'ach2',
      name: '记录生活',
      sub: '拍照打卡5次',
      icon: '/assets/achievements/badge2.png',
      unlocked: true,
      claimed: true,
      desc: '用心感受日常微光，用镜头记录5个精彩瞬间。'
    },
    {
      id: 'ach3',
      name: '阅读达人',
      sub: '阅读30分钟',
      icon: '/assets/achievements/badge3.png',
      unlocked: true,
      claimed: true,
      desc: '在书香中漫游，累计专注阅读达到30分钟。'
    },
    {
      id: 'ach4',
      name: '探索者',
      sub: '完成1次挑战',
      icon: '/assets/achievements/badge4.png',
      unlocked: false,
      claimed: false,
      desc: '勇于接受挑战，打卡达成连续早睡生活目标。'
    },
    {
      id: 'ach5',
      name: '生活艺术家',
      sub: '敬请期待',
      icon: '/assets/achievements/badge5.png',
      unlocked: false,
      claimed: false,
      desc: '解锁乐园中所有的毛茸茸伙伴，成为大自然的朋友。'
    }
  ],
  album: [
    {
      id: 'p1',
      title: '清晨的窗台',
      desc: '早晨的阳光洒在绿萝上，微风很清凉～',
      image: '/assets/mine/scene_bg.jpg',
      date: '2026-10-23 08:30'
    },
    {
      id: 'p2',
      title: '草地上的微风',
      desc: '和小动物们在草地上晒太阳，心情像云朵一样柔软。',
      image: '/assets/pets/meadow_full.jpg',
      date: '2026-10-22 15:40'
    }
  ],
  notes: [
    {
      id: 'n1',
      title: '把日常过成诗',
      content: '今天读了15分钟的书，喝了一杯温热的燕麦奶，窗外的阳光格外温柔。原来放慢脚步，生活自带光芒。',
      date: '10月23日 10:20'
    },
    {
      id: 'n2',
      title: '整理小书架',
      content: '把杂乱的便签和吉他拨片收纳整齐，房间瞬间清爽许多！干净的小角落真的能带来一整天的好心情。',
      date: '10月22日 19:45'
    }
  ],
  focusStats: {
    totalMinutes: 45,
    todayMinutes: 15,
    sessionsCount: 3
  },
  messages: [
    {
      id: 1,
      title: '欢迎来到不止日常！',
      time: '今天 09:00',
      content: '完成每日任务，收集小星星，和小伙伴们把生活过成一场有趣的冒险吧～',
      read: false
    },
    {
      id: 2,
      title: '橘宝今天在想你哦',
      time: '今天 12:30',
      content: '橘宝今天很乖，记得去萌宠乐园给它喂小鱼干，增加亲密度哦！',
      read: true
    }
  ],
  exchangeRecords: [
    { id: 'ex1', title: '兑换 · 绿芽渔夫帽', cost: '15 小星星', date: '2026-10-21' },
    { id: 'ex2', title: '兑换 · 香脆小鱼干 ×5', cost: '10 小星星', date: '2026-10-22' }
  ],
  stickers: [
    { id: 'stk_cat_orange', name: '橘宝贴纸', icon: '/assets/pets/cat_orange_sticker.jpg', desc: '活泼好动的元气橘猫', collected: true },
    { id: 'stk_cat_grey', name: '团子贴纸', icon: '/assets/pets/cat_grey_sticker.jpg', desc: '文静优雅的灰狸花猫', collected: true },
    { id: 'stk_dog', name: '旺仔贴纸', icon: '/assets/pets/dog_sticker.jpg', desc: '软萌热情的白色卷毛狗', collected: true },
    { id: 'stk_paw_pink', name: '暖粉肉垫印章', icon: '/assets/pets/paw_pink_sticker.png', desc: '粉嫩可爱的猫爪肉垫', collected: true },
    { id: 'stk_paw_black', name: '曜黑肉垫印章', icon: '/assets/pets/paw_black_sticker.png', desc: '酷酷的神秘黑猫爪印', collected: true },
    { id: 'stk_paw_dark', name: '暖咖肉垫印章', icon: '/assets/pets/paw_dark_sticker.png', desc: '温暖的大地色系爪印', collected: true }
  ]
};

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function addExp(user, amount) {
  user.exp += amount;
  while (user.exp >= user.maxExp) {
    user.level += 1;
    user.exp -= user.maxExp;
    user.maxExp += 200;
  }
}

function checkAndUnlockAchievements(state) {
  if (!state.achievements) return;
  const newlyUnlocked = [];

  // Ach 1: 初来乍到 - 累计完成3个日常任务
  const completedTaskCount = (state.dailyTasks || []).filter(t => t.done).length;
  if (state.achievements[0] && !state.achievements[0].unlocked && completedTaskCount >= 3) {
    state.achievements[0].unlocked = true;
    state.achievements[0].achievedAt = '2026年10月';
    newlyUnlocked.push(state.achievements[0].name);
  }

  // Ach 2: 记录生活 - 拍照相册达到2次以上
  if (state.achievements[1] && !state.achievements[1].unlocked && state.album && state.album.length >= 2) {
    state.achievements[1].unlocked = true;
    state.achievements[1].achievedAt = '2026年10月';
    newlyUnlocked.push(state.achievements[1].name);
  }

  // Ach 3: 阅读达人 - 专注时间累计达到30分钟
  if (state.achievements[2] && !state.achievements[2].unlocked && state.focusStats && state.focusStats.totalMinutes >= 30) {
    state.achievements[2].unlocked = true;
    state.achievements[2].achievedAt = '2026年10月';
    newlyUnlocked.push(state.achievements[2].name);
  }

  // Ach 4: 探索者 - 完成连续3天早睡生活挑战
  if (state.achievements[3] && !state.achievements[3].unlocked && state.weeklyChallenge && state.weeklyChallenge.done) {
    state.achievements[3].unlocked = true;
    state.achievements[3].achievedAt = '2026年10月';
    newlyUnlocked.push(state.achievements[3].name);
  }

  // Ach 5: 生活艺术家 - 萌宠全部解锁
  const allPetsUnlocked = state.pets && state.pets.every(p => p.unlocked);
  if (state.achievements[4] && !state.achievements[4].unlocked && allPetsUnlocked) {
    state.achievements[4].unlocked = true;
    state.achievements[4].achievedAt = '2026年10月';
    newlyUnlocked.push(state.achievements[4].name);
  }

  // 更新总成就计数
  state.user.achievementsCount = state.achievements.filter(a => a.unlocked).length;

  if (newlyUnlocked.length > 0 && state.messages) {
    state.messages.unshift({
      id: Date.now(),
      title: `🎉 达成新成就：${newlyUnlocked.join('、')}！`,
      time: '刚刚',
      content: `你在生活探索中达成了新的里程碑「${newlyUnlocked.join('、')}」，已陈列在房间的荣誉展示墙上！`,
      read: false
    });
  }
}

const Store = {
  getState() {
    try {
      const data = wx.getStorageSync(STORAGE_KEY);
      if (data && typeof data === 'object') {
        const merged = deepMerge(cloneDeep(DEFAULT_STATE), data);
        checkAndUnlockAchievements(merged);
        return merged;
      }
    } catch (e) {
      console.error('Failed to read storage', e);
    }
    const def = cloneDeep(DEFAULT_STATE);
    checkAndUnlockAchievements(def);
    return def;
  },

  saveState(state) {
    try {
      checkAndUnlockAchievements(state);
      wx.setStorageSync(STORAGE_KEY, state);

      // 云开发异步同步 (若已配置环境且在线)
      try {
        const CloudService = require('./cloud.js');
        if (CloudService && CloudService.isOnline()) {
          CloudService.pushUserData(state);
        }
      } catch (err) {}
    } catch (e) {
      console.error('Failed to write storage', e);
    }
  },

  resetState() {
    const s = cloneDeep(DEFAULT_STATE);
    this.saveState(s);
    return s;
  },

  // Task Actions
  toggleTask(taskId) {
    const state = this.getState();
    const task = state.dailyTasks.find(t => t.id === taskId);
    if (!task) return state;

    task.done = !task.done;
    task.buttonText = task.done ? '已完成' : '去完成';

    if (task.done) {
      state.user.stars += task.stars;
      addExp(state.user, task.exp);

      // Check pet unlocking condition: completing tasks unlocks Tuanzi (grey_cat)
      const completedCount = state.dailyTasks.filter(t => t.done).length;
      const greyCat = state.pets.find(p => p.id === 'grey_cat');
      if (greyCat && !greyCat.unlocked && completedCount >= 3) {
        greyCat.unlocked = true;
        state.messages.unshift({
          id: Date.now(),
          title: '🎉 团子已解锁！',
          time: '刚刚',
          content: '你已达成自律打卡目标，温柔安静的灰狸花猫「团子」被你吸引来到萌宠乐园啦！快去给它喂小零食吧～',
          read: false
        });
      }

      // Check achievement 5: all pets unlocked
      const allPetsUnlocked = state.pets.every(p => p.unlocked);
      if (allPetsUnlocked && state.achievements[4] && !state.achievements[4].unlocked) {
        state.achievements[4].unlocked = true;
        state.achievements[4].claimed = true;
        state.user.achievementsCount += 1;
      }
    } else {
      state.user.stars = Math.max(0, state.user.stars - task.stars);
      state.user.exp = Math.max(0, state.user.exp - task.exp);
    }

    this.saveState(state);
    return state;
  },

  addTask(taskTitle, taskDesc) {
    const state = this.getState();
    const newTask = {
      id: 'task_' + Date.now(),
      title: taskTitle || '新日常挑战',
      desc: taskDesc || '坚持今日自律小目标',
      exp: 10,
      stars: 5,
      icon: '/assets/icons/cam.png',
      done: false,
      buttonText: '去完成',
      type: 'custom'
    };
    state.dailyTasks.push(newTask);
    this.saveState(state);
    return state;
  },

  // Daily Reward
  claimDailyReward() {
    const state = this.getState();
    if (state.dailyReward.claimedToday) {
      return { success: false, message: '今天已经领过每日奖励啦～明天再来吧！', state };
    }
    state.dailyReward.claimedToday = true;
    state.dailyReward.streakDays += 1;
    state.user.stars += state.dailyReward.rewardStars;
    addExp(state.user, state.dailyReward.rewardExp);
    this.saveState(state);
    return {
      success: true,
      message: `签到成功！获得 +${state.dailyReward.rewardStars} 小星星，+${state.dailyReward.rewardExp} 经验值！`,
      state
    };
  },

  // Weekly Challenge
  punchWeeklyChallenge() {
    const state = this.getState();
    const ch = state.weeklyChallenge;
    if (ch.done) {
      return { success: false, message: '本周早睡挑战已经达成啦！真棒！', state };
    }
    if (ch.curDay < ch.targetDays) {
      ch.days[ch.curDay] = true;
      ch.curDay += 1;
      if (ch.curDay === ch.targetDays) {
        ch.done = true;
        state.user.stars += ch.stars;
        addExp(state.user, ch.exp);
        // Also unlock achievement 4
        if (state.achievements[3]) {
          state.achievements[3].unlocked = true;
          state.user.achievementsCount += 1;
        }
      }
      this.saveState(state);
      return {
        success: true,
        message: ch.done ? `太棒了！已连续早睡3天！奖励 +${ch.stars} 小星星，+${ch.exp} 经验值！` : `早睡第 ${ch.curDay} 天打卡成功！离目标又近了一步～`,
        state
      };
    }
    return { success: true, message: '挑战已完成！', state };
  },

  // Draw lucky fortune
  drawLuckyFortune() {
    const quotes = [
      { text: '在路上遇到一只小猫，今天会有好事发生哦～', stamp: '/assets/pets/paw_pink_sticker.png', luck: '大吉 · 治愈与奇遇' },
      { text: '窗外的微风正温柔吹拂，适合泡一杯温热的奶茶。', stamp: '/assets/pets/paw_black_sticker.png', luck: '中吉 · 宁静与舒心' },
      { text: '阳光穿透树叶洒下斑驳光影，今天的你自带光芒！', stamp: '/assets/pets/paw_dark_sticker.png', luck: '大吉 · 能量充沛' },
      { text: '翻开一本尘封的好书，会在某一页遇见惊喜的共鸣。', stamp: '/assets/pets/paw_pink_sticker.png', luck: '上吉 · 灵感涌现' },
      { text: '毛茸茸的小狗向你摇了摇尾巴，把所有烦恼都甩走啦！', stamp: '/assets/pets/paw_black_sticker.png', luck: '大吉 · 快乐爆棚' }
    ];
    const state = this.getState();
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    state.luckyFortune = pick;
    this.saveState(state);
    return { fortune: pick, state };
  },

  // Pet interactions
  feedPet(petId) {
    const state = this.getState();
    const pet = state.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '未找到宠物', state };
    if (!pet.unlocked) return { success: false, message: '该宠物尚未解锁哦', state };
    if (state.user.stars < 2) {
      return { success: false, message: '小星星不足啦（需2颗小星星），快去完成任务赚取吧！', state };
    }

    state.user.stars -= 2;
    pet.hunger = Math.min(100, pet.hunger + 25);
    pet.happiness = Math.min(100, pet.happiness + 15);
    const quotes = [
      `啊呜啊呜~ 好好吃的${pet.favoriteFood}！谢谢主人~ ❤️`,
      '吃饱饱啦，肚子圆滚滚的，好满足喵！',
      '太香啦！小爪爪给你比个爱心 🐾'
    ];
    pet.quote = quotes[Math.floor(Math.random() * quotes.length)];

    this.saveState(state);
    return {
      success: true,
      message: `投喂成功！${pet.name} 饱食度+25，亲密度+15！`,
      quote: pet.quote,
      state
    };
  },

  playWithPet(petId) {
    const state = this.getState();
    const pet = state.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '未找到宠物', state };
    if (!pet.unlocked) return { success: false, message: '该宠物尚未解锁哦', state };

    pet.happiness = Math.min(100, pet.happiness + 20);
    pet.hunger = Math.max(0, pet.hunger - 10);
    const quotes = [
      '好开心呀！追着毛线球跑了好几圈，开心得跳起来~ 🐾',
      '扑通扑通！在草地上打了个快乐的滚儿~ 🌸',
      '汪汪/喵呜！主人最好了，最喜欢和主人一起玩！'
    ];
    pet.quote = quotes[Math.floor(Math.random() * quotes.length)];

    this.saveState(state);
    return {
      success: true,
      message: `玩耍成功！${pet.name} 亲密度+20！`,
      quote: pet.quote,
      state
    };
  },

  petAnimal(petId) {
    const state = this.getState();
    const pet = state.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '未找到宠物', state };

    pet.happiness = Math.min(100, pet.happiness + 10);
    const quotes = [
      '呼噜呼噜~ 下巴被摸得好舒服，舒服得眯起眼睛～',
      '小爪爪搭在你的手心里，轻轻蹭蹭你～ ❤️',
      '肚皮软软的，只给你一个人摸摸哦～'
    ];
    pet.quote = quotes[Math.floor(Math.random() * quotes.length)];

    this.saveState(state);
    return {
      success: true,
      message: `轻抚互动成功！${pet.name} 亲密度+10！`,
      quote: pet.quote,
      state
    };
  },

  setActivePet(petId) {
    const state = this.getState();
    const pet = state.pets.find(p => p.id === petId);
    if (!pet || !pet.unlocked) return { success: false, message: '尚未解锁该宠物', state };
    state.activePetId = petId;
    this.saveState(state);
    return { success: true, message: `已设置 ${pet.name} 为陪伴萌宠！`, state };
  },

  // Album & Notes
  addPhoto(photo) {
    const state = this.getState();
    state.album.unshift(photo);
    state.user.collectionsCount += 1;
    this.saveState(state);
    return state;
  },

  addNote(note) {
    const state = this.getState();
    state.notes.unshift(note);
    this.saveState(state);
    return state;
  },

  deleteNote(noteId) {
    const state = this.getState();
    state.notes = state.notes.filter(n => n.id !== noteId);
    this.saveState(state);
    return state;
  },

  addFocusTime(minutes) {
    const state = this.getState();
    state.focusStats.totalMinutes += minutes;
    state.focusStats.todayMinutes += minutes;
    state.focusStats.sessionsCount += 1;
    addExp(state.user, minutes * 2);
    state.user.stars += Math.floor(minutes / 10) * 2;
    this.saveState(state);
    return state;
  },

  toggleWardrobeItem(key) {
    const state = this.getState();
    const item = state.wardrobe.find(w => w.key === key);
    if (item) {
      item.equipped = !item.equipped;
      this.saveState(state);
    }
    return state;
  },

  updateUserProfile(profile) {
    const state = this.getState();
    Object.assign(state.user, profile);
    this.saveState(state);
    return state;
  }
};

module.exports = Store;
