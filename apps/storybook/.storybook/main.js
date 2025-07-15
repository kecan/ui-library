module.exports = {
  stories: [
    '../stories/**/*.mdx',              // 保留介绍文档
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',  // 如果有其他自定义 stories
    '../../../packages/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'  // 组件 stories
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
