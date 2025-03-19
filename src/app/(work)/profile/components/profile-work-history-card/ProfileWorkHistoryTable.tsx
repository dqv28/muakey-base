'use client'

import { EditOutlined, MenuOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'
import dayjs from 'dayjs'
import React from 'react'
import ProfileWorkHistoryModalForm from './ProfileWorkHistoryModalForm'

export type ProfileWorkHistoryTableProps = TableProps & {
  options?: any
}

const ProfileWorkHistoryTable: React.FC<ProfileWorkHistoryTableProps> = ({
  options,
  ...props
}) => {
  const columns: ColumnType[] = [
    {
      title: '#',
      dataIndex: '#',
      render: () => <MenuOutlined />,
    },
    {
      title: 'Tên tổ chức, doanh nghiệp',
      dataIndex: 'company_name',
    },
    {
      title: 'Thời gian làm việc',
      dataIndex: 'timestamp',
      render: (_, record) => {
        return (
          <span>
            {dayjs(record?.start_date).format('DD/MM/YYYY')} -{' '}
            {dayjs(record?.end_date).format('DD/MM/YYYY')}
          </span>
        )
      },
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => (
        <ProfileWorkHistoryModalForm
          mode="edit"
          initialValues={{
            ...record,
            timestamp: [dayjs(record?.start_date), dayjs(record?.end_date)],
            userId: options?.userId,
          }}
        >
          <EditOutlined className="!text-[#1677ff]" />
        </ProfileWorkHistoryModalForm>
      ),
    },
  ]

  return <Table columns={columns} {...props} />
}

export default ProfileWorkHistoryTable
