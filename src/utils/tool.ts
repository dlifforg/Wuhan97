export default class UtilityTool {
  static wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  static toWxAPIPromisify(func: Function) {
    return (option: object, ...rest: any[]) => {
      return new Promise((resolve, reject) => {
        func(
          Object.assign({}, option, { success: resolve, fail: reject }),
          ...rest,
        )
      })
    }
  }

  static isEqual(first: object, last: object) {
    return JSON.stringify(first) === JSON.stringify(last)
  }

  static throttle(func: Function, threshold = 160) {
    let id: number
    let startTime = new Date().getTime()

    return function(...args: any[]) {
      const currentTime = new Date().getTime()

      clearTimeout(id)
      if (currentTime - startTime >= threshold) {
        func.apply(this, args)
        startTime = currentTime
      } else {
        id = setTimeout(() => func.apply(this, args), threshold)
      }
    }
  }
}
