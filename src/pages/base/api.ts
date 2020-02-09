import to from 'await-to-js'

import Tool from '../../utils/tool'
import * as http from '../../utils/http'
import { IResponseError } from '../../base/interfaces'

const fetchCallback = (
  error: IResponseError | Error | null,
  data: object,
  cb?: Function | undefined | null,
  isShowToast = true,
) => {
  const placeholder = void 0

  if (error) {
    // @ts-ignore
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
const fetchWrapper = (outerQuery = {}) => (
  url: string,
  method = 'get',
  config = {},
  isShowToast = true,
) => {
  return async (cb?: Function, query = {}, ...replacers: string[]) => {
    wx.showLoading({ title: '载入中...' })

    let resultingUrl = url
    if (replacers.length) {
      resultingUrl = replacers.reduce((template, replacer) => {
        return template.replace(/:[^/]+/, replacer)
      }, resultingUrl)
    }
    const [error, data] = await to(
      http[method](resultingUrl, { ...outerQuery, ...query }, config),
    )

    wx.hideLoading()

    return fetchCallback(error, data as object, cb, isShowToast)
  }
}
const wxFetchWrapper = (method: string, isShowToast = true) => {
  return async (cb: Function | undefined, option = {}) => {
    const [error, data] = await to(Tool.toWxAPIPromisify(wx[method])(option))

    return fetchCallback(error, data as object, cb, isShowToast)
  }
}

export const fetchNewsList = fetchWrapper({ prefix: 'News' })(
  `${BASE_URL}/index`,
)
export const fetchGuideList = fetchWrapper({ prefix: 'Care' })(
  `${BASE_URL}/index`,
)
export const fetchRumorList = fetchWrapper({ prefix: 'FakeNews' })(
  `${BASE_URL}/index`,
)

// built-in wx api
export const getSetting = wxFetchWrapper('getSetting')
export const getSystemInfo = wxFetchWrapper('getSystemInfo')
export const getLocation = wxFetchWrapper('getLocation', false)
export const setClipboardData = wxFetchWrapper('setClipboardData', false)
