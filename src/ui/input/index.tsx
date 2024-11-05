'use client'

import clsx from 'clsx'
import React, { ReactNode, useId, useMemo, useRef, useState } from 'react'
import { EyeOutlined, EyeStrikedOutlined } from '../icons'
import { mergeRefs } from '../utils'

export enum StatusInput {
  Error = 'error',
}

export type InputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'prefix' | 'size'
> & {
  /** Thẻ/Văn bản nhãn hiển thị trước (ở phía bên trái của) ô nhập liệu */
  addonBefore?: ReactNode
  /** Thẻ/Văn bản nhãn hiển thị sau (ở phía bên phải của) ô nhập liệu */
  addonAfter?: ReactNode
  /** Biểu tượng tiền tố của ô nhập liệu */
  prefix?: ReactNode
  /** Biểu tượng hậu tố của ô nhập liệu */
  suffix?: ReactNode
  /** Biến thể không có border của ô nhập liệu */
  borderless?: boolean
  /** default meddle */
  size?: 'large' | 'middle' | 'small'
  /** Vô hiệu hóa thẻ Input */
  disabled?: boolean
  /** Trạng thái thẻ Input */
  status?: StatusInput
  /** Floating label */
  label?: string
  /** Input dạng mật khẩu */
  type?: 'password'
  onFocus?: () => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  ghost?: boolean
}

const InternalInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    addonBefore,
    addonAfter,
    prefix,
    suffix,
    borderless,
    size,
    disabled,
    status,
    label,
    type,
    onFocus,
    onBlur,
    ghost = false,
    ...props
  },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const idInput = useId()
  const [isFocused, setIsFocused] = useState(false)
  const [passwordShowed, setPasswordShowed] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  const sizeTextClass = useMemo(() => {
    if (size === 'large') {
      return 'text-[16px]'
    }
    if (size === 'small') {
      return 'text-[12px]'
    }
    return 'text-[14px]'
  }, [size])

  const variantInputClass = useMemo(() => {
    if (borderless) return '!border-transparent'
    return ''
  }, [borderless])

  const focusedClass = useMemo(() => {
    return isFocused ? 'border-[#FFFFFF1F]' : 'border-[#FFFFFF1F]'
  }, [isFocused])

  const inputStatusClass = useMemo(() => {
    return status === StatusInput.Error
      ? '!border-[#FF5252] !bg-[#FF52525C]'
      : ''
  }, [status])

  const sizeInputClass = useMemo(() => {
    if (!label) {
      if (size === 'large') {
        return 'h-12'
      }
      if (size === 'small') {
        return 'h-6'
      }
      return 'h-8'
    }
    if (size === 'large') {
      return 'h-16'
    }
    if (size === 'small') {
      return 'h-9'
    }
    return 'h-12'
  }, [label, size])

  /**
   * line-height tăng theo size 3px
   */
  const paddingFloadingLable = useMemo(() => {
    // 56px - lh 24px = 32px
    if (size === 'large') {
      return 'pb-[6px] pt-[26px]'
    }
    // 40px - lh 18px = 22px
    if (size === 'small') {
      return 'pb-[4px] pt-[18px]'
    }
    // height 48px - lh 21px = 27px
    return 'pb-[5px] pt-[22px]'
  }, [size])

  const sizeTopFloadingLable = useMemo(() => {
    if (size === 'large') {
      return 'top-[16px]'
    }
    if (size === 'small') {
      return 'top-[12px]'
    }
    return 'top-[14px]'
  }, [size])

  const renderInput = useMemo(() => {
    const input = (
      <input
        id={idInput}
        ref={mergeRefs([inputRef, ref])}
        {...props}
        placeholder={label ? '' : props.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        type={type && !passwordShowed ? type : undefined}
        className={clsx(
          'border-[#FFFFFF1F] text-[#555]',
          // focusedClass,
          props.className,
          disabled ? '!cursor-not-allowed' : '',
          sizeInputClass,
          label
            ? clsx(
                paddingFloadingLable,
                'peer block appearance-none focus:outline-none focus:ring-0',
              )
            : '',
          'h-full w-full bg-transparent outline-none',
        )}
      />
    )
    let result = <div className={clsx('w-full', sizeInputClass)}>{input}</div>
    if (label) {
      result = (
        <div className={clsx('relative w-full', sizeInputClass)}>
          {input}
          <label
            htmlFor={idInput}
            className={clsx(
              sizeTopFloadingLable,
              sizeTextClass,
              disabled ? '!cursor-not-allowed' : '',
              'absolute z-10 origin-[0] -translate-y-2 scale-90 transform text-[#555] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2 peer-focus:scale-90',
            )}
            onClick={(e) => {
              inputRef.current?.focus()
            }}
          >
            {label}
          </label>
        </div>
      )
    }
    if (type === 'password') {
      result = (
        <div className={clsx('flex w-full', sizeInputClass)}>
          {result}
          <button
            type="button"
            className="ml-1 mt-1"
            onClick={() => {
              setPasswordShowed(!passwordShowed)
            }}
          >
            {passwordShowed ? <EyeStrikedOutlined /> : <EyeOutlined />}
          </button>
        </div>
      )
    }
    return result
  }, [
    idInput,
    ref,
    props,
    label,
    handleFocus,
    handleBlur,
    disabled,
    type,
    passwordShowed,
    focusedClass,
    sizeInputClass,
    paddingFloadingLable,
    sizeTopFloadingLable,
    sizeTextClass,
  ])

  return (
    <div
      className={clsx(
        focusedClass,
        variantInputClass,
        sizeInputClass,
        sizeTextClass,
        inputStatusClass,
        disabled ? '!cursor-not-allowed opacity-65' : '',
        'box-border flex items-center overflow-hidden caret-[#555]',
        !ghost && 'border-[1px] border-[#d3d3d3] pl-[16px] pr-[10px]',
      )}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        inputRef.current?.focus()
      }}
    >
      {addonBefore && (
        <div
          className={clsx(
            'my-[-4px] ml-[-10px] flex h-full items-center overflow-hidden rounded-l-[16px]',
          )}
        >
          {addonBefore}
        </div>
      )}
      <div
        className={clsx('my-[-1px] flex h-full w-full items-center py-[1px]')}
      >
        {prefix && (
          <span
            onClick={() => inputRef.current?.focus()}
            className={clsx('mr-1')}
          >
            {prefix}
          </span>
        )}
        {renderInput}
        {suffix && (
          <span
            onClick={() => inputRef.current?.focus()}
            className={clsx('ml-1')}
          >
            {suffix}
          </span>
        )}
      </div>
      {addonAfter && (
        <div
          className={clsx(
            'my-[-4px] mr-[-10px] flex h-full items-center overflow-hidden rounded-r-[16px]',
          )}
        >
          {addonAfter}
        </div>
      )}
    </div>
  )
}

export const Input = React.forwardRef(InternalInput)

export default Input
