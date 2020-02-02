export interface IResponse {
  data?: object | undefined
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
  timestamp: number
  relativeTime: string
  source?: string | undefined
  isLast?: boolean | undefined
  isLatest?: boolean | undefined
}

export interface IResponseData {
  error?: any
  data: object
  message: string
  code: number | string
  errmsg?: string | undefined
  result?: object | undefined
  status?: number | undefined
  success?: boolean | undefined
}

export interface IResponseError {
  errMsg?: string | undefined
}

interface IBaseListState {
  page: number
  isFailed: boolean
  isFetchAllData: boolean
}

export interface IHomeState extends IBaseListState {
  pneumoniaList: IPneumonia[]
}

export interface IListState extends IBaseListState {
  [index: string]: any
}
