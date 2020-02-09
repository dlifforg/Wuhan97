import dayjs from 'dayjs'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'

import { setClipboardData } from '../../base/api'
import { guideTypeMap } from '../../../base/constants'
import { IGuideCardProps } from '../../../base/interfaces'

import './app.scss'

export default class GuideCard extends Component<IGuideCardProps> {
  copyEventHandler = async (data: string) => {
    const result = await setClipboardData(undefined, { data })

    wx.hideToast({
      complete() {
        wx.showToast(
          result ? { title: '复制成功' } : { icon: 'none', title: '复制失败' },
        )
      },
    })
  }

  render() {
    const { title, imgUrl, createTime, contentType, linkUrl } = this.props
    const time = dayjs(createTime).format('M-D H:mm')

    return (
      <View className='guide-card'>
        <View className='guide-card-text-container'>
          <View className='guide-card-text-title-container'>
            <Text
              className={classNames(
                'guide-card-text-prefix',
                `guide-card-text-prefix-${contentType}`,
              )}
            >
              {guideTypeMap[contentType]}
            </Text>
            <Text className='guide-card-text-title'>{title}</Text>
          </View>
          <View className='guide-card-text-content'>
            <Text className='guide-card-text-time'>{time}</Text>
            <Button
              className='guide-card-text-link'
              onClick={this.copyEventHandler.bind(this, linkUrl)}
            >
              复制链接
            </Button>
          </View>
        </View>
        <View className='guide-card-media-container'>
          <Image className='guide-card-media' src={imgUrl} lazyLoad />
        </View>
      </View>
    )
  }
}
