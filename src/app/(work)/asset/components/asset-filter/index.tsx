'use client'

import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import React, { useState } from 'react'
import AssetModalForm from '../asset-modal-form'

export type AssetFilterProps = {
  onAdd?: () => void
}

const AssetFilter: React.FC<AssetFilterProps> = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'all' },
    { label: 'Hoạt động', value: 'active' },
    { label: 'Ngừng hoạt động', value: 'inactive' },
    { label: 'Đã bán', value: 'sold' },
  ]

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
    onAdd?.()
  }

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
        <AssetModalForm
          open={isModalOpen}
          onCancel={handleModalClose}
          onSuccess={handleModalSuccess}
        >
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </AssetModalForm>
      </div>
    </div>
  )
}

export default AssetFilter
