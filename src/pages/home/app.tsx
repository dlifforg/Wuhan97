import Taro, { Config } from '@tarojs/taro'

import { List } from '../components/list'
import { BasePage } from '../components/base-page'
import { HomeCard } from '../components/home-card'

import * as api from '../base/api'
import { INews, IHomeState } from '../../base/interfaces'

import './app.scss'

export default class Home extends List {
  listFieldName = 'newsList'

  fetchMethodFieldName = 'fetchNewsList'

  config: Config = {
    navigationBarTitleText: '实时疫情',
  }

  state: IHomeState = {
    ...Home.defaultProps,
    newsList: [],
  }

  responseFilter(list: INews[]) {
    return list.map(
      ({ title, pubDate, summary, infoSource, pubDateStr, provinceName }) => ({
        title,
        pubDate,
        summary,
        infoSource,
        pubDateStr,
        provinceName,
      }),
    )
  }

  fetchFilteredList(filterMap: object, pageNo: number, pageSize = 10) {
    const query = { pageNo, pageSize, ...filterMap }

    api[this.fetchMethodFieldName](this.fetchListCallback(pageSize), query)
  }

  render() {
    const { newsList } = this.state

    return (
      <BasePage
        title='联播快讯'
        className='home'
        onScrollToUpper={this.reachTopEventHandler}
        onScrollToLower={this.reachBottomEventHandler}
      >
        {newsList.map((news, index, list) => (
          <HomeCard
            key={index + 1}
            title={news.title}
            isLatest={index < 1}
            content={news.summary}
            source={news.infoSource}
            timestamp={news.pubDate}
            relativeTime={news.pubDateStr}
            provinceName={news.provinceName}
            isLast={index + 1 === list.length}
          />
        ))}
      </BasePage>
    )
  }
}
