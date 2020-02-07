interface IBaseListState {
  page: number
  isFailed: boolean
  isFetchAllData: boolean
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

export interface IPneumonia {
  title: string
  pubDate: number
  summary: string
  infoSource: string
  pubDateStr: string
}

export interface ITitleProps {
  title: string
  className: string
}

// interface ICityProps extends IAreaProps {
//   cityName: string
// }

// export interface IMapProps extends IAreaProps {
//   provinceName: string
//   cities: ICityProps[]
//   comment: string
// }

// export interface IAreaState {
//   isActiveProvince: boolean
// }

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
  pneumoniaList: IPneumonia[]
}

export interface IListState extends IBaseListState {
  [index: string]: any
}

export interface IBasePageProps extends ITitleProps {
  children: any
  onScrollToLower(event: any): any
  onScrollToUpper(event: any): any
}

export interface IRumorState extends IBaseListState {
  rumorList: IRumorCardProps[]
}
