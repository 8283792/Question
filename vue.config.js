const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devServer: {
    open: true
  },
  baseUrl: './',
  outputDir: undefined,
  assetsDir: './',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  // configureWebpack: config => {
  //   if (isProduction) {
  //     config.externals = {
  //       'vue': 'Vue',
  //       'element-ui': 'ELEMENT',
  //       // 'vue-router': 'VueRouter',
  //       // 'vuex': 'Vuex',
  //       'axios': 'axios'
  //     }
  //   }
  // }
}
