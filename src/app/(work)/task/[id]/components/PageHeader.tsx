import clsx from 'clsx'
import React from 'react'

type PageHeaderProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, extra, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-[24px] border-b border-[#0000001a] pb-[24px]',
        className,
      )}
    >
      {title}
      {extra}
    </div>
  )
}

export default PageHeader
