import clsx from 'clsx'
import React from 'react'

export type DividerProps = React.ComponentPropsWithoutRef<'div'> & {
  type?: 'vertical' | 'horizontal'
}

const InternalDivider: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DividerProps
> = ({ type = 'horizontal', className: customClassName, ...rest }, ref) => {
  const className = clsx(
    'border-[#FFFFFF1F]',
    {
      'border-t': type === 'horizontal',
      'inline-block h-[0.9em] border-l align-middle': type === 'vertical',
    },
    customClassName,
  )

  return <div {...rest} ref={ref} className={className} />
}

export const Divider = React.forwardRef(InternalDivider)

export default Divider
