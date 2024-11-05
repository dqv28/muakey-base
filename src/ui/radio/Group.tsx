'use client'

import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import RadioButton from './Button'
import Radio from './Radio'

export type OptionItemType =
  | string
  | number
  | {
      label: string
      value: string | number
      disabled?: boolean
      checked?: boolean
    }

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  disabled?: boolean
  name?: string
  options?: OptionItemType[]
  optionType?: 'default' | 'button'
  defaultValue?: string | number
  value?: string | number
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void
  gutter?: number | string | [number, number]
}

export const GroupContext = createContext<{
  disabled?: boolean
  name?: string
  defaultValue?: string | number
  value?: string | number
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void
}>({})

const InternalRadioGroup: React.ForwardRefRenderFunction<
  HTMLDivElement,
  RadioGroupProps
> = (
  {
    disabled,
    name,
    options,
    optionType = 'default',
    defaultValue,
    value,
    onChange,
    gutter = 8,
    children,
    className: customClassName,
    style: customStyle,
    ...rest
  },
  ref,
) => {
  const className = clsx(customClassName)

  const Item = optionType === 'default' ? Radio : RadioButton

  const groupStyle: React.CSSProperties = {
    ...(Array.isArray(gutter)
      ? {
          rowGap: gutter[0],
          columnGap: gutter[1],
        }
      : { gap: gutter }),
    display: 'flex',
    flexWrap: 'wrap',
    ...customStyle,
  }

  const [groupValue, setGroupValue] = useState<string | number>()

  const handleChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setGroupValue(event?.target.value)
  }

  return (
    <GroupContext.Provider
      value={{
        name,
        defaultValue,
        value: value ?? groupValue,
        disabled,
        onChange: handleChange,
      }}
    >
      <div className={className} style={groupStyle} ref={ref} {...rest}>
        {options
          ? options.map((item) => {
              const optionValue = typeof item === 'object' ? item.value : item
              const optionLabel = typeof item === 'object' ? item.label : item

              return (
                <Item
                  key={optionValue}
                  checked={
                    value
                      ? value === optionValue
                      : typeof item === 'object' && item.checked
                  }
                  disabled={
                    disabled ?? (typeof item === 'object' && item.disabled)
                  }
                  name={name}
                  value={optionValue}
                  defaultValue={defaultValue}
                  defaultChecked={defaultValue === optionValue}
                  onChange={(e) => onChange?.(e)}
                >
                  {optionLabel}
                </Item>
              )
            })
          : children}
      </div>
    </GroupContext.Provider>
  )
}

const RadioGroup = React.forwardRef(InternalRadioGroup)

export default RadioGroup
