import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { EcCanvas } from './components'

import Tool from '../../utils/tool'
import * as echarts from './lib/echarts'
import geoJson from './json/china.geo.json'

import './app.scss'

class Echart extends Component {
  state = {
    defaultEc: {
      lazyLoad: false,
      disableTouch: true,
    },
    prevOption: {},
  }

  initChart() {
    echarts.registerMap('china', geoJson)

    const { option } = this.props
    if (option && option.tooltip) {
      console.warn('option 中包含 tooltip 更新 option 会出现 hide error')
    }

    let chart
    switch (process.env.TARO_ENV) {
      case 'h5':
        chart = echarts.init(this.ec.vnode.dom)
        chart.setOption(option)
        this.props.onInit && this.props.onInit(chart)
        this.chart = chart
        return chart
      case 'weapp':
        this.ecComp.init((canvas, width, height) => {
          chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: wx.getSystemInfoSync().pixelRatio,
          })
          canvas.setChart(chart)
          chart.setOption(option)
          this.props.onInit && this.props.onInit(chart)
          this.chart = chart
          return chart
        })
        break
    }
  }

  componentDidMount() {
    const { lazyLoad = false, disableTouch = true } = this.props.ec || {}

    this.setState({ defaultEc: { lazyLoad, disableTouch } })
    if (!lazyLoad) {
      this.initChart()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { prevOption } = this.state
    if (Tool.isEqual(prevOption, nextProps.option)) return

    if (Object.keys(prevOption).length && this.chart) {
      try {
        this.chart.dispose()
      } catch (e) {
        console.error('[Custom Error] dispose hide error.')
      }
    }

    this.setState({ prevOption: Object.assign({}, nextProps.option) })
    this.initChart()
  }

  render() {
    const { defaultEc: ec } = this.state

    if (process.env.TARO_ENV === 'weapp') {
      return (
        <View style={`${this.props.style || 'height: 200px'}`}>
          <EcCanvas
            ec={ec}
            echarts={echarts}
            canvasId='chart-area'
            ref={ecComp => {
              this.ecComp = ecComp
            }}
          />
        </View>
      )
    } else if (process.env.TARO_ENV === 'h5') {
      return (
        <View
          id='chart-area'
          ref={echartsRef => {
            this.ec = echartsRef
          }}
          style={`${this.props.style || 'height: 200px'}`}
        />
      )
    }

    return <View></View>
  }
}

export { Echart, echarts }
