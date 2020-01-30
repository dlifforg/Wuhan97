export default class UtilityTool {
  static wait(time) {
    return new Promise(resolve => window.setTimeout(resolve, time))
  }

  static toWxAPIPromisify(func) {
    return (option, ...rest) => {
      return new Promise((resolve, reject) => {
        func(
          Object.assign({}, option, { success: resolve, fail: reject }),
          ...rest,
        )
      })
    }
  }

  static throttle(func, threshold = 160) {
    let id: number
    let startTime = new Date().getTime()

    return function(...args) {
      const currentTime = new Date().getTime()

      clearTimeout(id)
      if (currentTime - startTime >= threshold) {
        func.apply(this, args)
        startTime = currentTime
      } else {
        id = window.setTimeout(() => func.apply(this, args), threshold)
      }
    }
  }
}
