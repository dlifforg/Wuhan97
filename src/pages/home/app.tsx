import Taro, { Config } from '@tarojs/taro'

import { List } from '../components/list'
import { BasePage } from '../components/base-page'
import { HomeCard } from '../components/home-card'

import { IHomeState } from '../../base/interfaces'

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
            isLast={index + 1 === list.length}
          />
        ))}
      </BasePage>
    )
  }
}
