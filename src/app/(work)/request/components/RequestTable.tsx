'use client'

import { Table, TableProps } from 'antd'
import React from 'react'

type RequestTableProps = TableProps & {}

const RequestTable: React.FC<RequestTableProps> = (props) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'name',
    },
    {
      title: 'Nhóm',
      dataIndex: 'name',
    },
    {
      title: 'Người tạo',
      dataIndex: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'name',
    },
  ]

  return <Table columns={columns} {...props} />
}

export default RequestTable
