import clsx from 'clsx'
import React from 'react'

type Size = 'small' | 'middle' | 'large' | number

export type SpaceProps = React.ComponentPropsWithoutRef<'div'> & {
  direction?: 'vertical' | 'horizontal'
  wrap?: boolean
  size?: Size | Size[]
  align?: 'start' | 'end' | 'center'
}

const InternalSpace: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SpaceProps
> = (
  {
    direction = 'horizontal',
    wrap = false,
    size = 'small',
    align = 'center',
    className: customClassName,
    style: customStyle,
    ...rest
  },
  ref,
) => {
  const spaceVariant = {
    small: 8,
    middle: 16,
    large: 24,
  }

  const className = clsx(
    'flex',
    {
      'flex-nowrap': !wrap,
      'flex-wrap': wrap,
      'flex-col': direction === 'vertical',
      'items-center': align === 'center',
      'items-start': align === 'start',
      'items-end': align === 'end',
    },
    customClassName,
  )

  const distance: React.CSSProperties =
    typeof size === 'object'
      ? {
          gap: `${size[0]}px ${size[1]}px`,
        }
      : { gap: typeof size === 'string' ? spaceVariant[size] : size }

  const spaceStyle: React.CSSProperties = {
    ...(size ? distance : {}),
    ...customStyle,
  }

  return (
    <div {...rest} className={className} style={spaceStyle} ref={ref}></div>
  )
}

export const Space = React.forwardRef(InternalSpace)

export default Space
