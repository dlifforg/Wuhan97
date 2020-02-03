import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import * as echarts from './echarts'
import EcCanvas from './ec-canvas'
import geoJson from '../../pages/Map/china.geo.json'

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
    echarts.registerMap('china', geoJson);
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
    !lazyLoad && this.initChart()
  }
  componentWillReceiveProps(nextProps) {
    const { prevOption } = this.state
    if (prevOption !== nextProps.option) {
      if (this.chart) {
        try {
          this.chart.dispose()
        } catch (e) {
          console.error('[Custom Error] dispose hide error.')
        }
      }
      this.setState({
        prevOption: Object.assign({}, nextProps.option),
      })
      this.initChart()
    }
  }
  render() {
    const { defaultEc: ec } = this.state
    if (process.env.TARO_ENV === 'weapp') {
      return (
        <View style={`${this.props.style || 'height: 200px'}`}>
          <EcCanvas
            ref={ecComp => {
              this.ecComp = ecComp
            }}
            canvasId='mychart-area'
            ec={ec}
            echarts={echarts}
          />
        </View>
      )
    } else if (process.env.TARO_ENV === 'h5') {
      return (
        <View
          style={`${this.props.style || 'height: 200px'}`}
          ref={echartsRef => {
            this.ec = echartsRef
          }}
          id='chart-area'
        />
      )
    }
    return <View></View>
  }
}

export { Echart, echarts }
