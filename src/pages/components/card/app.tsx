import dayjs from 'dayjs'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './app.scss'

interface IProps {
  title: string
  content: string
  timestamp: number
  isLatest?: boolean
  relativeTime: string
  source?: string | undefined
}

export default class Card extends Component<IProps> {
  render() {
    const {
      title,
      source,
      content,
      timestamp,
      relativeTime,
      isLatest = false,
    } = this.props
    const hasSource = !!source
    const precisionTime = dayjs(timestamp).format('M-D h:m')

    return (
      <View className='card'>
        <View className='card-time-wrapper'>
          <View className='card-time'>
            <Text className='card-time-relative'>{relativeTime}</Text>
            <Text className='card-time-precision'>{precisionTime}</Text>
          </View>
          <Text
            className={classNames('card-time-circle', {
              'card-animation': isLatest,
            })}
          ></Text>
          <Text className='card-time-line'></Text>
        </View>
        <View className='card-text-wrapper'>
          <View className='card-text'>
            <View className='card-text-top-wrapper'>
              {isLatest && <Text className='card-text-top-prefix'>最新</Text>}
              <Text className='card-text-top'>{title}</Text>
            </View>
            <View className='card-text-middle'>{content}</View>
            {hasSource && (
              <View className='card-text-bottom'>信息来源：{source}</View>
            )}
          </View>
        </View>
      </View>
    )
  }
}
