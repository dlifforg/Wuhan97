import Tool from './tool'
import { timeout } from '../base/constants'
import { IResponse, IResponseData, IResponseError } from '../base/interfaces'

const success = (response: IResponse) => {
  let { data = {} } = response
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch ({ message }) {
      data = {
        message,
        code: 'fail',
      }
    }
  }

  const {
    status,
    result,
    data: realData,
    message: nativeMessage,
    errmsg: mockErrorMessage,
    success: isSuccess = true,
  } = data as IResponseData

  if (!status && realData !== null && isSuccess) return realData || result
  if (mockErrorMessage || nativeMessage) throw mockErrorMessage || nativeMessage

  return realData
}
const fail = (error: IResponseError) => {
  throw error.errMsg || error
}

const request = (method: string, url: string, query: object, config = {}) => {
  const data = Object.entries(query).reduce((object, [key, value]) => {
    if (typeof value !== 'object') value = decodeURIComponent(value)
    return { ...object, [key]: value }
  }, {})

  return Promise.race([
    Tool.toWxAPIPromisify(wx.request)({
      url,
      data,
      method,
      ...config,
    }).then(success, fail),
    Tool.wait(timeout).then(() => {
      throw new Error('请求超时')
    }),
  ])
}
const uploadFile = (url: string, option: object, rest: object) => {
  return Tool.toWxAPIPromisify(wx.uploadFile)({
    url,
    ...option,
    ...rest,
  }).then(success, fail)
}

const get = (url: string, query = {}, config: object) =>
  request('GET', url, query, config)
const post = (url: string, query = {}, config: object) =>
  request('POST', url, query, config)
const put = (url: string, query = {}, config: object) =>
  request('PUT', url, query, config)
const del = (url: string, query = {}, config: object) =>
  request('DELETE', url, query, config)
const patch = (url: string, query = {}, config: object) =>
  request('PATCH', url, query, config)
const upload = (url: string, data = {}, config: object) =>
  uploadFile(url, data, config)

export { get, post, put, del as delete, patch, upload }
