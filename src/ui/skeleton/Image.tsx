import clsx from 'clsx'
import React from 'react'

export type SkeletonImageProps = React.ComponentPropsWithoutRef<'div'> & {
  shape?: 'square' | 'circle'
  size?: 'S' | 'M' | 'L' | number
  active?: boolean
}

const sizes = {
  M: 32,
  S: 24,
  L: 40,
}

const InternalImage: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SkeletonImageProps
> = (
  {
    shape,
    size,
    active = false,
    className: customClassName,
    style: customStyle,
    ...props
  },
  ref,
) => {
  const className = clsx(
    'bg-[#FFFFFF99]',
    {
      'rounded-[8px]': shape === 'square',
      'rounded-full': shape === 'circle',
      'h-[32px] w-[32px]': size === 'M',
      'h-[24px] w-[24px]': size === 'S',
      'h-[40px] w-[40px]': size === 'L',
      'animate-pulse': active,
    },
    customClassName,
  )

  const value = size && (typeof size === 'number' ? size : sizes[size])

  const style: React.CSSProperties = {
    width: value,
    height: value,
    ...customStyle,
  }

  return <div {...props} className={className} style={style} ref={ref}></div>
}

const Image = React.forwardRef(InternalImage)

export default Image
