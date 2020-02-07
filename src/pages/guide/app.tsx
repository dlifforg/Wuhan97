import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class Guide extends Component {
  config: Config = {
    navigationBarTitleText: '预防指南',
  }

  render() {
    return <View className='guide'></View>
  }
}
