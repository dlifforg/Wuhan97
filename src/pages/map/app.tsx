import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import * as api from '../base/api'

import { Title } from '../components/title'
import { MapCell } from '../components/map-cell'
import { EcMap } from '../../components/echarts'
import { SumCard } from '../components/sum-card'

import { IPneumoniaMapState, IResponseError } from '../../base/interfaces'

import './app.scss'

const now = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
const mapData = []

const option = {
  backgroundColor: '#f8f8f8',
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
          show: true,
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

  fetchMethodFieldName = 'fetchMapList'

  config: Config = {
    navigationBarTitleText: '疫情地图',
  }

  state: IPneumoniaMapState = {
    mapList: [],
    sumData: [],
  }

  toggleEventHandler = (index: number) => {
    const { mapList } = this.state
    const newMapList = JSON.parse(JSON.stringify(mapList))

    const currentListItem = newMapList[index]
    currentListItem.isActive = !currentListItem.isActive
    currentListItem.cities = currentListItem.cities.map(
      ({ isShow, ...rest }) => ({ ...rest, isShow: !isShow }),
    )

    this.setState({ mapList: newMapList })
  }

  componentWillMount() {
    this.fetchMapList()
  }

  onPullDownRefresh() {
    this.fetchMapList()
    wx.stopPullDownRefresh()
  }

  fetchMapList() {
    api[this.fetchMethodFieldName](this.fetchMapListCallback())
  }

  fetchMapListCallback() {
    return (error: IResponseError, list = []) => {
      if (error) return
      const areaData = list.listByArea
      areaData.map(provinceItem => {
        mapData.push({
          name: provinceItem.provinceShortName,
          value: provinceItem.confirmed,
        })
      })
      const currentMapList = this.formatMapTable(areaData)
      const statistics = list.statistics
      const sumData = [
        {
          name: 'confirmed',
          today: statistics.confirmedCount,
          compared: statistics.confirmedIncr,
        },
        {
          name: 'suspected',
          today: statistics.suspectedCount,
          compared: statistics.suspectedIncr,
        },
        {
          name: 'dead',
          today: statistics.deadCount,
          compared: statistics.deadIncr,
        },
        {
          name: 'cure',
          today: statistics.curedCount,
          compared: statistics.curedIncr,
        },
      ]
      this.setState({ sumData, mapList: currentMapList })
    }
  }

  formatMapTable(list) {
    return list.map(
      ({
        cities,
        provinceShortName,
        dead: provinceDead,
        cured: provinceCured,
        confirmed: provinceConfirmed,
        suspected: provinceSuspected,
      }) => ({
        isShow: true,
        isActive: false,
        isProvince: true,
        dead: provinceDead,
        name: provinceShortName,
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
  }

  render() {
    const { mapList, sumData } = this.state

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
              <Text className='map-data-tip-text'>截至</Text>
              <Text className='map-data-tip-text'>{now}</Text>
            </View>
            <View className='map-data-sum'>
              {sumData.map((dataItem, index) => (
                <View key={index + 1} className='map-data-item'>
                  <SumCard
                    type={index}
                    key={index + 1}
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
                  onClick={this.toggleEventHandler.bind(this, index)}
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
