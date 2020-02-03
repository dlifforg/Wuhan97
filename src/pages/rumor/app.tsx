import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './app.scss'

export default class Rumor extends Component {
  config: Config = {
    navigationBarTitleText: '辟除谣言',
  }

  render() {
    return (
      <View className='rumor'>
        <View className='rumor-title-wrapper'>
          <Text className='rumor-title'>辟除谣言</Text>
          <Text className='rumor-title-prefix'></Text>
        </View>
        <ScrollView scroll-y className='rumor-content'>
          <View className='rumor-content-inner'></View>
        </ScrollView>
      </View>
    )
  }
}
