module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    // '@storybook/addon-actions',
    // '@storybook/addon-links',
    // '@storybook/addon-actions/register',
    // '@storybook/addon-knobs/register'
  ],
  babel: {
    plugins: [
      [
        'styled-jsx/babel',
        {
          plugins: [
            ['styled-jsx-plugin-sass', { plugins: ['styled-jsx-plugin-sass'] }],
          ],
        },
      ]
    ],
  },
}
