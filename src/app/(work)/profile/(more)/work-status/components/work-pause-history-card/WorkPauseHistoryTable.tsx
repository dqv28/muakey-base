import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import React from 'react'

export type WorkPauseHistoryTableProps = TableProps & {}

const WorkPauseHistoryTable: React.FC<WorkPauseHistoryTableProps> = ({
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
      title: 'Khoảng thời gian',
      dataIndex: 'time',
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

export default WorkPauseHistoryTable
