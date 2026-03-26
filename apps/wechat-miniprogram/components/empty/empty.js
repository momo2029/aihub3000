Component({
  properties: {
    icon: {
      type: String,
      value: 'empty'
    },
    text: {
      type: String,
      value: '暂无数据'
    },
    buttonText: {
      type: String,
      value: ''
    }
  },

  methods: {
    onButtonTap() {
      this.triggerEvent('action')
    }
  }
})