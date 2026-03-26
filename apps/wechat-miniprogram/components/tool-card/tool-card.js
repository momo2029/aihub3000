Component({
  properties: {
    tool: {
      type: Object,
      value: {}
    },
    showCategory: {
      type: Boolean,
      value: true
    }
  },

  data: {
    categoryMap: {
      painting: { name: 'AI绘画', color: '#ec4899' },
      efficiency: { name: 'AI效率', color: '#6366f1' },
      multimedia: { name: 'AI多媒体', color: '#f59e0b' }
    },
    pricingMap: {
      free: { name: '免费', color: '#10b981' },
      freemium: { name: '免费试用', color: '#6366f1' },
      paid: { name: '付费', color: '#f59e0b' }
    }
  },

  methods: {
    onTap() {
      const { tool } = this.properties
      this.triggerEvent('tap', { tool })
      wx.navigateTo({
        url: `/pages/detail/detail?id=${tool.id}`
      })
    },

    onFavoriteTap(e) {
      e.stopPropagation()
      const { tool } = this.properties
      this.triggerEvent('favorite', { tool })
    }
  }
})