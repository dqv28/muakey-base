'use client'

import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import React from 'react'

export type WorkLeaveHistoryTableProps = TableProps & {}

const WorkLeaveHistoryTable: React.FC<WorkLeaveHistoryTableProps> = ({
  ...props
}) => {
  const columns = [
    {
      title: '#',
      dataIndex: '#',
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
    },
    {
      title: 'Ngày nghỉ việc',
      dataIndex: 'day_off',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'evaluation',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: () => {
        return <EditOutlined />
      },
    },
  ]

  return <Table columns={columns} {...props} />
}

export default WorkLeaveHistoryTable
