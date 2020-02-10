interface ISummaryData {
  name: string
  today: number
  compared: number
}

export interface INews {
  title: string
  pubDate: number
  summary: string
  infoSource: string
  pubDateStr: string
}

export interface IGuide {
  title: string
  imgUrl: string
  linkUrl: string
  createTime: number
  contentType: number
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

interface IBasePneumoniaMap {
  dead: number
  cured: number
  confirmed: number
  suspected: number
}

export interface ITitleProps {
  title: string
  className: string
}

export interface ISumCardProps {
  type: number
  todayData: number
  comparedData: number
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

export interface IPneumoniaMapResponseStatistics {
  deadIncr: number
  deadCount: number
  curedIncr: number
  curedCount: number
  confirmedIncr: number
  suspectedIncr: number
  suspectedCount: number
  confirmedCount: number
}

export interface IAreaProps extends IBasePneumoniaMap {
  name: string
  isShow: boolean
  isHubei: boolean
  isEven?: boolean
  isActive?: boolean
  isProvince?: boolean
}

interface IMapProps extends IAreaProps {
  cities: IAreaProps[]
}

export interface IPneumoniaMapState {
  mapList: IMapProps[]
  sumData: ISummaryData[]
}

interface IPneumoniaMapResponseCities extends IBasePneumoniaMap {
  cityName: string
}

export interface IPneumoniaMapResponseList extends IBasePneumoniaMap {
  provinceShortName: string
  cities: IPneumoniaMapResponseCities[]
}

export interface IPneumoniaMapResponse {
  listByArea: IPneumoniaMapResponseList[]
  statistics: IPneumoniaMapResponseStatistics
}

export interface IGuideCardProps extends IGuide {
  key?: number
}

export interface IHomeState extends IBaseListState {
  newsList: INews[]
}

export interface IBasePageProps extends ITitleProps {
  children: any
  onScrollToLower(event: any): any
  onScrollToUpper(event: any): any
}

export interface IGuideState extends IBaseListState {
  guideList: IGuide[]
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
