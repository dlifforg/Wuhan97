import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './app.scss'

export default class Card extends Component {
  render() {
    return (
      <View className='card'>
        <View className='card-time-wrapper'></View>
        <View className='card-text-wrapper'></View>
      </View>
    )
  }
}
