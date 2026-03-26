Component({
  properties: {
    placeholder: {
      type: String,
      value: '搜索AI工具...'
    },
    value: {
      type: String,
      value: ''
    }
  },

  data: {
    inputValue: ''
  },

  observers: {
    'value': function(val) {
      this.setData({ inputValue: val })
    }
  },

  methods: {
    onInput(e) {
      const value = e.detail.value
      this.setData({ inputValue: value })
      this.triggerEvent('input', { value })
    },

    onSearch() {
      this.triggerEvent('search', { value: this.data.inputValue })
    },

    onClear() {
      this.setData({ inputValue: '' })
      this.triggerEvent('clear')
      this.triggerEvent('search', { value: '' })
    },

    onFocus() {
      this.triggerEvent('focus')
    },

    onBlur() {
      this.triggerEvent('blur')
    }
  }
})