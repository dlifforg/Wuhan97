import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import { IBasePageProps } from '../../../base/interfaces'

import './app.scss'

export default class BasePage extends Component<IBasePageProps> {
  render() {
    const {
      title,
      children,
      className,
      onScrollToLower,
      onScrollToUpper,
    } = this.props

    return (
      <View className={className}>
        <View className={`${className}-title-wrapper`}>
          <Text className={`${className}-title`}>{title}</Text>
          <Text className={`${className}-title-prefix`}></Text>
        </View>
        <ScrollView
          scroll-y
          className={`${className}-content`}
          onScrollToLower={onScrollToLower}
          onScrollToUpper={onScrollToUpper}
        >
          <View className={`${className}-content-inner`}>{children}</View>
        </ScrollView>
      </View>
    )
  }
}
