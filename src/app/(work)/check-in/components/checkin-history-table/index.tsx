'use client'

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Badge, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { times, uniqueId } from 'lodash'
import Link from 'next/link'
import React from 'react'
import CheckInHistoryFiltered from './CheckInHistoryFiltered'

type CheckInHistoryTableProps = {}

const getRandomStatus = () => {
  const statuses = ['pending', 'approved', 'canceled']
  const randomIndex = Math.floor(Math.random() * statuses.length)

  return statuses[randomIndex]
}

const generatedStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center gap-[8px] text-[#FAAD14]">
          <Badge dot color="#FAAD14" />
          <span>Chưa duyệt</span>
        </div>
      )

    case 'approved':
      return (
        <div className="flex items-center gap-[8px] text-[#389E0D]">
          <Badge dot color="#389E0D" />
          <span>Đã duyệt</span>
        </div>
      )

    case 'canceled':
      return (
        <div className="flex items-center gap-[8px] text-[#CF1322]">
          <Badge dot color="#CF1322" />
          <span>Đã hủy</span>
        </div>
      )

    default:
      return <></>
  }
}

const CheckInHistoryTable: React.FC<CheckInHistoryTableProps> = (props) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Mã yêu cầu',
      dataIndex: 'code',
    },
    {
      title: 'Loại yêu cầu',
      dataIndex: 'type',
    },
    {
      title: 'Thời gian gửi yêu cầu',
      dataIndex: 'created_at',
    },
    {
      title: 'Tổng thời gian',
      dataIndex: 'total',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => generatedStatus(value),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <div className="flex items-center gap-[12px]">
            {record?.status === 'pending' && (
              <>
                <EditOutlined className="text-[16px] text-[#389E0D]" />
                <DeleteOutlined className="text-[16px] text-[#CF1322]" />
              </>
            )}
            <Link href={`/request-history/${record.code}`}>
              <EyeOutlined className="text-[16px] text-[#1677ff]" />
            </Link>
          </div>
        </>
      ),
    },
  ]

  const dataSource: TableProps['dataSource'] = times(10, (num) => ({
    code: uniqueId(),
    type: `Loại ${num + 1}`,
    created_at: String(dayjs(new Date()).format('DD-MM-YYYY HH:mm:ss')),
    total: `${num + 1} ngày`,
    status: getRandomStatus(),
  }))

  return (
    <>
      <CheckInHistoryFiltered className="mb-[16px]" />

      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}

export default CheckInHistoryTable
