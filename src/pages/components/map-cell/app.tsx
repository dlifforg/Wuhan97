import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { IMapProps } from '../../../base/interfaces'

import './app.scss'

export default class MapCell extends Component<IMapProps> {
  render() {
    const {
      dead,
      name,
      cured,
      isShow,
      confirmed,
      suspected,
      isProvince 
    } = this.props

    return (
       <View className={classNames('cell', 'clearfix', { 'cell-province': isProvince }, {'cell-show': isShow})}>
        <Text className='cell-name cell-format'>{name}</Text>
        <Text className='cell-confirmed cell-format'>{confirmed}</Text>
        <Text className='cell-suspected cell-format'>{suspected}</Text>
        <Text className='cell-cured cell-format'>{cured}</Text>
        <Text className='cell-dead cell-format'>{dead}</Text>
       </View>
    )
  }
}
