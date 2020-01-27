import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class Home extends Component {
  config: Config = {
    navigationBarTitleText: '实时疫情',
  }

  render() {
    return <View className='home'></View>
  }
}
