'use client'

import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import React, { useState } from 'react'
import AssetModalForm from '../../../components/asset-modal-form'
import StatusTag from '../status-tag'
import AssetDescription from './AssetDescription'

const AssetDetail: React.FC<any> = ({ asset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
    // onAdd?.()
  }

  return (
    <div className="col-span-3 h-fit gap-4 rounded-lg bg-[#fff] p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <Avatar
            style={{
              backgroundColor: '#1677ff',
              verticalAlign: 'middle',
            }}
            size="large"
            gap={16}
          >
            {asset?.name}
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] leading-[28px] font-medium">
              {asset?.name}
            </p>
            <div className="flex items-center gap-2">
              <p>{asset?.brand?.name}</p>
              <StatusTag
                status={
                  asset?.status as
                    | 'using'
                    | 'unused'
                    | 'warranty'
                    | 'broken'
                    | 'liquidated'
                }
              />
            </div>
          </div>
        </div>
        <AssetModalForm
          title="Chỉnh sửa tài sản"
          open={isModalOpen}
          onSuccess={handleModalSuccess}
          onCancel={handleModalClose}
          initialValues={asset}
          action="edit"
        >
          <Button onClick={() => setIsModalOpen(true)}>
            <EditOutlined /> Chỉnh sửa
          </Button>
        </AssetModalForm>
      </div>
      <AssetDescription asset={asset} />
    </div>
  )
}

export default AssetDetail
