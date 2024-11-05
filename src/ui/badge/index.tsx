import clsx from 'clsx'
import React from 'react'

export type BadgeProps = React.ComponentPropsWithoutRef<'div'> & {
  count?: number
  color?: string
  type?: 'default' | 'dot'
  size?: 'default' | 'small'
  offset?: [number, number]
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
  showZero?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color,
  type = 'default',
  size = 'default',
  count,
  offset,
  placement = 'topRight',
  className: customClassName,
  showZero = false,
  ...rest
}) => {
  const className = clsx('relative', customClassName)

  const badgeClass = clsx(
    'absolute end-0 top-0 flex origin-top-right translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#ff4d4f] leading-none text-white',
    {
      'min-h-[16px] min-w-[16px] px-[2px] text-[10px] leading-[16px]':
        size === 'default' && type === 'default',
      'min-h-[14px] min-w-[14px] px-[2px] text-[10px] leading-[16px]':
        size === 'small' && type === 'default',
      'min-h-[16px] min-w-[16px]': size === 'default' && type === 'dot',
      'min-h-[9px] min-w-[9px]': size === 'small' && type === 'dot',
      'end-[100%] top-0': placement === 'topLeft',
      'top-[100%]': placement === 'bottomRight',
      'end-[100%]': placement === 'bottomLeft',
      hidden: count === undefined || (count === 0 && !showZero),
    },
  )

  const badgeOffset = offset && {
    top: offset[0],
    right: offset[1],
  }

  const badgeStyle = {
    ...(badgeOffset ?? {}),
    backgroundColor: color,
  }

  return (
    <div className={className} {...rest}>
      {children}
      {type === 'dot' ? (
        <div className={badgeClass} style={badgeStyle} />
      ) : (
        <div className={badgeClass} style={badgeStyle}>
          {count && count > 99 ? '99+' : count}
        </div>
      )}
    </div>
  )
}

export default Badge
