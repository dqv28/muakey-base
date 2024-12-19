'use client'

import { Button } from 'antd'
import React from 'react'
import RequestModalForm from './RequestModalForm'

const PageHeader: React.FC<{
  options?: any
}> = ({ options }) => {
  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">Danh sách đề xuất</span>

        <RequestModalForm groups={options?.groups}>
          <Button type="primary">Tạo đề xuất</Button>
        </RequestModalForm>
      </div>
    </div>
  )
}

export default PageHeader
