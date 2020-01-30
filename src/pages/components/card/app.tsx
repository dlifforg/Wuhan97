import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './app.scss'

export default class Card extends Component {
  render() {
    return (
      <View className='card'>
        <View className='card-time-wrapper'>
          <View className='card-time'>
            <Text className='card-time-relative'>27 分钟前</Text>
            <Text className='card-time-precision'>1-30 13:51</Text>
          </View>
          <Text className='card-time-circle card-animation'></Text>
          <Text className='card-time-line'></Text>
        </View>
        <View className='card-text-wrapper'>
          <View className='card-text'>
            <View className='card-text-top-wrapper'>
              {true && <Text className='card-text-top-prefix'>最新</Text>}
              <Text className='card-text-top'>
                日本第二批包机返日人员中9人发烧
              </Text>
            </View>
            <View className='card-text-middle'>
              今天，载有210人的日本政府第二架包机从湖北武汉抵达羽田机场，其中有9人出现咳嗽和发烧等症状。另有原定乘飞机回国的2人在事前检查中，被检出有发烧咳嗽症状没有登机。
            </View>
            <View className='card-text-bottom'>信息来源：央视新闻</View>
          </View>
        </View>
      </View>
    )
  }
}
