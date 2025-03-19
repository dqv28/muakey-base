'use client'

import { Button, List, ListProps } from 'antd'
import React, { useEffect, useState } from 'react'
import ContractItemCard, { ContractItemCardProps } from './ContractItemCard'
import ContractListSkeleton from './ContractListSkeleton'

export type ContractListProps = ListProps<any> & {}

const INITIAL_ITEM_COUNT = 4

const ContractList: React.FC<ContractListProps> = ({
  dataSource: externalDataSource,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])

  const columns: ContractItemCardProps['columns'] = [
    {
      label: 'Hợp đồng',
      dataIndex: 'name',
      className: 'text-[#1890FF]',
    },
    {
      label: 'Loại hợp đồng',
      dataIndex: ['category', 'name'],
    },
    {
      label: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      label: 'Ngày bắt đầu',
      dataIndex: 'start_date',
    },
    {
      label: 'Ngày kết thúc',
      dataIndex: 'end_date',
    },
  ]

  const initialData = [...(externalDataSource || [])]
  const newData = initialData.splice(0, INITIAL_ITEM_COUNT)

  useEffect(() => {
    setData(initialData)
    setDataSource(newData)
  }, [])

  const onLoadMore = () => {
    setLoading(true)

    initialData.splice(0, INITIAL_ITEM_COUNT)
    setData(initialData)

    setTimeout(() => {
      setDataSource((prev: any[]) => {
        if (INITIAL_ITEM_COUNT >= (data?.length || 0)) {
          return [...prev, ...data]
        }

        return [...prev, ...(data?.slice(0, INITIAL_ITEM_COUNT) || [])]
      })

      setLoading(false)
    }, 1000)
  }

  const hasMore = dataSource?.length < (externalDataSource?.length || 0)

  return (
    <>
      <List
        dataSource={dataSource}
        grid={{
          gutter: [16, 16],
          column: 1,
        }}
        renderItem={(item) => (
          <List.Item className="!mb-0">
            <ContractItemCard item={item} columns={columns} />
          </List.Item>
        )}
        {...props}
      />

      {loading && <ContractListSkeleton />}

      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={onLoadMore}>Xem thêm</Button>
        </div>
      )}
    </>
  )
}

export default ContractList
