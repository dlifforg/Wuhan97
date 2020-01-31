import to from 'await-to-js'
import Tool from '../../utils/tool'
import * as http from '../../utils/http'
import { BASE_URL } from '../../base/constants'
import { IResponseError } from '../../base/interfaces'

const fetchCallback = (
  error: IResponseError,
  data: object,
  cb?: Function | undefined | null,
  isShowToast = true,
) => {
  const placeholder = void 0

  if (error) {
    const wrappedError: string = (error.errMsg || error) as string
    const [resultingError] = wrappedError.split('-')

    if (isShowToast) {
      return (
        wx.showToast({
          icon: 'none',
          title: `${resultingError}`,
          complete() {
            cb && cb(resultingError)
          },
        }),
        placeholder
      )
    }

    return cb && cb(resultingError), placeholder
  }

  return cb && cb(placeholder, data), data
}
const fetchWrapper = (
  url: string,
  method = 'get',
  config = {},
  isShowToast = true,
) => {
  return async (cb: Function, query = {}, ...replacers: string[]) => {
    // hide former loading before showing a new loading
    wx.hideLoading({
      complete() {
        return wx.showLoading({ title: 'Loading' })
      },
    })

    let resultingUrl = url
    if (replacers.length) {
      resultingUrl = replacers.reduce((template, replacer) => {
        return template.replace(/:[^/]+/, replacer)
      }, resultingUrl)
    }
    const [error, data] = await to(http[method](resultingUrl, query, config))

    wx.hideLoading()

    return fetchCallback(error, data, cb, isShowToast)
  }
}
const wxFetchWrapper = (method: string, isShowToast = true) => {
  return async (cb: Function, option = {}) => {
    const [error, data] = await to(Tool.toWxAPIPromisify(wx[method])(option))

    return fetchCallback(error, data as object, cb, isShowToast)
  }
}

export const fetchPneumoniaList = fetchWrapper(`${BASE_URL}/pneumonia/list`)

// built-in wx api
export const getSystemInfo = wxFetchWrapper('getSystemInfo')
export const getSetting = wxFetchWrapper('getSetting')
export const setClipboardData = wxFetchWrapper('setClipboardData', false)
export const getLocation = wxFetchWrapper('getLocation', false)
