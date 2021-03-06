import Taro, { Component, Config } from '@tarojs/taro'
import Home from './pages/home/app'

import './app.scss'

class App extends Component {
  config: Config = {
    pages: [
      'pages/home/app',
      'pages/map/app',
      'pages/rumor/app',
      'pages/hospital/app',
      'pages/guide/app',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#666',
      backgroundColor: '#fff',
      selectedColor: '#333',
      borderStyle: 'white',
      list: [
        {
          text: '实时疫情',
          pagePath: 'pages/home/app',
          iconPath: 'asset/img/pneumonia-icon.png',
          selectedIconPath: 'asset/img/actived-pneumonia-icon.png',
        },
        {
          text: '疫情地图',
          pagePath: 'pages/map/app',
          iconPath: 'asset/img/map-icon.png',
          selectedIconPath: 'asset/img/actived-map-icon.png',
        },
        {
          text: '辟除谣言',
          pagePath: 'pages/rumor/app',
          iconPath: 'asset/img/rumor-icon.png',
          selectedIconPath: 'asset/img/actived-rumor-icon.png',
        },
        {
          text: '定点医院',
          pagePath: 'pages/hospital/app',
          iconPath: 'asset/img/hospital-icon.png',
          selectedIconPath: 'asset/img/actived-hospital-icon.png',
        },
        {
          text: '预防指南',
          pagePath: 'pages/guide/app',
          iconPath: 'asset/img/guide-icon.png',
          selectedIconPath: 'asset/img/actived-guide-icon.png',
        },
      ],
    },
  }

  componentDidCatchError (error: any) {
    console.error(`${error}`)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Home />
  }
}

Taro.render(<App />, document.getElementById('app'))
