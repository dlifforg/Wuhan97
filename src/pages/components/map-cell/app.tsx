import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { IAreaProps } from '../../../base/interfaces'

import './app.scss'

export default class MapCell extends Component<IAreaProps> {
  // state = { isActiveProvince: false }
  render() {
    const {
      dead,
      name,
      cured,
      isEven,
      isShow,
      isHubei,
      isActive,
      confirmed,
      isProvince,
    } = this.props

    const num = (dead / confirmed) * 100 + ''
    const deadRate = num.substring(0, num.indexOf('.') + 3)
    const deadRateText = isHubei ? deadRate + '%' : '-'

    return (
      <View
        className={classNames(
          'cell',
          { 'cell-hide': !isShow },
          { 'cell-province': isProvince && !isActive },
          { 'cell-province-even': isProvince && isEven },
          { 'cell-province-active': isProvince && isActive },
        )}
      >
        <Text className='cell-name cell-format'>{name}</Text>
        <Text className='cell-confirmed cell-format'>{confirmed}</Text>

        <Text className='cell-cured cell-format'>{cured}</Text>
        <Text className='cell-dead cell-format'>{dead}</Text>
        <Text className='cell-dead cell-format'>{deadRateText}</Text>
      </View>
    )
  }
}
