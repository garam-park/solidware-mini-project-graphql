module.exports = {
  entry : "./server.js",
  output : {
    path : __dirname + "/public",
    filename : "bundle.js"
  },
  module : {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
