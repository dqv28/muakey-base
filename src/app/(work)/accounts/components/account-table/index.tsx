'use client'

import { randomColor } from '@/libs/utils'
import { EditOutlined, LockOutlined } from '@ant-design/icons'
import { Avatar, Badge, Table, TableProps } from 'antd'
import React from 'react'

export type AccountTableProps = TableProps & {}

const generateRole = (role: string) => {
  switch (role) {
    case 'Admin lv2':
      return (
        <Badge
          color="#F5222D"
          text={
            <span className="font-[500] text-[#F5222D]">Quản trị cấp cao</span>
          }
        />
      )
    case 'Admin':
      return (
        <Badge
          color="#FAAD14"
          text={<span className="font-[500] text-[#FAAD14]">Quản trị</span>}
        />
      )
    case 'User':
      return (
        <Badge
          color="#389E0D"
          text={
            <span className="font-[500] text-[#389E0D]">
              Thành viên thông thường
            </span>
          }
        />
      )
    default:
      return role
  }
}

const AccountTable: React.FC<AccountTableProps> = ({
  dataSource,
  ...props
}) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      render: (text: string) => text?.substring(1),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-[8px]">
          <Avatar
            src={record?.avatar}
            style={{ backgroundColor: randomColor(String(text)) }}
            alt={String(text)}
          >
            {String(text).charAt(0).toUpperCase()}
          </Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      render: (text: string) => generateRole(text),
    },
    {
      title: 'Chức danh',
      dataIndex: 'position',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: () => (
        <div className="flex items-center gap-[8px]">
          <EditOutlined className="text-[#1677ff]" />
          <LockOutlined className="text-[#CF1322]" />
        </div>
      ),
    },
  ]

  return <Table {...props} columns={columns} dataSource={dataSource} />
}

export default AccountTable
