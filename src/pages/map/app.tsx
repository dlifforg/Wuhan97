import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class PneumoniaMap extends Component {
  config: Config = {
    navigationBarTitleText: '疫情地图',
  }

  render() {
    return <View className='map'></View>
  }
}
