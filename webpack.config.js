const path = require('path');

module.exports = {
  entry: './src/old-app.js',
  output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
      }
    ]
  }
};
