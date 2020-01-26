import http from 'axios'
import { BASE_URL } from './constants'

let timeoutId: number | undefined
const messageCollection = {
  '4xx': '服务器异常，请稍后再试',
  '5xx': '服务器异常，请稍后再试',
  disconnect: '当前网络无法连接',
  default: '服务器异常，请稍后再试'
}

http.defaults.baseURL = BASE_URL
http.interceptors.response.use(({ data: { error, message, data } }) => {
  if (!error) return data

  return Promise.reject({ error, message })
}, (http) => {
  let message = '服务器异常，请稍后再试'

  if (http.response === undefined) {
    message = '当前网络无法连接，请修复后'
    errorHandler('disconnect')
  } else {
    errorHandler(http.response.status)
  }

  return Promise.reject({ error: http, message })
})

function errorHandler(status: string) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
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
        const code = `${matches[1] || matches[2]}xx`
        messageHandler(messageCollection[code], status)
        return
      }

      messageHandler(messageCollection.default)
    }, 100)
}

function messageHandler(error, code?: string | undefined) {}
