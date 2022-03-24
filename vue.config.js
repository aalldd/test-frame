const path = require('path');


function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  publicPath: isProd ? '/production-sub-path/' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '/': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'));
  }
};
