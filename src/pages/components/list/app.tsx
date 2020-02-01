import Taro, { Component } from '@tarojs/taro'
import * as api from '../../base/api'
import { IResponseError } from '../../../base/interfaces'

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

  state = {
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

  reachBottomEventHandler() {
    const { page, isFailed, isFetchAllData } = this.state
    if (isFetchAllData) return

    const callback = isFailed
      ? undefined
      : () => this.fetchFilteredList(this.filterMapCreator(), this.state.page)
    return this.setState({ page: page + 1 }, callback)
  }

  fetchList(page = 1, limit = 10) {
    return this.fetchFilteredList({}, page, limit)
  }

  fetchListCallback(limit: number) {
    return (error: IResponseError, list = []) => {
      if (error) return this.setState({ isFailed: true })

      // 执行 reset 操作
      const reset = function(length: number, threshold: number) {
        this.setState({ isFailed: false })

        if (length < threshold) {
          this.setState({ isFetchAllData: true })
        }
      }
      reset.call(this, list.length, limit)
      if (!list.length) return

      return this.updateListCallback(list)
    }
  }

  resetter(page = 1, isFetch = true) {
    const { page: lastPage } = this.state

    this.setState({ page, [this.listFieldName]: [], isFetchAllData: false })

    // 强制拉数据
    if (lastPage === page && isFetch)
      this.fetchFilteredList(this.filterMapCreator(), page)
  }

  updateListCallback(list: object[]) {
    const { [this.listFieldName]: realList = [] } = this.state

    return this.setState({ [this.listFieldName]: [...realList, ...list] })
  }

  pullDownRefreshEventHandler(isForce = true) {
    const { [this.listFieldName]: list = [] } = this.state
    if (list.length && !isForce) return

    return this.resetter()
  }

  fetchFilteredList(filterMap: object, page: number, limit = 10) {
    const query = { page, limit, ...filterMap }

    api[this.fetchMethodFieldName](this.fetchListCallback(limit), query)
  }
}
