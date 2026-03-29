const app = getApp()
const { api } = require('../../utils/api')

Page({
  data: {
    loading: false
  },

  async onLogin() {
    try {
      this.setData({ loading: true })

      const { code } = await wx.login()
      const result = await app.login(code)

      wx.showToast({ title: '登录成功', icon: 'success' })

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (error) {
      this.setData({ loading: false })
      wx.showToast({ title: '登录失败', icon: 'none' })
    }
  }
})
