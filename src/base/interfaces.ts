export interface IResponse {
  data?: object
}

export interface ICardProps {
  title: string
  content: string
  timestamp: number
  isLatest?: boolean
  relativeTime: string
  source?: string | undefined
}

export interface IResponseData {
  error?: any
  code: number
  data: object
  errmsg?: string
  message: string
  result?: object
  status?: number
}

export interface IResponseError {
  errMsg?: string
}
