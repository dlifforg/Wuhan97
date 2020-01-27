import axios from 'axios'
import { BASE_URL, STATUS_CODE_SUCCESS } from './constants'

let timeoutId: number | undefined
const messageCollection = {
  '4xx': '服务器异常，请稍后再试',
  '5xx': '服务器异常，请稍后再试',
  disconnect: '当前网络无法连接',
  default: '服务器异常，请稍后再试',
}

const messageHandler = (error, code?: string | undefined) => {
  const reason = code ? `(${code})` : ''

  wx.showToast({
    icon: 'none',
    title: `${error}${reason}`,
  })
}
const errorHandler = (status: string) => {
  clearTimeout(timeoutId)

  timeoutId = window.setTimeout(() => {
    if (typeof status === 'undefined') {
      messageHandler(messageCollection.default)
      return
    }

    const message = messageCollection[status]
    const code = status === 'disconnect' ? '' : status
    if (typeof message !== 'undefined') {
      messageHandler(message, code)
      return
    }

    const matches = status.toString().match(/^(4)|(5)\d+/)
    if (matches) {
      const codeType = `${matches[1] || matches[2]}xx`
      messageHandler(messageCollection[codeType], status)
      return
    }

    messageHandler(messageCollection.default)
  }, 100)
}

axios.defaults.baseURL = BASE_URL
axios.interceptors.response.use(
  ({ data: { error: code, message, data } }) => {
    if (code === STATUS_CODE_SUCCESS) return data

    wx.showToast({
      title: message,
      icon: 'none',
    })

    return Promise.reject({ code, message })
  },
  http => {
    let message = '服务器异常，请稍后再试'

    if (http.response === undefined) {
      message = '当前网络无法连接，请修复后再试'
      errorHandler('disconnect')
    } else {
      errorHandler(http.response.status)
    }

    return Promise.reject({ code: http, message })
  },
)
