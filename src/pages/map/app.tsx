import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Echart } from '../../components/echarts'

import './app.scss'

const option = {
  tooltip: {
    trigger: 'item',
  },
  visualMap: [
    {
      type: 'piecewise',
      pieces: [
        { min: 10000, color: '#7f1100' }, 
        { min: 1000, max: 9999, color: '#bd1317' }, 
        { min: 500, max: 999, color: '#e74a45' },
        { min: 100, max: 499, color: '#ff8b71' },
        { min: 10, max: 99, color: '#fdd2a0' },
        { min: 1, max: 9, color: '#fff3cf' },
      ],
      textStyle: {
        color: '#000',
        fontSize: 8,
      },
      itemGap: 2
    }
  ],
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    itemSize: 10,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  series: [
    {
      type: 'map',
      map: 'china',
      mapType: 'map',
      label: {
        normal: {
          show: true,
          fontSize: 8,
          distance: 5
        },
        emphasis: {
          textStyle: {
            color: '#fff',
            fontSize: 8,
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#a9a9a9',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#000',
          borderWidth: 0,
        },
      },
      animation: false,
      data: [
        { name: '湖北', value: 11177 },
        { name: '浙江', value: 714 },
        { name: '广东', value: 683 },
        { name: '河南', value: 566 },
        { name: '湖南', value: 521 },
        { name: '安徽', value: 408 },
        { name: '江西', value: 391 },
        { name: '重庆', value: 312 },
        { name: '江苏', value: 271 },
        { name: '四川', value: 254 },
        { name: '山东', value: 246 },
        { name: '上海', value: 193 },
        { name: '北京', value: 191 },
        { name: '福建', value: 179 },
        { name: '陕西', value: 128 },
        { name: '广西', value: 127 },
        { name: '黑龙江', value: 118 },
        { name: '河北', value: 113 },
        { name: '云南', value: 105 },
        { name: '辽宁', value: 73 },
        { name: '海南', value: 71 },
        { name: '山西', value: 66 },
        { name: '天津', value: 56 },
        { name: '甘肃', value: 51 },
        { name: '贵州', value: 46 },
        { name: '内蒙古', value: 34 },
        { name: '宁夏', value: 31 },
        { name: '吉林', value: 31 },
        { name: '新疆', value: 24 },
        { name: '香港', value: 15 },
        { name: '青海', value: 13 },
        { name: '台湾', value: 10 },
        { name: '澳门', value: 8 },
        { name: '西藏', value: 1 },
        { name: '南海诸岛', value: 0 },
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
