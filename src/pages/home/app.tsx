import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Card } from '../components/card'

import './app.scss'

export default class Home extends Component {
  config: Config = {
    navigationBarTitleText: '实时疫情',
  }

  render() {
    return (
      <View className='home'>
        <View className='home-title-wrapper'>
          <Text className='home-title'>实时疫情</Text>
          <Text className='home-title-prefix'></Text>
        </View>
        <View className='home-content'>
          <Card />
        </View>
      </View>
    )
  }
}
