'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

type RequestTableProps = TableProps & {}

const generateStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return <Tag color="blue">Đang chờ duyệt</Tag>

    case 'access':
      return <Tag color="green">Đã duyệt</Tag>

    case 'canceled':
      return <Tag color="red">Từ chối</Tag>

    default:
      return <></>
  }
}

const RequestTable: React.FC<RequestTableProps> = (props) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Nhóm',
      dataIndex: 'category_name',
    },
    {
      title: 'Người tạo',
      dataIndex: 'full_name',
      render: (_, record) => (
        <div className="flex items-center gap-[8px]">
          <Avatar
            src={record?.avatar}
            style={{ backgroundColor: randomColor(String(record?.full_name)) }}
          >
            {String(record?.full_name).charAt(0).toUpperCase()}
          </Avatar>
          <span>{record?.full_name}</span>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => generateStatus(status),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (date) => (
        <div>{date ? dayjs(date).format('DD/MM/YYYY') : ''}</div>
      ),
    },
  ]

  return <Table columns={columns} {...props} />
}

export default RequestTable
