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
      domesticSpeed: 0,  // 国内速度
      overseasSpeed: 0,  // 国外速度
      latency: 0,
      progress: 0,
      domesticProgress: 0,
      overseasProgress: 0
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
        domesticSpeed: 0,
        overseasSpeed: 0,
        latency: 0,
        progress: 0,
        domesticProgress: 0,
        overseasProgress: 0
      }
    })

    try {
      // 1. 测试延迟
      wx.showLoading({ title: '测试延迟...', mask: true })
      const latency = await this.testLatency()
      this.setData({ 'speedTest.latency': latency })

      // 2. 测试国内速度
      wx.showLoading({ title: '测试国内...', mask: true })
      const domesticSpeed = await this.testDownloadSpeed('domestic')
      this.setData({ 'speedTest.domesticSpeed': domesticSpeed })

      // 3. 测试国外速度
      wx.showLoading({ title: '测试国外...', mask: true })
      const overseasSpeed = await this.testDownloadSpeed('overseas')
      this.setData({ 'speedTest.overseasSpeed': overseasSpeed })

      wx.hideLoading()

      // 显示结果
      wx.showModal({
        title: '测速完成',
        content: `延迟: ${latency}ms\n国内: ${this.formatSpeed(domesticSpeed)}\n国外: ${this.formatSpeed(overseasSpeed)}`,
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

  // 测试下载速度 - type: 'domestic' 或 'overseas'
  async testDownloadSpeed(type) {
    // 测速文件配置
    const testFiles = {
      domestic: [
        { url: 'https://speedtest-100mb.oss-cn-hangzhou.aliyuncs.com/1MB.test', size: 1048576, name: '国内 1MB' },
        { url: 'https://speedtest-100mb.oss-cn-hangzhou.aliyuncs.com/10MB.test', size: 10485760, name: '国内 10MB' }
      ],
      overseas: [
        { url: 'https://speed.cloudflare.com/__down?bytes=1048576', size: 1048576, name: '国外 1MB' },
        { url: 'https://speed.cloudflare.com/__down?bytes=10485760', size: 10485760, name: '国外 10MB' }
      ]
    }

    // 根据网络类型选择文件大小：WiFi用10MB，移动网络用1MB
    const isWifi = this.data.networkType === 'wifi'
    const testList = testFiles[type]
    const testFile = isWifi ? testList[1] : testList[0]

    const testUrl = testFile.url
    const expectedSize = testFile.size

    console.log(`测速配置: ${testFile.name}`)

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
            timeout: 30000,
            responseType: 'arraybuffer',
            success: resolve,
            fail: reject
          })
        })

        const endTime = Date.now()
        const duration = endTime - startTime

        const bytes = res.data.byteLength || expectedSize
        totalBytes += bytes
        totalTime += duration

        // 更新对应进度
        const progress = Math.round(((i + 1) / testCount) * 100)
        if (type === 'domestic') {
          this.setData({ 'speedTest.domesticProgress': progress })
        } else {
          this.setData({ 'speedTest.overseasProgress': progress })
        }

        console.log(`测速第${i + 1}次: ${bytes} bytes, ${duration}ms`)
      } catch (error) {
        console.error('Download test failed:', error)
        if (testFile.size > 1048576) {
          // 大文件失败，尝试小文件
          const fallbackFile = testList[0]
          return await this.testSingleFile(fallbackFile.url, fallbackFile.size, type)
        }
      }
    }

    if (totalTime > 0) {
      return (totalBytes / totalTime) * 1000
    }
    return 0
  },

  // 测试单个文件
  async testSingleFile(url, expectedSize, type) {
    let totalBytes = 0
    let totalTime = 0
    const testCount = 3

    for (let i = 0; i < testCount; i++) {
      const startTime = Date.now()
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url: url,
            method: 'GET',
            timeout: 15000,
            responseType: 'arraybuffer',
            success: resolve,
            fail: reject
          })
        })
        const endTime = Date.now()
        const duration = endTime - startTime
        const bytes = res.data.byteLength || expectedSize
        totalBytes += bytes
        totalTime += duration
        const progress = Math.round(((i + 1) / testCount) * 100)
        if (type === 'domestic') {
          this.setData({ 'speedTest.domesticProgress': progress })
        } else {
          this.setData({ 'speedTest.overseasProgress': progress })
        }
      } catch (error) {
        console.error('Single file test failed:', error)
      }
    }

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