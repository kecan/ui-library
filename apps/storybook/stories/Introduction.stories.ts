import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Introduction',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '欢迎使用 KC UI Library - 一个基于 React 的组件库',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => null,
  parameters: {
    docs: {
      source: { code: 'npm install @kc-ui/components' },
    },
  },
}
