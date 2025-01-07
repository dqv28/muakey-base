import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'

type PageHeaderProps = {}

const PageHeader: React.FC<PageHeaderProps> = () => {
  return (
    <div className="bg-[#fff] px-[24px] py-[16px] font-[500]">
      <div className="flex items-center gap-[12px]">
        <ArrowLeftOutlined />
        <span className="text-[20px]">123456</span>
      </div>
    </div>
  )
}

export default PageHeader
