import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Echart } from '../../components/echarts'

import './app.scss'

const option = {
  tooltip: {
    trigger: 'item',
  },

  visualMap: {
    min: 0,
    max: 100,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true,
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  series: [
    {
      type: 'map',
      mapType: 'henan',
      label: {
        normal: {
          show: true,
        },
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0,
        },
      },
      animation: false,

      data: [
        { name: '郑州市', value: 100 },
        { name: '洛阳市', value: 10 },
        { name: '开封市', value: 20 },
        { name: '信阳市', value: 30 },
        { name: '驻马店市', value: 40 },
        { name: '南阳市', value: 41 },
        { name: '周口市', value: 15 },
        { name: '许昌市', value: 25 },
        { name: '平顶山市', value: 35 },
        { name: '新乡市', value: 35 },
        { name: '漯河市', value: 35 },
        { name: '商丘市', value: 35 },
        { name: '三门峡市', value: 35 },
        { name: '济源市', value: 35 },
        { name: '焦作市', value: 35 },
        { name: '安阳市', value: 35 },
        { name: '鹤壁市', value: 35 },
        { name: '濮阳市', value: 35 },
        { name: '开封市', value: 45 },
      ],
    },
  ],
}
export default class PneumoniaMap extends Component {
  config: Config = {
    navigationBarTitleText: '疫情地图',
  }

  render() {
    return (
      <View className='map'>
        <Echart option={option} />
      </View>
    )
  }
}
