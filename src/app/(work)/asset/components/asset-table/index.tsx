'use client'

import { Asset } from '@/interfaces'
import { formatCurrency } from '@/lib/utils'
import { useFilterStore } from '@/stores/filterStore'
import { useSearchStore } from '@/stores/searchStore'
import { ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { Table, TableProps, Tabs, TabsProps, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { filterAssetsAction } from '../asset-drawer/action'
import { getAssetsByPagnitionAction } from './action'

export type AssetTableProps = TableProps & {
  onStatusChange?: (status: string) => void
  defaultActiveKey?: string
  dataSource?: Asset[]
  total?: number
  per_page?: number
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

const AssetTable: React.FC<AssetTableProps> = ({
  onStatusChange,
  defaultActiveKey = 'all',
  dataSource,
  total,
  per_page,
  ...props
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { filterResults } = useFilterStore()
  const { searchResults } = useSearchStore()

  const [tab, setTab] = useState(defaultActiveKey)
  const [assets, setAssets] = useState<Asset[]>(dataSource || [])

  useEffect(() => {
    if (filterResults?.length) {
      setAssets(filterResults)
    } else if (searchResults?.length) {
      setAssets(searchResults)
    } else {
      setAssets(dataSource || [])
    }
  }, [filterResults, searchResults, dataSource])

  const handleChangeTab = async (key: string) => {
    if (key === 'all') {
      router.push('/asset')
      setTab(key)
      setAssets(dataSource || [])
      onStatusChange?.(key)
      return
    }

    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('status', key)
    router.push(`/asset?${currentParams.toString()}`)

    setTab(key)
    onStatusChange?.(key)

    try {
      const res = await filterAssetsAction(currentParams.toString())
      if (res.success && Array.isArray(res.data)) {
        setAssets(res.data)
      }
    } catch (error) {
      console.error('Error fetching assets:', error)
    }
  }

  const handleRowClick = (record: any) => {
    router.push(`/asset/${record.id}`)
  }

  const columns: ColumnsType<any> = [
    { title: 'Mã', dataIndex: 'code' },
    { title: 'Tên tài sản', dataIndex: 'name' },
    { title: 'Loại tài sản', dataIndex: ['asset_category', 'name'] },
    { title: 'Người sử dụng', dataIndex: ['account', 'full_name'] },
    { title: 'Nhà cung cấp', dataIndex: ['brand', 'name'] },
    {
      title: 'Giá mua',
      dataIndex: 'price',
      render: (value: number) => (value ? `${formatCurrency(value)}đ` : '--'),
    },
    {
      title: 'Ngày mua',
      dataIndex: 'buy_date',
      render: (value: string | null | undefined) => {
        const date = dayjs(value)
        return date.isValid() ? date.format('YYYY/MM/DD') : '--'
      },
    },
    {
      title: 'Hạn bảo hành',
      dataIndex: 'warranty_date',
      render: (value: string | null | undefined) => {
        const date = dayjs(value)
        return date.isValid() ? date.format('YYYY/MM/DD') : '--'
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value: string) =>
        genStatus(
          value as 'using' | 'unused' | 'warranty' | 'broken' | 'liquidated',
        ),
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
        rowKey="id"
        columns={columns}
        dataSource={assets}
        {...props}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        className="cursor-pointer"
        pagination={{
          current: Number(searchParams.get('page')) || 1,
          pageSize: per_page || 10,
          total: total || 100,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
          showTotal: (total) => `Total ${total} items`,
          onChange: async (page) => {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set('page', page.toString())
            router.push(`/asset?${newParams.toString()}`)

            try {
              const res = await getAssetsByPagnitionAction(newParams.toString())
              if (res.success && Array.isArray(res.data)) {
                setAssets(res.data)
              }
            } catch (error) {
              console.error('Error fetching assets:', error)
            }
          },
        }}
      />
    </div>
  )
}

export default AssetTable
