'use client'

import React, { useContext, useRef } from 'react'
import Button from '../button'
import { mergeRefs } from '../utils'
import { GroupContext } from './Group'

export type RadioButtonProps = React.ComponentPropsWithoutRef<'input'>

const InternalRadioButton: React.ForwardRefRenderFunction<
  HTMLInputElement,
  RadioButtonProps
> = ({ disabled, value, checked, defaultChecked, children, ...rest }, ref) => {
  const groupContext = useContext(GroupContext)

  const radioRef = useRef<HTMLInputElement>(null)

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className="hidden"
        ref={mergeRefs([radioRef, ref])}
        checked={
          groupContext
            ? groupContext.value
              ? value + '' === groupContext.value
              : false
            : checked
        }
        defaultChecked={
          groupContext.defaultValue
            ? groupContext.defaultValue === value + ''
            : undefined
        }
        onChange={(e) => groupContext.onChange?.(e)}
        value={value}
        readOnly
        name={groupContext.name}
        {...rest}
      />
      <Button
        disabled={groupContext.disabled ?? disabled}
        className="text-[16px] text-[#fff]"
        shape="pill"
        variant={
          (groupContext &&
            (groupContext.value || groupContext.defaultValue) === value + '') ||
          checked ||
          defaultChecked
            ? 'outline'
            : 'default'
        }
        color={
          (groupContext &&
            (groupContext.value || groupContext.defaultValue) === value + '') ||
          checked ||
          defaultChecked
            ? 'primary'
            : 'default'
        }
        onClick={() => radioRef && radioRef.current?.click()}
      >
        {children && <span className="leading-none">{children}</span>}
      </Button>
    </label>
  )
}

const RadioButton = React.forwardRef(InternalRadioButton)

export default RadioButton
