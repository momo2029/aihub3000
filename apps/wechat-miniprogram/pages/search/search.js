const { api } = require('../../utils/api')

Page({
  data: {
    keyword: '',
    tools: [],
    loading: false,
    searched: false
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  async onSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) return

    try {
      this.setData({ loading: true, searched: true })
      const res = await api.getTools({ keyword })
      this.setData({
        tools: res.items || [],
        loading: false
      })
    } catch (error) {
      this.setData({ loading: false })
      wx.showToast({ title: '搜索失败', icon: 'none' })
    }
  },

  onToolTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
