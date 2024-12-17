'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import DepartmentModalForm from './DepartmentModalForm'

const PageHeader: React.FC<{
  options?: any
}> = ({ options }) => {
  const members = options?.accounts?.filter(
    (acc: any) => acc?.type !== 'department',
  )

  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">Phòng ban</span>

        <DepartmentModalForm
          options={{
            members,
          }}
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Tạo phòng ban mới
          </Button>
        </DepartmentModalForm>
      </div>
    </div>
  )
}

export default PageHeader
