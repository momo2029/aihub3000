const { api } = require('../../utils/api')
const { showLoading, hideLoading, showError, checkLogin } = require('../../utils/util')

Page({
  data: {
    userInfo: null,
    isLogin: false,
    favorites: [],
    history: [],
    loading: true,
    menuList: [
      { icon: 'heart', title: '我的收藏', key: 'favorites' },
      { icon: 'time', title: '浏览历史', key: 'history' },
      { icon: 'feedback', title: '意见反馈', key: 'feedback' },
      { icon: 'about', title: '关于我们', key: 'about' }
    ]
  },

  onLoad() {
    this.checkLoginStatus()
  },

  onShow() {
    if (this.data.isLogin) {
      this.loadUserData()
    }
  },

  checkLoginStatus() {
    const isLogin = checkLogin()
    this.setData({ isLogin, loading: false })

    if (isLogin) {
      this.loadUserData()
    }
  },

  async loadUserData() {
    try {
      const userInfo = await api.getUserInfo()
      this.setData({ userInfo })
    } catch (error) {
      console.error('Load user info failed:', error)
    }
  },

  async onLogin() {
    try {
      showLoading('登录中...')

      // Get wx login code
      const { code } = await new Promise((resolve, reject) => {
        wx.login({
          success: resolve,
          fail: reject
        })
      })

      // Login with backend
      const res = await api.login(code)

      hideLoading()

      this.setData({
        isLogin: true,
        userInfo: res.user
      })
    } catch (error) {
      hideLoading()
      console.error('Login failed:', error)
      showError('登录失败')
    }
  },

  onMenuTap(e) {
    const { key } = e.currentTarget.dataset

    if (!this.data.isLogin && key !== 'about') {
      this.onLogin()
      return
    }

    switch (key) {
      case 'favorites':
        wx.navigateTo({ url: '/pages/favorites/favorites' })
        break
      case 'history':
        wx.navigateTo({ url: '/pages/history/history' })
        break
      case 'feedback':
        wx.navigateTo({ url: '/pages/feedback/feedback' })
        break
      case 'about':
        wx.navigateTo({ url: '/pages/about/about' })
        break
    }
  },

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token')
          getApp().globalData.token = null
          getApp().globalData.userInfo = null
          this.setData({
            isLogin: false,
            userInfo: null
          })
        }
      }
    })
  }
})