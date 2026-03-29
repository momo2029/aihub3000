const { api } = require('../../utils/api')
const { showLoading, hideLoading, showError, showSuccess, checkLogin } = require('../../utils/util')

Page({
  data: {
    tool: null,
    loading: true,
    isFavorite: false
  },

  onLoad(options) {
    const { id } = options
    if (id) {
      this.loadTool(id)
    }
  },

  async loadTool(id) {
    try {
      this.setData({ loading: true })
      const tool = await api.getTool(id)
      this.setData({ tool, loading: false })
    } catch (error) {
      console.error('Load tool failed:', error)
      this.setData({ loading: false })
      showError('加载失败')
    }
  },

  async onFavoriteTap() {
    if (!checkLogin()) {
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }

    const { tool, isFavorite } = this.data
    try {
      if (isFavorite) {
        await api.removeFavorite(tool.id)
        showSuccess('已取消收藏')
      } else {
        await api.addFavorite(tool.id)
        showSuccess('收藏成功')
      }
      this.setData({ isFavorite: !isFavorite })
    } catch (error) {
      showError('操作失败')
    }
  },

  onShareTap() {
    const { tool } = this.data
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onUseTap() {
    const { tool } = this.data
    if (tool.url) {
      wx.setClipboardData({
        data: tool.url,
        success: () => {
          showSuccess('链接已复制')
        }
      })
    }
  },

  onShareAppMessage() {
    const { tool } = this.data
    return {
      title: tool ? `${tool.name} - AIHub3000` : 'AIHub3000 - 发现最优秀的AI工具',
      path: `/pages/detail/detail?id=${tool?.id}`,
      imageUrl: tool?.cover
    }
  }
})