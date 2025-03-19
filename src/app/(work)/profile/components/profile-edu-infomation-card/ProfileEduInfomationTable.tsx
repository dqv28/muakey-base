'use client'

import { EditOutlined, MenuOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'
import dayjs from 'dayjs'
import React from 'react'
import ProfileEduInfomationModalForm from './ProfileEduInfomationModalForm'

export type ProfileEduInfomationTableProps = TableProps & {
  options?: any
}

const ProfileEduInfomationTable: React.FC<ProfileEduInfomationTableProps> = ({
  options,
  ...props
}) => {
  console.log(options)

  const columns: ColumnType[] = [
    {
      title: '#',
      dataIndex: '#',
      render: () => <MenuOutlined />,
    },
    {
      title: 'Trường học',
      dataIndex: 'school_name',
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'major',
    },
    {
      title: 'Thời gian học',
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
      title: 'Bằng cấp',
      dataIndex: 'degree',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => (
        <ProfileEduInfomationModalForm
          initialValues={{
            ...record,
            timestamp: [dayjs(record?.start_date), dayjs(record?.end_date)],
            userId: options?.userId,
          }}
          mode="edit"
        >
          <EditOutlined className="!text-[#1677ff]" />
        </ProfileEduInfomationModalForm>
      ),
    },
  ]

  return <Table columns={columns} {...props} />
}

export default ProfileEduInfomationTable
