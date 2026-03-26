const app = getApp()
const mock = require('./mock')

const BASE_URL = 'http://localhost:8000/api/v1'
const USE_MOCK = true // 开发时使用Mock数据，生产环境改为false

/**
 * 模拟API响应
 */
const mockResponse = (data, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

/**
 * 封装请求方法
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')

    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('token')
          app.globalData.token = null
          app.globalData.userInfo = null
          reject(new Error('Unauthorized'))
        } else {
          reject(new Error(res.data.detail || 'Request failed'))
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || 'Network error'))
      }
    })
  })
}

/**
 * API 接口
 */
const api = {
  // 工具相关
  getTools: async (params = {}) => {
    if (USE_MOCK) {
      let tools = [...mock.mockTools]

      // Filter by category
      if (params.category) {
        tools = tools.filter(t => t.category === params.category)
      }

      // Filter by featured
      if (params.is_featured !== undefined) {
        tools = tools.filter(t => t.is_featured === params.is_featured)
      }

      // Filter by hot
      if (params.is_hot !== undefined) {
        tools = tools.filter(t => t.is_hot === params.is_hot)
      }

      // Filter by keyword
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        tools = tools.filter(t =>
          t.name.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
        )
      }

      // Pagination
      const page = params.page || 1
      const pageSize = params.page_size || 20
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const paginatedTools = tools.slice(start, end)

      return mockResponse({
        items: paginatedTools,
        total: tools.length,
        page: page,
        page_size: pageSize,
        has_more: end < tools.length
      })
    }

    const query = Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return request({ url: `/tools?${query}` })
  },

  getToolCategories: async () => {
    if (USE_MOCK) {
      return mockResponse(mock.mockCategories)
    }
    return request({ url: '/tools/categories' })
  },

  getTool: async (id) => {
    if (USE_MOCK) {
      const tool = mock.mockTools.find(t => t.id === parseInt(id))
      return mockResponse(tool || null)
    }
    return request({ url: `/tools/${id}` })
  },

  // 文章相关
  getArticles: async (params = {}) => {
    if (USE_MOCK) {
      let articles = [...mock.mockArticles]

      // Filter by keyword
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        articles = articles.filter(a =>
          a.title.toLowerCase().includes(keyword)
        )
      }

      // Pagination
      const page = params.page || 1
      const pageSize = params.page_size || 20
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const paginatedArticles = articles.slice(start, end)

      return mockResponse({
        items: paginatedArticles,
        total: articles.length,
        page: page,
        page_size: pageSize,
        has_more: end < articles.length
      })
    }

    const query = Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return request({ url: `/articles?${query}` })
  },

  getArticle: async (id) => {
    if (USE_MOCK) {
      const article = mock.mockArticles.find(a => a.id === parseInt(id))
      return mockResponse(article || null)
    }
    return request({ url: `/articles/${id}` })
  },

  // 用户相关
  login: async (openid) => {
    if (USE_MOCK) {
      return mockResponse({
        access_token: 'mock_token_' + Date.now(),
        token_type: 'bearer',
        user: {
          id: 1,
          openid: openid,
          nickname: '测试用户',
          avatar: 'https://via.placeholder.com/100/6366f1/ffffff?text=U',
          is_active: true,
          created_at: new Date().toISOString()
        }
      })
    }
    return request({
      url: '/users/login',
      method: 'POST',
      data: { openid }
    })
  },

  getUserInfo: async () => {
    if (USE_MOCK) {
      return mockResponse({
        id: 1,
        openid: 'mock_openid',
        nickname: '测试用户',
        avatar: 'https://via.placeholder.com/100/6366f1/ffffff?text=U',
        is_active: true,
        created_at: new Date().toISOString()
      })
    }
    return request({ url: '/users/me' })
  },

  getFavorites: async () => {
    if (USE_MOCK) {
      return mockResponse(mock.mockTools.slice(0, 2))
    }
    return request({ url: '/users/favorites' })
  },

  addFavorite: async (toolId) => {
    if (USE_MOCK) {
      return mockResponse({ message: 'Added to favorites' })
    }
    return request({
      url: `/users/favorites/${toolId}`,
      method: 'POST'
    })
  },

  removeFavorite: async (toolId) => {
    if (USE_MOCK) {
      return mockResponse({ message: 'Removed from favorites' })
    }
    return request({
      url: `/users/favorites/${toolId}`,
      method: 'DELETE'
    })
  },

  getBrowseHistory: async () => {
    if (USE_MOCK) {
      return mockResponse(mock.mockTools.slice(0, 3))
    }
    return request({ url: '/users/history' })
  }
}

module.exports = {
  request,
  api,
  USE_MOCK
}