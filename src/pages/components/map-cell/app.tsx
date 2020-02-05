import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { IAreaProps } from '../../../base/interfaces'

import './app.scss'

export default class MapCell extends Component<IAreaProps> {
  // state = { isActiveProvince: false }
  render() {
    const {
      dead,
      name,
      cured,
      isShow,
      isActive,
      confirmed,
      suspected,
      isProvince,
    } = this.props

    //isActiveProvince = isProvince && isActive;

    return (
      <View
        className={classNames(
          'cell',
          'clearfix',
          { 'cell-hide': !isShow },
          { 'cell-province': isProvince && !isActive },
          { 'cell-province-active': isProvince && isActive },
        )}
      >
        <Text className='cell-name cell-format'>{name}</Text>
        <Text className='cell-confirmed cell-format'>{confirmed}</Text>
        <Text className='cell-suspected cell-format'>{suspected}</Text>
        <Text className='cell-cured cell-format'>{cured}</Text>
        <Text className='cell-dead cell-format'>{dead}</Text>
      </View>
    )
  }
}
