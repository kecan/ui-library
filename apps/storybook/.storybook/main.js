module.exports = {
  stories: [
    {
      directory: '../stories',
      files: '*.stories.@(js|jsx|mjs|ts|tsx)',
      titlePrefix: 'Docs',
    },
    {
      directory: '../../../packages/components/src',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
      titlePrefix: 'Components',
    },
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
  },
}
