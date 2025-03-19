'use client'

import { DownOutlined, FilterOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import React from 'react'

export type EmployeeFilterProps = {}

const EmployeeFilter: React.FC<EmployeeFilterProps> = () => {
  const statusOptions = [
    {
      label: 'Chính thức',
      value: 'official',
    },
    {
      label: 'Thử việc',
      value: 'trial',
    },
    {
      label: 'Nghỉ việc',
      value: ' quit',
    },
  ]

  return (
    <div className="flex items-center gap-[16px]">
      <Input.Search className="!w-[278px]" placeholder="Tìm kiếm nhân sự" />
      <Select options={statusOptions} defaultValue={statusOptions[0].value} />
      <Button icon={<FilterOutlined />}>Bộ lọc (2)</Button>
      <Button icon={<DownOutlined />}>Sắp xếp</Button>
    </div>
  )
}

export default EmployeeFilter
