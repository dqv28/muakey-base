'use client'

import clsx from 'clsx'
import React, { useId } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

export type FormItemProps = React.ComponentPropsWithoutRef<'div'> & {
  name: UseControllerProps['name']
  label?: React.ReactNode
  defaultValue?: UseControllerProps['defaultValue']
  children: React.ReactElement
  rules?: UseControllerProps['rules']
  help?: React.ReactNode
  extra?: React.ReactNode
  disabled?: boolean
  inputWrapClassName?: React.ComponentProps<'div'>['className']
  type?: 'vertical' | 'horizontal'
  labelClassName?: React.ComponentProps<'label'>['className']
}

const FormItem: React.FC<FormItemProps> = ({
  className,
  name,
  label,
  defaultValue = '',
  children,
  rules,
  help,
  extra,
  disabled,
  inputWrapClassName,
  type,
  labelClassName,
}) => {
  const { field, fieldState } = useController({
    name,
    defaultValue,
    rules,
    disabled,
  })

  const id = useId()
  const input = React.cloneElement(children, {
    id,
    status: fieldState.invalid ? 'error' : undefined,
    ...field,
    onChange: (...args: any) => {
      field.onChange(...args)
      children.props.onChange?.(...args)
    },
  })

  return (
    <div
      className={clsx(
        'mb-[24px]',
        {
          'sm:flex sm:items-start sm:gap-[24px]': type === 'horizontal',
        },
        className,
      )}
    >
      {label && (
        <label
          htmlFor={input.props.id}
          className={clsx(
            'mb-[4px] inline-block text-[14px] font-[500] leading-none text-[#000]',
            {
              'sm:mt-[12px]': type === 'horizontal',
            },
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <div
        className={clsx({
          'sm:flex-1': type === 'horizontal',
        })}
      >
        <div className={inputWrapClassName}>{input}</div>
        {help
          ? help
          : fieldState.invalid && (
              <div className="mt-[4px] text-[12px] leading-[1.2] text-[#FF5252]">
                {fieldState.error?.message}
              </div>
            )}
        {extra && <div className="mt-[4px]">{extra}</div>}
      </div>
    </div>
  )
}

export default FormItem
