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
      <div className="flex max-h-[36px] items-center justify-between overflow-hidden text-[24px]">
        <span className="font-[500]">Phòng ban</span>

        <DepartmentModalForm
          options={{
            members,
          }}
        >
          <Button
            className="flex items-center gap-[8px] rounded-[4px] bg-[#1677ff] px-[15px] py-[5px] text-[14px]!"
            type="primary"
            icon={<PlusOutlined className="text-[14px]! text-[#fff]" />}
          >
            <span className="leading-[22px] text-[#fff]">
              Tạo phòng ban mới
            </span>
          </Button>
        </DepartmentModalForm>
      </div>
    </div>
  )
}

export default PageHeader
