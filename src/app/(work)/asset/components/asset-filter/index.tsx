'use client'

import { useSearchStore } from '@/stores/searchStore'
import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import AssetDrawer from '../asset-drawer'
import AssetModalForm from '../asset-modal-form'
import { searchAssetAction } from './action'

export type AssetFilterProps = {
  onAdd?: () => void
}

const AssetFilter: React.FC<AssetFilterProps> = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setSearchResults } = useSearchStore()

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
  const handleSearch = async (value: string) => {
    try {
      const result = await searchAssetAction(value)
      setSearchResults(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[16px]">
        <Input.Search
          className="w-[240px]!"
          placeholder="Tìm kiếm tài sản"
          onSearch={handleSearch}
        />
      </div>
      <div className="flex items-center gap-[16px]">
        <AssetDrawer>
          <Button icon={<FilterOutlined />}>Bộ lọc</Button>
        </AssetDrawer>
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
