const isProduction = process.env.NODE_ENV === 'production'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
  configureWebpack: config =>{
    if (isProduction) {
      config.externals = {
        'element-ui': 'ELEMENT',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'tinymce': 'Tinymce',
        'hbl-comment': 'window.default'
      }
    }
    /**
     *  查看依赖
     */
    // return {
    //     plugins:[
    //         new BundleAnalyzerPlugin()
    //     ]
    // }
  }
}
