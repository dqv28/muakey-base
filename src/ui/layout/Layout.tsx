import clsx from 'clsx'
import React from 'react'

export type LayoutProps = React.ComponentPropsWithoutRef<'div'> & {
  hasSide?: boolean
}

const InternalLayout: React.ForwardRefRenderFunction<
  HTMLDivElement,
  LayoutProps
> = (
  { hasSide = false, className: customClassName, children, ...props },
  ref,
) => {
  const className = clsx(
    'flex',
    hasSide ? 'flex-row' : 'flex-col',
    customClassName,
  )

  return (
    <div className={className} ref={ref} {...props}>
      {children}
    </div>
  )
}

const Layout = React.forwardRef(InternalLayout)

export default Layout
