import type { Meta, StoryObj } from '@storybook/react'
import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'KC UI 的基础按钮组件，支持多种样式和尺寸。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: '按钮的视觉样式'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '按钮的尺寸'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用按钮'
    },
    onClick: {
      action: 'clicked',
      description: '点击事件回调'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 基础示例
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}

// 尺寸示例
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button'
  }
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button'
  }
}

// 状态示例
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}

// 组合示例
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  )
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}