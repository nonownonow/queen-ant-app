const {
  override,
  addBabelPlugin,
  addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
  addBabelPlugin([
    'styled-jsx/babel',
    {
      plugins: [['styled-jsx-plugin-sass', { optimizeForSpeed: true }]],
      vendorPrefixes: false
    }
  ]),
  addWebpackModuleRule({
    test: /\.(graphql|gql)$/,
    loader: 'graphql-tag/loader',
    exclude: /node_modules/
  })
)
