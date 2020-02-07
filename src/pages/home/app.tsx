import Taro, { Config } from '@tarojs/taro'

import { List } from '../components/list'
import { BasePage } from '../components/base-page'
import { HomeCard } from '../components/home-card'

import { IHomeState } from '../../base/interfaces'

import './app.scss'

export default class Home extends List {
  listFieldName = 'pneumoniaList'

  fetchMethodFieldName = 'fetchPneumoniaList'

  config: Config = {
    navigationBarTitleText: '实时疫情',
  }

  state: IHomeState = {
    ...Home.defaultProps,
    pneumoniaList: [],
  }

  render() {
    const { pneumoniaList } = this.state

    return (
      <BasePage
        title='实时疫情'
        className='home'
        onScrollToUpper={this.reachTopEventHandler}
        onScrollToLower={this.reachBottomEventHandler}
      >
        {pneumoniaList.map((pneumonia, index, list) => (
          <HomeCard
            key={index + 1}
            isLatest={index < 1}
            title={pneumonia.title}
            content={pneumonia.summary}
            source={pneumonia.infoSource}
            timestamp={pneumonia.pubDate}
            isLast={index + 1 === list.length}
            relativeTime={pneumonia.pubDateStr}
          />
        ))}
      </BasePage>
    )
  }
}
