export interface INews {
  title: string
  pubDate: number
  summary: string
  infoSource: string
  pubDateStr: string
}

interface IBaseListState {
  page: number
  isFailed: boolean
  isFetchAllData: boolean
}

interface IOptionalProps {
  [index: string]: any
}

export interface IResponse {
  data?: object | undefined
}

export interface IAreaProps {
  dead: number
  name: string
  cured: number
  isEven?: boolean
  isShow?: boolean
  confirmed: number
  suspected: number
  isActive?: boolean
  isProvince?: boolean
}

export interface ISumCardProps {
  type: number
  todayData: number
  comparedData: number
}

export interface ITitleProps {
  title: string
  className: string
}

export interface IHomeCardProps {
  title: string
  content: string
  timestamp: number
  relativeTime: string
  source?: string | undefined
  isLast?: boolean | undefined
  isLatest?: boolean | undefined
}

export interface IResponseError {
  errMsg?: string | undefined
}

export interface IRumorCardProps {
  key?: number
  body: string
  index: number
  title: string
  isLast: boolean
  rumorId?: number
  rumorType: number
  mainSummary: string
}

export interface IRumorCardState {
  isToggled: boolean
}

interface IMapProps extends IAreaProps {
  cities: IAreaProps[]
}

export interface IPneumoniaMapState {
  mapList: IMapProps[]
}

export interface IHomeState extends IBaseListState {
  newsList: INews[]
}

export interface IBasePageProps extends ITitleProps {
  children: any
  onScrollToLower(event: any): any
  onScrollToUpper(event: any): any
}

export interface IRumorState extends IBaseListState {
  rumorList: IRumorCardProps[]
}

export interface IResponseData extends IOptionalProps {
  error?: any
  data?: object
  message: string
  code: number | string
  errmsg?: string | undefined
  result?: object | undefined
  status?: number | undefined
}

export interface IListState extends IBaseListState, IOptionalProps {
  // noop
}
