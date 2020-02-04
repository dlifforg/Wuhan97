import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { IRumorCardProps, IRumorCardState } from '../../../base/interfaces'

import './app.scss'

export default class RumorCard extends Component<
  IRumorCardProps,
  IRumorCardState
> {
  state = { isToggled: false }

  toggleEventHandler = () => {
    const { isToggled } = this.state

    this.setState({ isToggled: !isToggled })
  }

  render() {
    const { isToggled } = this.state
    const { body, title, index, isLast, rumorType, mainSummary } = this.props
    const imagePath =
      rumorType < 1 ? '/asset/img/rumor.png' : '/asset/img/truth.png'
    const iconPath = isToggled
      ? '/asset/img/caret-icon.png'
      : '/asset/img/caret-down-icon.png'

    return (
      <View
        className={classNames('rumor-card', { 'rumor-card-reset': isLast })}
      >
        <View className='rumor-card-id-wrapper'>
          <Text className='rumor-card-id'>{index}</Text>
        </View>
        <View className='rumor-card-image-wrapper'>
          <Image className='rumor-card-image' src={imagePath} />
        </View>
        <View className='rumor-card-title'>{title}</View>
        <View className='rumor-card-content'>
          <View className='rumor-card-content-head'>{mainSummary}</View>
          {isToggled && <View className='rumor-card-content-body'>{body}</View>}
          <View className='rumor-card-content-foot'>
            <View
              className='rumor-card-content-toggle'
              onClick={this.toggleEventHandler}
            >
              {isToggled ? '收起详情' : '展开详情'}
              <Image className='rumor-card-icon' src={iconPath} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
