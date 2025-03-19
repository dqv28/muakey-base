'use client'

import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'
import React from 'react'
import ProfileContactModalForm from './ProfileContactModalForm'

export type ProfileContactTableProps = TableProps & {
  options?: any
}

const ProfileContactTable: React.FC<ProfileContactTableProps> = ({
  options,
  ...props
}) => {
  const columns: ColumnType[] = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
      title: 'Mối quan hệ',
      dataIndex: 'relationship',
    },
    {
      title: 'Liên hệ',
      dataIndex: 'phone_number',
    },
    {
      title: 'Phụ thuộc',
      dataIndex: 'is_dependent',
      render: (value) => !!value && 'Là người phụ thuộc',
    },
    {
      title: 'Khẩn cấp',
      dataIndex: 'is_urgent',
      render: (value) => !!value && 'Liên hệ khẩn cấp',
    },
    {
      title: 'Hộ khẩu',
      dataIndex: 'is_household',
      render: (value) => !!value && 'Trong hộ khẩu',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => (
        <ProfileContactModalForm
          mode="edit"
          initialValues={{
            ...record,
            userId: options?.userId,
          }}
        >
          <EditOutlined className="!text-[#1677ff]" />
        </ProfileContactModalForm>
      ),
    },
  ]
  return <Table columns={columns} {...props} />
}

export default ProfileContactTable
