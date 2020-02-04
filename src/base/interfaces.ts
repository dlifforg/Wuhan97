interface IBaseListState {
  page: number
  isFailed: boolean
  isFetchAllData: boolean
}

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

interface IAreaProps {
  confirmed: number
  suspected: number
  cured: number
  dead: number
}

// interface ICityProps extends IAreaProps {
//   cityName: string
// }

// export interface IMapProps extends IAreaProps {
//   provinceName: string
//   cities: ICityProps[]
//   comment: string
// }
interface IMapProps extends IAreaProps {
  name: string
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

export interface IBasePageProps {
  children: any
  title: string
  className: string
  onScrollToLower(event: any): any
  onScrollToUpper(event: any): any
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
  rumorId: number
  rumorType: number
  mainSummary: string
}

export interface IRumorCardState {
  isToggled: boolean
}

export interface IHomeState extends IBaseListState {
  pneumoniaList: IPneumonia[]
}

export interface IListState extends IBaseListState {
  [index: string]: any
}

export interface IRumorState extends IBaseListState {
  rumorList: any[]
}

export interface IPneumoniaMapState extends IBaseListState {
  mapList: IMapProps[]
}