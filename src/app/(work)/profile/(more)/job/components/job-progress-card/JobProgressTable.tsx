import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import React from 'react'

export type JobProgressTableProps = TableProps & {}

const JobProgressTable: React.FC<JobProgressTableProps> = (props) => {
  const columns = [
    {
      title: 'Vị trí công việc',
      dataIndex: 'position',
    },
    {
      title: 'Lương',
      dataIndex: 'salary',
    },
    {
      title: 'Tệp đính kèm',
      dataIndex: 'attachment',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: () => {
        return <EditOutlined className="!text-[#1677ff]" />
      },
    },
  ]

  return <Table columns={columns} {...props} />
}

export default JobProgressTable
