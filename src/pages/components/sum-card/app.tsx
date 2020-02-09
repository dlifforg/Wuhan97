import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ISumCardProps } from '../../../base/interfaces'

import './app.scss'

export default class SumCard extends Component<ISumCardProps> {
  // state = { isActiveProvince: false }
  render() {
    const { type, todayData, comparedData } = this.props

    const textList = ['确诊', '疑似', '死亡', '治愈']
    const textItem = textList[type]
    const colorType = 'sum-color-type' + type

    return (
      <View className='sum'>
        <View className='sum-des'>
          <Text>{textItem}</Text>
        </View>
        <View className='sum-num'>
          <Text className={colorType}>{todayData}</Text>
        </View>
        <View className='sum-compare'>
          <Text>较昨日</Text>
          <Text className={colorType}>+</Text>
          <Text className={colorType}>{comparedData}</Text>
        </View>
      </View>
    )
  }
}
