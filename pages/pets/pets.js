const Store = require('../../utils/store.js');
const Assets = require('../../config/assets.js');

Page({
  data: {
    assets: Assets,
    user: {},
    pets: [],
    activePetId: 'orange_cat',
    activePet: {},
    selectedPetId: 'orange_cat',
    selectedPet: {},
    stickers: [],
    showHearts: false
  },

  onShow() {
    this.refreshPageData();
  },

  handleGoBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.redirectTo({ url: '/pages/room/room' });
    }
  },

  refreshPageData() {
    const state = Store.getState();
    const activePet = state.pets.find(p => p.id === state.activePetId) || state.pets[0];
    const selectedPetId = this.data.selectedPetId || state.activePetId;
    const selectedPet = state.pets.find(p => p.id === selectedPetId) || activePet;

    this.setData({
      user: state.user,
      pets: state.pets,
      activePetId: state.activePetId,
      activePet,
      selectedPetId,
      selectedPet,
      stickers: state.stickers
    });
  },

  switchSelectedPet(e) {
    const id = e.currentTarget.dataset.id;
    const pet = this.data.pets.find(p => p.id === id);
    if (pet) {
      this.setData({
        selectedPetId: id,
        selectedPet: pet
      });
    }
  },

  triggerHeartAnim() {
    this.setData({ showHearts: true });
    setTimeout(() => {
      this.setData({ showHearts: false });
    }, 1200);
  },

  // 1. Feed pet
  handleFeedPet() {
    const res = Store.feedPet(this.data.selectedPetId);
    this.refreshPageData();
    if (res.success) {
      this.triggerHeartAnim();
    }
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none',
      duration: 2500
    });
  },

  // 2. Play with pet
  handlePlayWithPet() {
    const res = Store.playWithPet(this.data.selectedPetId);
    this.refreshPageData();
    if (res.success) {
      this.triggerHeartAnim();
    }
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none',
      duration: 2500
    });
  },

  // 3. Cuddle pet
  handleCuddlePet() {
    const res = Store.petAnimal(this.data.selectedPetId);
    this.refreshPageData();
    this.triggerHeartAnim();
    wx.showToast({
      title: res.message,
      icon: 'none'
    });
  },

  // 4. Set as room companion
  handleSetCompanion() {
    const res = Store.setActivePet(this.data.selectedPetId);
    this.refreshPageData();
    wx.showToast({
      title: res.message,
      icon: res.success ? 'success' : 'none'
    });
  },

  // 5. Tap quote
  handleTapPetQuote() {
    this.triggerHeartAnim();
    const pet = this.data.selectedPet;
    wx.showToast({
      title: `${pet.name}：${pet.quote}`,
      icon: 'none'
    });
  },

  // 6. Sticker collection details
  handleTapSticker(e) {
    const id = e.currentTarget.dataset.id;
    const stk = this.data.stickers.find(s => s.id === id);
    if (!stk) return;

    wx.showModal({
      title: stk.name,
      content: `${stk.desc}\n状态：已永久收录于萌宠图鉴中！可以在生活日记中作为专属贴纸使用。`,
      showCancel: false,
      confirmText: '太棒啦',
      confirmColor: '#5C7C57'
    });
  }
});
