import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Card } from '../components/card'
import { fetchPneumoniaList } from '../base/api'
import { IHomeState, IResponseError } from '../../base/interfaces'

import './app.scss'

export default class Home extends Component {
  config: Config = {
    navigationBarTitleText: '实时疫情',
  }
  state: IHomeState = {
    page: 1,
    isFailed: false,
    pneumoniaList: [],
    isFetchAllData: false,
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

    this.setState({
      page,
      pneumoniaList: [],
      isFetchAllData: false,
    })

    // 强制拉数据
    if (lastPage === page && isFetch)
      this.fetchFilteredList(this.filterMapCreator(), page)
  }

  updateListCallback(list: object[]) {
    const { pneumoniaList: realList = [] } = this.state

    return this.setState({ pneumoniaList: [...realList, ...list] })
  }

  pullDownRefreshEventHandler(isForce = true) {
    const { pneumoniaList: list = [] } = this.state
    if (list.length && !isForce) return

    return this.resetter()
  }

  fetchFilteredList(filterMap: object, page: number, limit = 10) {
    const query = { page, limit, ...filterMap }

    fetchPneumoniaList(this.fetchListCallback(limit), query)
  }

  render() {
    const { pneumoniaList } = this.state

    return (
      <View className='home'>
        <View className='home-title-wrapper'>
          <Text className='home-title'>实时疫情</Text>
          <Text className='home-title-prefix'></Text>
        </View>
        <ScrollView
          scroll-y
          className='home-content'
          onScrollToLower={this.reachBottomEventHandler}
          onScrollToUpper={() => this.pullDownRefreshEventHandler()}
        >
          <View className='home-content-inner'>
            {pneumoniaList.map((pneumonia, index) => (
              <Card
                key={index + 1}
                isLatest={index < 1}
                title={pneumonia.title}
                content={pneumonia.summary}
                source={pneumonia.infoSource}
                timestamp={pneumonia.pubDate}
                relativeTime={pneumonia.pubDateStr}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}
