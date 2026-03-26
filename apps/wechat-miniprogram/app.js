App({
  globalData: {
    userInfo: null,
    token: null,
    baseUrl: 'http://localhost:8000/api/v1'
  },

  onLaunch() {
    // Check login status
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.token = token
      this.getUserInfo()
    }
  },

  getUserInfo() {
    const token = wx.getStorageSync('token')
    if (!token) return

    wx.request({
      url: `${this.globalData.baseUrl}/users/me`,
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.globalData.userInfo = res.data
        }
      }
    })
  },

  login(code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.globalData.baseUrl}/users/login`,
        method: 'POST',
        data: { openid: code },
        success: (res) => {
          if (res.statusCode === 200) {
            this.globalData.token = res.data.access_token
            this.globalData.userInfo = res.data.user
            wx.setStorageSync('token', res.data.access_token)
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }
})