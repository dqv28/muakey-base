import clsx from 'clsx'
import React from 'react'

export type SideProps = React.ComponentPropsWithoutRef<'aside'> & {
  subSide?: React.ReactNode
}

const InternalSide: React.ForwardRefRenderFunction<HTMLElement, SideProps> = (
  { subSide, children, className: customClassName, ...props },
  ref,
) => {
  const className = clsx('flex items-start', customClassName)

  return (
    <aside className={className} ref={ref} {...props}>
      {subSide}
      {children}
    </aside>
  )
}

const Side = React.forwardRef(InternalSide)

export default Side
