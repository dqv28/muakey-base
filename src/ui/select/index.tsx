'use client'

import clsx from 'clsx'
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '../icons'
import { mergeRefs } from '../utils'

interface IOption {
  value: number | string
  label: ReactNode
}

export type SelectProps = React.ComponentPropsWithoutRef<'div'> & {
  label?: string
  required?: boolean
  value?: number | string | null
  placeholder?: string
  status?: 'error'
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  popupMatchSelectWidth?: boolean
  selectorBg?: string
  selectorPaddingClass?: string
  dropdownMenuBg?: string
  dropdownHeight?: string
  options?: IOption[]
  onChange?: (value: number | string | null, option: IOption) => void
}

const InternalSelect: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectProps
> = (
  {
    label,
    required = false,
    value = '',
    placeholder = '',
    status,
    size = 'middle',
    disabled = false,
    popupMatchSelectWidth = true,
    selectorBg = 'bg-[#0000005C]',
    selectorPaddingClass = '',
    dropdownMenuBg = 'bg-[#272450]',
    dropdownHeight = null,
    options,
    onChange = (value, option) => {},
    ...props
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<{
    value: number | string
    label: ReactNode
  } | null>(null)

  const handleSelect = (option: {
    value: number | string
    label: ReactNode
  }) => {
    setIsOpen(false)
    if (!value) setSelected(option)
    onChange(option.value, option)
  }

  useEffect(() => {
    const val: any = options?.find((option) => option.value === value)
    if (value && !val) setSelected({ label: value, value: val })
    else setSelected(val)
  }, [options, value])

  const selectorRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectorBgClass = useMemo(() => {
    if (status == 'error') return 'bg-[#FF52525C] border-[#FF5252]'
    return `bg-[#fff] border-[#FFFFFF1F]`
  }, [status])

  const sizeClass = useMemo(() => {
    if (size == 'small') return label ? 'min-h-9' : 'min-h-6'
    if (size == 'large') return label ? 'min-h-16' : 'min-h-12'
    if (size == 'middle') return label ? 'min-h-12' : 'min-h-9'
    return size
  }, [label, size])

  const selectorClassName = clsx(
    'flex items-center justify-between gap-x-2 overflow-hidden rounded-2xl border border-[#FFFFFF1F] pl-4 pr-3',
    selectorBgClass,
    sizeClass,
    selectorPaddingClass,
    label ? 'py-px' : 'py-2',
  )

  const dropdownMenuClassName = clsx(
    'absolute left-0 z-10 overflow-y-auto overflow-x-hidden rounded-2xl border border-[#FFFFFF1F] p-2 transition-all duration-300',
    dropdownMenuBg,
    popupMatchSelectWidth ? 'w-full' : 'w-max',
    dropdownHeight ? `h-[${dropdownHeight}]` : 'max-h-48',
    isOpen ? 'opacity-100' : 'opacity-0',
  )

  const labelClassName = clsx(
    'text-[#555] transition-all duration-300',
    label && selected ? 'text-xs' : 'text-base',
  )

  return (
    <div {...props} ref={mergeRefs([selectorRef, ref])}>
      <div className="relative text-sm text-[#555]">
        <div
          className={selectorClassName}
          onClick={() => (!disabled ? setIsOpen(!isOpen) : {})}
        >
          <div>
            {label && (
              <div className={labelClassName}>
                {label}
                {required ? '*' : ''}
              </div>
            )}
            {!selected && placeholder && (
              <div className="text-[#555]">{placeholder}</div>
            )}
            {selected && <div>{selected.label}</div>}
          </div>
          {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </div>
        {isOpen && (
          <div className={dropdownMenuClassName}>
            {options?.map((option) => (
              <div
                className={clsx(
                  'cursor-pointer rounded-[18px] p-2 hover:bg-[#FFFFFF1F]',
                  option.value == selected?.value ? 'bg-[#FFFFFF1F]' : '',
                )}
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                <div>{option.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Select = React.forwardRef(InternalSelect)

export default Select
