const { api } = require('../../utils/api')

Page({
  data: {
    // 网络状态
    networkType: '',
    isConnected: true,

    // 设备信息
    deviceInfo: {},

    // IP信息
    publicIP: '',
    ipv6: '',
    ipLocation: '',
    isp: '',

    // 测速结果
    speedTest: {
      downloading: false,
      uploadSpeed: 0,
      downloadSpeed: 0,
      latency: 0,
      progress: 0
    },

    // 状态
    loading: true,
    speedTesting: false
  },

  onLoad() {
    this.loadNetworkInfo()
  },

  onPullDownRefresh() {
    this.loadNetworkInfo().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async loadNetworkInfo() {
    try {
      this.setData({ loading: true })

      // 获取网络状态
      const networkInfo = await this.getNetworkStatus()

      // 获取设备信息
      const deviceInfo = wx.getSystemInfoSync()

      // 获取公网IP信息
      const ipInfo = await this.getPublicIP()

      this.setData({
        networkType: networkInfo.networkType,
        isConnected: networkInfo.isConnected,
        deviceInfo: {
          model: deviceInfo.model,
          system: deviceInfo.system,
          platform: deviceInfo.platform,
          SDKVersion: deviceInfo.SDKVersion,
          brand: deviceInfo.brand
        },
        publicIP: ipInfo.ip || '',
        ipv6: ipInfo.ipv6 || '',
        ipLocation: ipInfo.location || '',
        isp: ipInfo.isp || '',
        loading: false
      })
    } catch (error) {
      console.error('Load network info failed:', error)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  },

  getNetworkStatus() {
    return new Promise((resolve) => {
      wx.getNetworkType({
        success: (res) => {
          resolve({
            networkType: res.networkType,
            isConnected: true
          })
        },
        fail: () => {
          resolve({
            networkType: 'unknown',
            isConnected: false
          })
        }
      })
    })
  },

  async getPublicIP() {
    try {
      const res = await api.getIPInfo()
      return res
    } catch (error) {
      console.error('Get IP info failed:', error)
      return { ip: '', ipv6: '', location: '', isp: '' }
    }
  },

  // 开始测速
  async startSpeedTest() {
    if (this.data.speedTesting) return

    this.setData({
      speedTesting: true,
      speedTest: {
        downloading: false,
        downloadSpeed: 0,
        uploadSpeed: 0,
        latency: 0,
        progress: 0
      }
    })

    try {
      // 1. 测试延迟
      wx.showLoading({ title: '测试延迟...', mask: true })
      const latency = await this.testLatency()
      this.setData({ 'speedTest.latency': latency })

      // 2. 测试下载速度
      wx.showLoading({ title: '测试下载...', mask: true })
      const downloadSpeed = await this.testDownloadSpeed()
      this.setData({ 'speedTest.downloadSpeed': downloadSpeed })

      wx.hideLoading()

      // 显示结果
      wx.showModal({
        title: '测速完成',
        content: `延迟: ${latency}ms\n下载速度: ${this.formatSpeed(downloadSpeed)}`,
        showCancel: false
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '测速失败',
        icon: 'error'
      })
    }

    this.setData({ speedTesting: false })
  },

  // 测试延迟
  async testLatency() {
    const startTime = Date.now()
    await api.ping()
    const endTime = Date.now()
    return endTime - startTime
  },

  // 测试下载速度 - 使用后端测速文件接口
  async testDownloadSpeed() {
    // 下载500KB测试文件
    const testUrl = 'https://aihub3000.3198.net/api/v1/network/speed-test-file?size=512000'
    let totalBytes = 0
    let totalTime = 0
    const testCount = 3

    for (let i = 0; i < testCount; i++) {
      const startTime = Date.now()

      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url: testUrl,
            method: 'GET',
            timeout: 15000,
            responseType: 'arraybuffer', // 使用arraybuffer获取二进制数据
            success: resolve,
            fail: reject
          })
        })

        const endTime = Date.now()
        const duration = endTime - startTime

        // 获取实际下载的字节数
        const bytes = res.data.byteLength || 512000
        totalBytes += bytes
        totalTime += duration

        // 更新进度
        const progress = Math.round(((i + 1) / testCount) * 100)
        this.setData({ 'speedTest.progress': progress })
      } catch (error) {
        console.error('Download test failed:', error)
      }
    }

    // 计算速度 (bytes/ms -> bytes/s)
    if (totalTime > 0) {
      return (totalBytes / totalTime) * 1000
    }
    return 0
  },

  // 格式化速度显示
  formatSpeed(bytesPerSecond) {
    if (bytesPerSecond < 1024) {
      return `${bytesPerSecond.toFixed(0)} B/s`
    } else if (bytesPerSecond < 1024 * 1024) {
      return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`
    } else {
      return `${(bytesPerSecond / 1024 / 1024).toFixed(2)} MB/s`
    }
  },

  // 格式化网络类型
  formatNetworkType(type) {
    const typeMap = {
      'wifi': 'WiFi',
      '2g': '2G',
      '3g': '3G',
      '4g': '4G',
      '5g': '5G',
      'unknown': '未知'
    }
    return typeMap[type] || type
  },

  // 复制IP地址
  copyIP() {
    wx.setClipboardData({
      data: this.data.publicIP,
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' })
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '网络信息查询 - AIHub3000',
      path: '/pages/network/network',
      imageUrl: '/images/share-network.png'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '查看网络信息，测试网速 - AIHub3000',
      query: '',
      imageUrl: '/images/share-network.png'
    }
  }
})