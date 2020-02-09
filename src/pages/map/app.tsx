import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { Title } from '../components/title'
import { MapCell } from '../components/map-cell'
import { EcMap } from '../../components/echarts'
import { SumCard } from '../components/sum-card'

import MapList from './mapList.json'
import { IPneumoniaMapState } from '../../base/interfaces'

import './app.scss'

const mapData = [
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
]
const sumData = [
  {
    today: 37251,
    compared: 3916,
  },
  {
    today: 28942,
    compared: 2657,
  },
  {
    today: 812,
    compared: 89,
  },
  {
    today: 2684,
    compared: 633,
  },
]
const currentMapList = MapList.listByArea.map(
  ({
    cities,
    provinceName,
    dead: provinceDead,
    cured: provinceCured,
    confirmed: provinceConfirmed,
    suspected: provinceSuspected,
  }) => ({
    isShow: true,
    isActive: false,
    isProvince: true,
    dead: provinceDead,
    name: provinceName,
    cured: provinceCured,
    confirmed: provinceConfirmed,
    suspected: provinceSuspected,
    cities: cities.map(
      ({ cityName: name, confirmed, suspected, cured, dead }) => ({
        dead,
        name,
        cured,
        confirmed,
        suspected,
        isShow: false,
        isProvince: false,
      }),
    ),
  }),
)

const option = {
  backgroundColor: '#f8f8f8',
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
      itemGap: 2,
    },
  ],
  series: [
    {
      type: 'map',
      map: 'china',
      mapType: 'map',
      zoom: 1.2,
      label: {
        normal: {
          show: true,
          fontSize: 8,
          distance: 5,
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
      data: mapData,
    },
  ],
}

export default class PneumoniaMap extends Component<IPneumoniaMapState> {
  listFieldName = 'mapList'

  // fetchMethodFieldName = 'fetchMapList'

  config: Config = {
    navigationBarTitleText: '疫情地图',
  }

  state: IPneumoniaMapState = {
    mapList: currentMapList,
  }

  clickEventHandler = (index: number) => {
    const { mapList } = this.state
    const newMapList = JSON.parse(JSON.stringify(mapList))

    const currentListItem = newMapList[index]
    currentListItem.isActive = !currentListItem.isActive
    currentListItem.cities = currentListItem.cities.map(
      ({ isShow, ...rest }) => ({ ...rest, isShow: !isShow }),
    )

    this.setState({ mapList: newMapList })
  }

  render() {
    const { mapList } = this.state

    return (
      <View className='map'>
        <Title className='map' title='疫情盘点' />
        <View className='map-body'>
          <View className='map-china'>
            <EcMap option={option} style='height: 718rpx' />
          </View>
          <View className='map-data'>
            <View className='map-case-title'>
              <Text className='map-case-title-info'>全国疫情数据</Text>
              <Text className='map-case-title-warning'>（含港澳台）</Text>
            </View>
            <View className='map-data-tip'>
              <Text className='map-data-tip-text'>截至2020-02-09 11:01 </Text>
            </View>
            <View className='map-data-sum'>
              {sumData.map((dataItem, index) => (
                <View className='map-data-item'>
                  <SumCard
                    key={index + 1}
                    type={index}
                    todayData={dataItem.today}
                    comparedData={dataItem.compared}
                  />
                </View>
              ))}
            </View>
          </View>
          <View className='map-case'>
            <View className='map-case-title'>
              <Text className='map-case-title-info'>国内病例</Text>
              <Text className='map-case-title-warning'>
                （数据如有滞后请谅解）
              </Text>
            </View>
            <View className='map-case-nav'>
              <Text className='map-case-nav-name'>地区</Text>
              <Text className='map-case-nav-format map-case-nav-confirmed'>
                确诊
              </Text>
              <Text className='map-case-nav-format'>疑似</Text>
              <Text className='map-case-nav-format map-case-nav-cured'>
                治愈
              </Text>
              <Text className='map-case-nav-format'>死亡</Text>
            </View>
            <View className='map-case-table'>
              {mapList.map((provinceCase, index) => (
                <View
                  key={index + 1}
                  onClick={() => this.clickEventHandler(index)}
                >
                  <MapCell
                    isEven={index % 2 === 0}
                    dead={provinceCase.dead}
                    name={provinceCase.name}
                    cured={provinceCase.cured}
                    isShow={provinceCase.isShow}
                    isActive={provinceCase.isActive}
                    confirmed={provinceCase.confirmed}
                    suspected={provinceCase.suspected}
                    isProvince={provinceCase.isProvince}
                  />
                  {provinceCase.isActive &&
                    provinceCase.cities.map((cityCase, indexCity) => (
                      <MapCell
                        key={indexCity + 1}
                        dead={cityCase.dead}
                        name={cityCase.name}
                        cured={cityCase.cured}
                        isShow={cityCase.isShow}
                        confirmed={cityCase.confirmed}
                        suspected={cityCase.suspected}
                        isProvince={cityCase.isProvince}
                      />
                    ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
