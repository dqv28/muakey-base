'use client'

import { formatCurrency } from '@/lib/utils'
import { useFilterStore } from '@/stores/filterStore'
import { ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { Table, TableProps, Tabs, TabsProps, Tag } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { filterAssetsAction } from '../asset-drawer/action'

export type AssetTableProps = TableProps & {
  onStatusChange?: (status: string) => void
  defaultActiveKey?: string
}

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

const AssetTable: React.FC<AssetTableProps> = ({
  onStatusChange,
  defaultActiveKey = 'all',
  dataSource,
  ...props
}) => {
  const router = useRouter()
  const [tab, setTab] = useState(defaultActiveKey)
  const [assets, setAssets] = useState(dataSource)
  const [initialData] = useState(dataSource)
  const { filterResults } = useFilterStore()

  // Xử lý filterResults thay đổi
  useEffect(() => {
    if (filterResults && filterResults.length > 0) {
      setAssets(filterResults)
    } else {
      setAssets(initialData)
    }
  }, [filterResults, initialData])

  const handleChangeTab = async (key: string) => {
    setTab(key)
    onStatusChange?.(key)
    if (key === 'all') {
      setAssets(initialData)
      return
    }
    try {
      const queryString = `status=${key}`
      const res = await filterAssetsAction(queryString)
      setAssets(res.data)
    } catch (error) {
      console.error('Error fetching assets:', error)
    }
  }

  const handleRowClick = (record: any) => {
    router.push(`/asset/${record.id}`)
  }

  const tabs: TabsProps['items'] = [
    {
      label: 'Tất cả',
      key: 'all',
    },
    {
      label: 'Đang sử dụng',
      key: 'using',
    },
    {
      label: 'Chưa sử dụng',
      key: 'unused',
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
      dataIndex: ['brand', 'name'],
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
      <Tabs
        items={tabs}
        tabBarExtraContent={tabActions}
        activeKey={tab}
        onChange={handleChangeTab}
      />

      <Table
        columns={columns}
        dataSource={assets}
        {...props}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 6 }}
      />
    </div>
  )
}

export default AssetTable
