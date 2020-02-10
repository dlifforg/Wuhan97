export const timeout = 10000

export const guideTypeMap = {
  1: '我要出行',
  2: '家有小孩',
  3: '给医务者',
  4: '我宅在家',
  5: '家有老人',
  6: '家有孕妇',
}

export const mapDefaultOption = {
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
      data: [],
    },
  ],
}
