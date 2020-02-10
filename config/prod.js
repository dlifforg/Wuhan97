module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  csso: {
    enable: true,
    config: {
      restructure: false,
    },
  },
  uglify: {
    enable: true,
    config: {},
  },
  defineConstants: {
    BASE_URL: '"https://workteams.net"',
    OTHER_BASE_URL: '"https://wuhan.wbjiang.cn/api"',
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
    },
  },
  h5: {},
}
