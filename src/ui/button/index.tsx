'use client'

import clsx from 'clsx'
import React from 'react'
import { LoadingOutlined } from '../icons'

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'default' | 'outline' | 'link' | 'text'
  color?: 'default' | 'primary' | 'secondary'
  shape?: 'default' | 'pill' | 'circle'
  size?: 'default' | 'small' | 'large'
  icon?: React.ReactNode
  border?: boolean
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    className: customClassName,
    variant = 'default',
    color = 'default',
    shape = 'default',
    size = 'default',
    icon,
    loading = false,
    block = false,
    disabled,
    children,
    ...rest
  },
  ref,
) => {
  const className = clsx(
    'flex items-center justify-center border pb-[8px] pt-[10px] text-[16px] font-[400] leading-none transition-all duration-300',
    shape === 'circle' ? 'p-0' : 'px-[24px]',
    {
      'border-transparent': variant !== 'outline',
      'bg-[#FFFFFF33] hover:bg-[#2A2D4F]':
        variant === 'default' && color === 'default',
      'bg-[#267cde] hover:border-[#3463DB] hover:bg-[#3463DB]':
        variant === 'default' && color === 'primary',
      'bg-[#3A3E64] hover:border-[#2A2D4F] hover:bg-[#2A2D4F]':
        variant === 'default' && color === 'secondary',
      'border-[#444] text-[#444] hover:border-[#267cde] hover:text-[#267cde]':
        variant === 'outline' && color === 'default',
      'border-[#3463DB] hover:border-[#3463DB] hover:bg-[#3463DB]':
        variant === 'outline' && color === 'primary',
      'border-[#2A2D4F] hover:border-[#2A2D4F] hover:bg-[#2A2D4F]':
        variant === 'outline' && color === 'secondary',
      'hover:underline': variant === 'link',
      'hover:text-[#267cde]':
        (variant === 'link' || variant === 'text') && color === 'default',
      'text-[#267cde] hover:text-[#3463DB]':
        (variant === 'link' || variant === 'text') && color === 'primary',
      'text-[#3A3E64] hover:text-[#2A2D4F]':
        (variant === 'link' || variant === 'text') && color === 'secondary',
      rounded: shape === 'default',
      'rounded-full': shape === 'pill' || shape === 'circle',
      'w-[32px]': shape === 'circle' && size === 'default',
      'w-[28px]': shape === 'circle' && size === 'small',
      'w-[36px]': shape === 'circle' && size === 'large',
      'h-[32px]': size === 'default',
      'h-[28px]': size === 'small',
      'h-[36px]': size === 'large',
      'w-full': block,
      'pointer-events-none opacity-[0.36]': disabled,
    },
    customClassName,
  )

  return (
    <button
      type="button"
      disabled={loading}
      ref={ref}
      className={className}
      {...rest}
    >
      {(icon || loading) && (
        <span
          className={clsx(
            'inline-flex',
            shape !== 'circle' && !!children && 'mr-[4px]',
          )}
        >
          {!loading ? icon : <LoadingOutlined className="animate-spin" />}
        </span>
      )}
      {shape !== 'circle' && children}
    </button>
  )
}

export const Button = React.forwardRef(InternalButton)

export default Button
