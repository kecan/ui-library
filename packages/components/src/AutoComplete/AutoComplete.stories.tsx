import type { Meta, StoryObj } from '@storybook/react'
import AutoComplete from './index'
import type { AutoCompleteOption } from './index'

const mockOptions: AutoCompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
]

const countryOptions: AutoCompleteOption[] = [
  { value: 'cn', label: 'China' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
]

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AutoComplete component provides autocomplete functionality with keyboard navigation and customizable filtering.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    allowClear: {
      control: { type: 'boolean' },
    },
    maxDropdownHeight: {
      control: { type: 'number' },
    },
  },
  args: {
    onSelect: () => {},
    onChange: () => {},
    onSearch: () => {},
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Select a fruit',
  },
}

export const WithValue: Story = {
  args: {
    options: mockOptions,
    value: 'Apple',
    placeholder: 'Select a fruit',
  },
}

export const Small: Story = {
  args: {
    options: mockOptions,
    size: 'small',
    placeholder: 'Small size',
  },
}

export const Large: Story = {
  args: {
    options: mockOptions,
    size: 'large',
    placeholder: 'Large size',
  },
}

export const Disabled: Story = {
  args: {
    options: mockOptions,
    disabled: true,
    value: 'Apple',
    placeholder: 'Disabled state',
  },
}

export const WithClearButton: Story = {
  args: {
    options: mockOptions,
    allowClear: true,
    value: 'Apple',
    placeholder: 'Can be cleared',
  },
}

export const CustomMaxHeight: Story = {
  args: {
    options: mockOptions,
    maxDropdownHeight: 150,
    placeholder: 'Custom dropdown height (150px)',
  },
}

export const Countries: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country',
    allowClear: true,
  },
}

export const CustomFilter: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Custom filter (starts with)',
    filterOption: (inputValue: string, option: AutoCompleteOption) => {
      return option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    },
  },
}

export const AllFeatures: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Full featured AutoComplete',
    size: 'medium',
    allowClear: true,
    maxDropdownHeight: 200,
  },
}
