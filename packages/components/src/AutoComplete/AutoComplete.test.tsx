import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AutoComplete from './index'
import type { AutoCompleteOption } from './index'

const mockOptions: AutoCompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

describe('AutoComplete', () => {
  const user = userEvent.setup()

  it('renders with placeholder', () => {
    render(<AutoComplete options={mockOptions} placeholder="Select fruit" />)
    expect(screen.getByPlaceholderText('Select fruit')).toBeInTheDocument()
  })

  it('renders with initial value', () => {
    render(<AutoComplete options={mockOptions} value="Apple" />)
    expect(screen.getByDisplayValue('Apple')).toBeInTheDocument()
  })

  it('shows dropdown when input is focused', async () => {
    render(<AutoComplete options={mockOptions} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.getByText('Cherry')).toBeInTheDocument()
    })
  })

  it('filters options based on input', async () => {
    render(<AutoComplete options={mockOptions} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    await user.type(input, 'app')
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
    })
  })

  it('selects option on click', async () => {
    const onSelect = vi.fn()
    const onChange = vi.fn()
    
    render(
      <AutoComplete 
        options={mockOptions} 
        onSelect={onSelect}
        onChange={onChange}
      />
    )
    
    const input = screen.getByRole('textbox')
    await user.click(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Apple'))
    
    expect(onSelect).toHaveBeenCalledWith('apple', { value: 'apple', label: 'Apple' })
    expect(onChange).toHaveBeenCalledWith('Apple')
    expect(input).toHaveValue('Apple')
  })

  it('navigates options with keyboard', async () => {
    render(<AutoComplete options={mockOptions} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByText('Apple')).toHaveClass('autocomplete__option--highlighted')
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByText('Banana')).toHaveClass('autocomplete__option--highlighted')
    
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(screen.getByText('Apple')).toHaveClass('autocomplete__option--highlighted')
  })

  it('selects option with Enter key', async () => {
    const onSelect = vi.fn()
    
    render(<AutoComplete options={mockOptions} onSelect={onSelect} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(onSelect).toHaveBeenCalledWith('apple', { value: 'apple', label: 'Apple' })
    expect(input).toHaveValue('Apple')
  })

  it('closes dropdown with Escape key', async () => {
    render(<AutoComplete options={mockOptions} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(input, { key: 'Escape' })
    
    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })
  })

  it('shows clear button when allowClear is true and has value', () => {
    render(<AutoComplete options={mockOptions} allowClear value="Apple" />)
    expect(screen.getByLabelText('Clear')).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const onChange = vi.fn()
    
    render(
      <AutoComplete 
        options={mockOptions} 
        allowClear 
        value="Apple" 
        onChange={onChange}
      />
    )
    
    const clearButton = screen.getByLabelText('Clear')
    await user.click(clearButton)
    
    expect(onChange).toHaveBeenCalledWith('')
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('is disabled when disabled prop is true', () => {
    render(<AutoComplete options={mockOptions} disabled />)
    const input = screen.getByRole('textbox')
    
    expect(input).toBeDisabled()
    expect(input).toHaveClass('autocomplete__input--disabled')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<AutoComplete options={mockOptions} size="small" />)
    expect(screen.getByRole('textbox').closest('.autocomplete')).toHaveClass('autocomplete--small')
    
    rerender(<AutoComplete options={mockOptions} size="large" />)
    expect(screen.getByRole('textbox').closest('.autocomplete')).toHaveClass('autocomplete--large')
  })

  it('uses custom filter function when provided', async () => {
    const customFilter = (inputValue: string, option: AutoCompleteOption) => 
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    
    render(<AutoComplete options={mockOptions} filterOption={customFilter} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    await user.type(input, 'a')
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })
  })

  it('calls onSearch when input changes', async () => {
    const onSearch = vi.fn()
    
    render(<AutoComplete options={mockOptions} onSearch={onSearch} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'test')
    
    expect(onSearch).toHaveBeenCalledWith('test')
  })
})