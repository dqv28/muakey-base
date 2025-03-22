'use client'

import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import React from 'react'
import AssetModalForm from '../asset-modal-form'
export type AssetFilterProps = {}

const AssetFilter: React.FC<AssetFilterProps> = () => {
  const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'all' },
    { label: 'Hoạt động', value: 'active' },
    { label: 'Ngừng hoạt động', value: 'inactive' },
    { label: 'Đã bán', value: 'sold' },
  ]

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[16px]">
        <Input.Search className="w-[240px]!" placeholder="Tìm kiếm tài sản" />
        <Select
          className="w-[240px]!"
          options={statusOptions}
          defaultValue="all"
        />
      </div>
      <div className="flex items-center gap-[16px]">
        <Button icon={<FilterOutlined />}>Bộ lọc</Button>
        <AssetModalForm>
          <Button icon={<PlusOutlined />} type="primary">
            Thêm
          </Button>
        </AssetModalForm>
      </div>
    </div>
  )
}

export default AssetFilter
