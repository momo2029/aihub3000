const { api } = require('../../utils/api')
const { showError } = require('../../utils/util')

Page({
  data: {
    articles: [],
    loading: true,
    loadingMore: false,
    page: 1,
    pageSize: 20,
    hasMore: true
  },

  onLoad() {
    this.loadArticles()
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

  async loadArticles() {
    try {
      this.setData({ loading: true, page: 1 })

      const res = await api.getArticles({
        page: 1,
        page_size: this.data.pageSize
      })

      this.setData({
        articles: res.items || [],
        hasMore: res.has_more,
        loading: false
      })
    } catch (error) {
      console.error('Load articles failed:', error)
      this.setData({ loading: false })
      showError('加载失败')
    }
  },

  async loadMore() {
    if (!this.data.hasMore) return

    try {
      this.setData({ loadingMore: true })

      const res = await api.getArticles({
        page: this.data.page + 1,
        page_size: this.data.pageSize
      })

      this.setData({
        articles: [...this.data.articles, ...(res.items || [])],
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
    await this.loadArticles()
  },

  onArticleTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/article-detail/article-detail?id=${id}`
    })
  },

  formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
})