'use client'

import { formatCurrency } from '@/lib/utils'
import { ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { Table, TableProps, Tabs, TabsProps, Tag } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

export type AssetTableProps = TableProps & {}

const genStatus = (
  status: 'using' | 'unused' | 'warranty' | 'broken' | 'liquidated',
) => {
  switch (status) {
    case 'using':
      return <Tag color="success">Đang sử dụng</Tag>
    case 'unused':
      return <Tag color="default">Chưa sử dụng</Tag>
    case 'warranty':
      return <Tag color="warning">Đang bảo hành</Tag>
    case 'broken':
      return <Tag color="error">Hỏng</Tag>
    case 'liquidated':
      return <Tag color="purple">Đã thanh lý</Tag>
  }
}

const AssetTable: React.FC<AssetTableProps> = (props) => {
  const tabs: TabsProps['items'] = [
    {
      label: 'Tất cả',
      key: 'all',
    },
    {
      label: 'Đang sử dụng',
      key: 'active',
    },
    {
      label: 'Chưa sử dụng',
      key: 'inactive',
    },
    {
      label: 'Đang bảo hành',
      key: 'warranty',
    },
    {
      label: 'Hỏng',
      key: 'broken',
    },
    {
      label: 'Đã thanh lý',
      key: 'liquidated',
    },
  ]

  const columns: TableProps['columns'] = [
    {
      title: 'Mã',
      dataIndex: 'code',
    },
    {
      title: 'Tên tài sản',
      dataIndex: 'name',
    },
    {
      title: 'Loại tài sản',
      dataIndex: ['asset_category', 'name'],
    },
    {
      title: 'Người sử dụng',
      dataIndex: ['account', 'full_name'],
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'brand',
    },
    {
      title: 'Giá mua',
      dataIndex: 'price',
      render: (value: number) => `${formatCurrency(value)}đ`,
    },
    {
      title: 'Ngày mua',
      dataIndex: 'buy_date',
      render: (value: string) =>
        value ? String(dayjs(value).format('DD/MM/YYYY')) : '--',
    },
    {
      title: 'Hạn bảo hành',
      dataIndex: 'warranty_date',
      render: (value: string) =>
        value ? String(dayjs(value).format('DD/MM/YYYY')) : '--',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value: string) => genStatus(value as any),
    },
  ]

  const tabActions = (
    <div className="flex items-center gap-[8px]">
      <ColumnHeightOutlined />
      <SettingOutlined />
    </div>
  )

  return (
    <div className="rounded-[8px] bg-[#fff] px-[16px]">
      <Tabs items={tabs} tabBarExtraContent={tabActions} />

      <Table columns={columns} {...props} />
    </div>
  )
}

export default AssetTable
