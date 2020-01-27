import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class Refuter extends Component {
  config: Config = {
    navigationBarTitleText: '辟除谣言',
  }

  render() {
    return <View className='refuter'></View>
  }
}
