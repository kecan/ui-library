import React, { useState, useRef, useEffect } from 'react'
import './AutoComplete.css'

export interface AutoCompleteOption {
  value: string
  label: string
}

export interface AutoCompleteProps {
  options: AutoCompleteOption[]
  placeholder?: string
  value?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  allowClear?: boolean
  maxDropdownHeight?: number
  onSelect?: (value: string, option: AutoCompleteOption) => void
  onChange?: (value: string) => void
  onSearch?: (searchText: string) => void
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  placeholder = 'Please input',
  value = '',
  disabled = false,
  size = 'medium',
  allowClear = false,
  maxDropdownHeight = 256,
  onSelect,
  onChange,
  onSearch,
  filterOption,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const defaultFilterOption = (
    inputValue: string,
    option: AutoCompleteOption
  ) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  const filteredOptions = options.filter(option =>
    filterOption
      ? filterOption(inputValue, option)
      : defaultFilterOption(inputValue, option)
  )

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsOpen(true)
    setHighlightedIndex(-1)
    onChange?.(newValue)
    onSearch?.(newValue)
  }

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  const handleOptionSelect = (option: AutoCompleteOption) => {
    setInputValue(option.label)
    setIsOpen(false)
    setHighlightedIndex(-1)
    onSelect?.(option.value, option)
    onChange?.(option.label)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleClear = () => {
    setInputValue('')
    setIsOpen(false)
    setHighlightedIndex(-1)
    onChange?.('')
    inputRef.current?.focus()
  }

  return (
    <div className={`autocomplete autocomplete--${size}`} ref={dropdownRef}>
      <div className='autocomplete__input-wrapper'>
        <input
          ref={inputRef}
          type='text'
          className={`autocomplete__input ${disabled ? 'autocomplete__input--disabled' : ''}`}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
        {allowClear && inputValue && !disabled && (
          <button
            type='button'
            className='autocomplete__clear'
            onClick={handleClear}
            aria-label='Clear'
          >
            ×
          </button>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          className='autocomplete__dropdown'
          style={{ maxHeight: maxDropdownHeight }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              className={`autocomplete__option ${
                index === highlightedIndex
                  ? 'autocomplete__option--highlighted'
                  : ''
              }`}
              onClick={() => handleOptionSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AutoComplete
