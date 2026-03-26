const { api } = require('../../utils/api')
const { showLoading, hideLoading, showError } = require('../../utils/util')

Page({
  data: {
    categories: [],
    currentCategory: '',
    tools: [],
    loading: true,
    loadingMore: false,
    page: 1,
    pageSize: 20,
    hasMore: true,
    keyword: ''
  },

  onLoad() {
    this.loadCategories()
  },

  onShow() {
    const selectedCategory = getApp().globalData.selectedCategory
    if (selectedCategory !== undefined) {
      this.setData({ currentCategory: selectedCategory })
      getApp().globalData.selectedCategory = undefined
    }
  },

  onPullDownRefresh() {
    this.refresh().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMore()
    }
  },

  async loadCategories() {
    try {
      const res = await api.getToolCategories()
      this.setData({ categories: res.categories || [] })
      await this.loadTools()
    } catch (error) {
      console.error('Load categories failed:', error)
      showError('加载分类失败')
    }
  },

  async loadTools() {
    try {
      this.setData({ loading: true, page: 1 })

      const params = {
        page: 1,
        page_size: this.data.pageSize
      }

      if (this.data.currentCategory) {
        params.category = this.data.currentCategory
      }

      if (this.data.keyword) {
        params.keyword = this.data.keyword
      }

      const res = await api.getTools(params)

      this.setData({
        tools: res.items || [],
        hasMore: res.has_more,
        loading: false
      })
    } catch (error) {
      console.error('Load tools failed:', error)
      this.setData({ loading: false })
      showError('加载失败')
    }
  },

  async loadMore() {
    if (!this.data.hasMore) return

    try {
      this.setData({ loadingMore: true })

      const params = {
        page: this.data.page + 1,
        page_size: this.data.pageSize
      }

      if (this.data.currentCategory) {
        params.category = this.data.currentCategory
      }

      if (this.data.keyword) {
        params.keyword = this.data.keyword
      }

      const res = await api.getTools(params)

      this.setData({
        tools: [...this.data.tools, ...(res.items || [])],
        page: this.data.page + 1,
        hasMore: res.has_more,
        loadingMore: false
      })
    } catch (error) {
      console.error('Load more failed:', error)
      this.setData({ loadingMore: false })
    }
  },

  async refresh() {
    await this.loadTools()
  },

  onCategoryChange(e) {
    const { key } = e.detail
    this.setData({ currentCategory: key })
    this.loadTools()
  },

  onSearch(e) {
    const { value } = e.detail
    this.setData({ keyword: value })
    this.loadTools()
  },

  onToolTap(e) {
    const { tool } = e.detail
    wx.navigateTo({
      url: `/pages/detail/detail?id=${tool.id}`
    })
  }
})