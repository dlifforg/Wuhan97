declare module "*.png"
declare module "*.gif"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"
declare module "*.css"
declare module "*.less"
declare module "*.scss"
declare module "*.sass"
declare module "*.styl"

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq'
    [key: string]: any
  }
}

// @ts-ignore
declare const wx: any

// @ts-ignore
declare const BASE_URL: string

// @ts-ignore
declare const OTHER_BASE_URL: string
