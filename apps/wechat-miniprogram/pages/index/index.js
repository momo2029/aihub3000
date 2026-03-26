const { api } = require('../../utils/api')
const { showLoading, hideLoading, showError } = require('../../utils/util')

Page({
  data: {
    categories: [],
    featuredTools: [],
    hotTools: [],
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async loadData() {
    try {
      this.setData({ loading: true })

      // Load data in parallel
      const [categoriesRes, featuredRes, hotRes] = await Promise.all([
        api.getToolCategories(),
        api.getTools({ is_featured: true, page_size: 6 }),
        api.getTools({ is_hot: true, page_size: 6 })
      ])

      this.setData({
        categories: categoriesRes.categories || [],
        featuredTools: featuredRes.items || [],
        hotTools: hotRes.items || [],
        loading: false
      })
    } catch (error) {
      console.error('Load data failed:', error)
      this.setData({ loading: false })
      showError('加载失败，请重试')
    }
  },

  onCategoryTap(e) {
    const { key } = e.detail
    wx.switchTab({
      url: '/pages/category/category',
      success: () => {
        // Pass category to category page via global data
        getApp().globalData.selectedCategory = key
      }
    })
  },

  onToolTap(e) {
    const { tool } = e.detail
    wx.navigateTo({
      url: `/pages/detail/detail?id=${tool.id}`
    })
  },

  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onMoreTap(e) {
    const { type } = e.currentTarget.dataset
    wx.switchTab({
      url: '/pages/category/category'
    })
  }
})