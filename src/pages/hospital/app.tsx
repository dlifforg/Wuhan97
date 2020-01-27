import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class Hospital extends Component {
  config: Config = {
    navigationBarTitleText: '定点医院',
  }

  render() {
    return <View className='hospital'></View>
  }
}
