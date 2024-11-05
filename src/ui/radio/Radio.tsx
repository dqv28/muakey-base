'use client'

import clsx from 'clsx'
import React, { useContext } from 'react'
import { GroupContext } from './Group'

export type RadioProps = React.ComponentPropsWithoutRef<'input'> & {
  checked?: boolean
  disabled?: boolean
}

const InternalRadio: React.ForwardRefRenderFunction<
  HTMLInputElement,
  RadioProps
> = (
  {
    checked,
    disabled,
    name,
    value,
    children,
    className: customClassName,
    ...rest
  },
  ref,
) => {
  const groupContext = useContext(GroupContext)

  const className = clsx(
    'inline-flex items-center gap-[8px]',
    {
      'cursor-pointer': groupContext.disabled ?? !disabled,
      'pointer-events-none opacity-[0.6]': groupContext.disabled ?? disabled,
    },
    customClassName,
  )

  return (
    <label className={className}>
      <input
        {...rest}
        className="relative h-[16px] w-[16px] cursor-pointer appearance-none rounded-full border border-[#fff9] before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:hidden before:rounded-full before:border-[4px] before:border-[#F0F5FF] before:p-[3px] before:content-[''] checked:border-[#4B7DFF] checked:bg-[#4B7DFF] checked:before:block checked:before:border-[#D6E4FF] hover:border-[#4B7DFF] hover:bg-[#5081ff33] checked:hover:bg-[#4B7DFF]"
        type="radio"
        ref={ref}
        checked={groupContext.value ? value === groupContext.value : checked}
        defaultChecked={
          groupContext.value ? groupContext.value === value : undefined
        }
        value={value}
        onChange={(e) => groupContext.onChange?.(e)}
        name={groupContext.name}
        readOnly
      />
      <span className="leading-none">{children}</span>
    </label>
  )
}

const Radio = React.forwardRef(InternalRadio)

export default Radio
