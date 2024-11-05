import React from 'react'

type PageHeaderProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, extra }) => {
  return (
    <div className="flex items-center justify-between gap-[24px] border-b border-[#0000001a] pb-[24px]">
      {title}
      {extra}
    </div>
  )
}

export default PageHeader
