import Taro, { Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Card } from '../components/card'
import { List } from '../components/list'
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
            {pneumoniaList.map((pneumonia, index, list) => (
              <Card
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
          </View>
        </ScrollView>
      </View>
    )
  }
}
