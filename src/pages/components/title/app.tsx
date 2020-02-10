import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { ITitleProps } from '../../../base/interfaces'

import './app.scss'

export default class Title extends Component<ITitleProps> {
  render() {
    const { title, className, children } = this.props

    return (
      <View className={`${className}-title-wrapper`}>
        <Text className={`${className}-title`}>{title}</Text>
        <Text className={`${className}-title-prefix`}></Text>
        <Text className={`${className}-title-suffix`}>{children}</Text>
      </View>
    )
  }
}
