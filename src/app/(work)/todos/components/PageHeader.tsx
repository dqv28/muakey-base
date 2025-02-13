import React from 'react'

type PageHeaderProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, extra }) => {
  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">{title}</span>
        {extra}
      </div>
    </div>
  )
}

export default PageHeader
