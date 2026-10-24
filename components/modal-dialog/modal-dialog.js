Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '提示'
    },
    icon: {
      type: String,
      value: ''
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close');
    },

    onMaskClick() {
      this.triggerEvent('close');
    },

    stopBubble() {}
  }
});
