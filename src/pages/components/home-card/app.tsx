import dayjs from 'dayjs'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ICardProps } from '../../../base/interfaces'

import './app.scss'

export default class HomeCard extends Component<ICardProps> {
  render() {
    const {
      title,
      source,
      content,
      timestamp,
      relativeTime,
      isLast = false,
      isLatest = false,
    } = this.props
    const hasSource = !!source
    const precisionTime = dayjs(timestamp).format('M-D H:mm')

    return (
      <View className='home-card'>
        <View className='home-card-time-wrapper'>
          <View className='home-card-time'>
            <Text className='home-card-time-relative'>{relativeTime}</Text>
            <Text className='home-card-time-precision'>{precisionTime}</Text>
          </View>
          <Text
            className={classNames('home-card-time-top-circle', {
              'home-card-animation': isLatest,
            })}
          ></Text>
          <Text className='home-card-time-line'></Text>
          {isLast && <Text className='home-card-time-bottom-circle'></Text>}
        </View>
        <View className='home-card-text-wrapper'>
          <View className='home-card-text'>
            <View className='home-card-text-top-wrapper'>
              {isLatest && (
                <Text className='home-card-text-top-prefix'>最新</Text>
              )}
              <Text className='home-card-text-top'>{title}</Text>
            </View>
            <View className='home-card-text-middle'>{content}</View>
            {hasSource && (
              <View className='home-card-text-bottom'>信息来源：{source}</View>
            )}
          </View>
        </View>
      </View>
    )
  }
}
