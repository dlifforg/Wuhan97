import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import { Title } from '../title'

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
        <Title className={className} title={title} />
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
