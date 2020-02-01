export interface IResponse {
  data?: object
}

export interface IPneumonia {
  title: string
  pubDate: number
  summary: string
  infoSource: string
  pubDateStr: string
}

export interface ICardProps {
  title: string
  content: string
  isLast?: boolean
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

export interface IHomeState {
  page: number
  isFailed: boolean
  isFetchAllData: boolean
  pneumoniaList: IPneumonia[]
}
