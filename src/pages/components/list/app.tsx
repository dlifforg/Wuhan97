import Taro, { Component } from '@tarojs/taro'

import * as api from '../../base/api'
import { IListState, IResponseError } from '../../../base/interfaces'

export default class List extends Component {
  static get defaultProps() {
    return {
      page: 1,
      isFailed: false,
      isFetchAllData: false,
    }
  }

  listFieldName = 'list'

  fetchMethodFieldName = 'fetchList'

  state: IListState = {
    ...List.defaultProps,
    [this.listFieldName]: [],
  }

  componentWillMount() {
    this.fetchList()
  }

  filterMapCreator() {
    const filterFields = []
    const reduceCallback = (object: object, filterField: string) => {
      const filterFieldValue = this.state[filterField]

      return filterFieldValue
        ? { ...object, [filterField]: filterFieldValue }
        : { ...object }
    }

    return filterFields.reduce(reduceCallback, {})
  }

  resetter(page = 1) {
    this.setState(
      { page, [this.listFieldName]: [], isFetchAllData: false },
      () => this.fetchFilteredListWrapper(this.state.page),
    )
  }

  onPullDownRefresh() {
    this.fetchList()
    wx.stopPullDownRefresh()
  }

  reachTopEventHandler = () => {
    this.pullDownRefreshEventHandler()
  }

  fetchList(page = 1, size = 10) {
    return this.fetchFilteredList({}, page, size)
  }

  fetchListCallback(size: number) {
    return (error: IResponseError, list = []) => {
      if (error) return this.setState({ isFailed: true })

      // 执行 reset 操作
      const reset = function(length: number, threshold: number) {
        this.setState({ isFailed: false })

        if (length < threshold) {
          this.setState({ isFetchAllData: true })
        }
      }
      reset.call(this, list.length, size)
      if (!list.length) return

      return this.updateListCallback(list)
    }
  }

  reachBottomEventHandler = () => {
    const { page, isFailed, isFetchAllData } = this.state
    if (isFetchAllData) return

    if (isFailed) {
      return this.fetchFilteredListWrapper(page)
    }

    return this.setState({ page: page + 1 }, () =>
      this.fetchFilteredListWrapper(this.state.page),
    )
  }

  updateListCallback(list: object[]) {
    const { [this.listFieldName]: realList = [] } = this.state

    return this.setState({ [this.listFieldName]: [...realList, ...list] })
  }

  fetchFilteredListWrapper(page: number) {
    this.fetchFilteredList(this.filterMapCreator(), page)
  }

  pullDownRefreshEventHandler(isForce = true) {
    const { [this.listFieldName]: list = [] } = this.state
    if (list.length && !isForce) return

    return this.resetter()
  }

  fetchFilteredList(filterMap: object, page: number, size = 10) {
    const offset = (page - 1) * size
    const limit = offset + size
    const query = { offset, limit, ...filterMap }

    api[this.fetchMethodFieldName](this.fetchListCallback(size), query)
  }
}
