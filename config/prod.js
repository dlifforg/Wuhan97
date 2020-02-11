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
    enable: false,
    config: {},
  },
  defineConstants: {
    BASE_URL: '"https://workteams.net"',
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
