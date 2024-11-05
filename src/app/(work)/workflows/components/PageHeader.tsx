import clsx from 'clsx'
import React from 'react'

export type PageHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
> & {
  title?: React.ReactNode
  extra?: React.ReactNode
  headerClassName?: string
}

const PageHeader: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PageHeaderProps
> = (
  {
    title,
    extra,
    headerClassName,
    className: customClassName,
    children,
    ...rest
  },
  ref,
) => {
  const className = clsx(
    'border-b border-[#eee] px-[16px] py-[12px]',
    customClassName,
  )

  return (
    <div className={className} ref={ref} {...rest}>
      <div
        className={clsx(
          'flex items-center justify-between gap-[24px]',
          headerClassName,
        )}
      >
        {title}
        {extra}
      </div>
      {children}
    </div>
  )
}

export default PageHeader
