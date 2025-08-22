import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Button from './index'

describe('Button', () => {
  const user = userEvent.setup()

  it('renders with children', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Test Button')
  })

  it('applies default props correctly', () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('btn', 'btn--primary', 'btn--medium')
    expect(button).not.toBeDisabled()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--secondary')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--danger')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--small')

    rerender(<Button size="medium">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--medium')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--large')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('disabled')
  })

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clickable Button</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(onClick).not.toHaveBeenCalled()
  })

  it('combines multiple props correctly', () => {
    const onClick = vi.fn()
    render(
      <Button 
        variant="danger" 
        size="large" 
        onClick={onClick}
      >
        Danger Large Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn--danger', 'btn--large')
    expect(button).toHaveTextContent('Danger Large Button')
    expect(button).not.toBeDisabled()
  })

  it('renders with complex children', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('IconText')
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<Button>Accessible Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button.tagName).toBe('BUTTON')
    expect(button).toBeInTheDocument()
  })

  it('supports all variant and size combinations', () => {
    const variants = ['primary', 'secondary', 'danger'] as const
    const sizes = ['small', 'medium', 'large'] as const
    
    variants.forEach(variant => {
      sizes.forEach(size => {
        const { unmount } = render(
          <Button variant={variant} size={size}>
            {variant} {size}
          </Button>
        )
        
        const button = screen.getByRole('button')
        expect(button).toHaveClass(`btn--${variant}`)
        expect(button).toHaveClass(`btn--${size}`)
        
        unmount()
      })
    })
  })

  it('maintains focus behavior', async () => {
    render(<Button>Focusable Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button).not.toHaveFocus()
    
    await user.tab()
    expect(button).toHaveFocus()
  })
})