import React from 'react'

type PageHeaderProps = {}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">Công việc của tôi</span>
      </div>
    </div>
  )
}

export default PageHeader
