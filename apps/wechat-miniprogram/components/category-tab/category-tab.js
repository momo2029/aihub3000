Component({
  properties: {
    categories: {
      type: Array,
      value: []
    },
    current: {
      type: String,
      value: ''
    }
  },

  methods: {
    onTap(e) {
      const { key } = e.currentTarget.dataset
      this.triggerEvent('change', { key })
    }
  }
})