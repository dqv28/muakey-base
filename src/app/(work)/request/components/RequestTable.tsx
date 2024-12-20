'use client'

import { withApp } from '@/hoc'
import { randomColor } from '@/libs/utils'
import { DownOutlined } from '@ant-design/icons'
import { App, Avatar, Dropdown, Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { deleteProposeAction } from './action'
import RequestApprovedModalForm from './RequestApprovedModalForm'

type RequestTableProps = TableProps & {}

const generateStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return <Tag color="blue">Đang chờ duyệt</Tag>

    case 'approved':
      return <Tag color="green">Đã duyệt</Tag>

    case 'canceled':
      return <Tag color="red">Từ chối</Tag>

    default:
      return <></>
  }
}

const RequestTable: React.FC<RequestTableProps> = (props) => {
  const { message, modal } = App.useApp()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDeletePropose = async (id: number) => {
    try {
      const { message: msg, errors } = await deleteProposeAction(id)

      if (errors) {
        message.error(msg)
        return
      }

      message.success('Xóa đề xuất thành công')
      router.refresh()
    } catch (error) {
      throw new Error(String(error))
    }
  }

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
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) =>
        record?.status === 'pending' && (
          <Dropdown
            rootClassName="!z-50"
            trigger={['click']}
            dropdownRender={() => (
              <div className="rounded-[8px] bg-[#fff] p-[2px] shadow-md">
                <RequestApprovedModalForm
                  initialValues={{
                    id: record.id,
                  }}
                >
                  <div className="cursor-pointer rounded-[4px] bg-transparent px-[12px] py-[4px] transition-all hover:bg-[#0000000a]">
                    Duyệt
                  </div>
                </RequestApprovedModalForm>
                <div className="cursor-pointer rounded-[4px] bg-transparent px-[12px] py-[4px] transition-all hover:bg-[#0000000a]">
                  Từ chối
                </div>
                <div
                  className="cursor-pointer rounded-[4px] bg-transparent px-[12px] py-[4px] transition-all hover:bg-[#0000000a]"
                  onClick={() => {
                    modal.confirm({
                      title: 'Xác nhận xóa',
                      content: 'Bạn có chắc chắn muốn xóa đề xuất này không?',
                      open,
                      onOk: () => handleDeletePropose(record.id),
                      onCancel: () => setOpen(false),
                      okText: 'Xóa',
                      cancelText: 'Hủy',
                    })
                  }}
                >
                  Xóa
                </div>
              </div>
            )}
          >
            <span className="cursor-pointer text-[#1677ff]">
              More <DownOutlined />
            </span>
          </Dropdown>
        ),
    },
  ]

  return <Table columns={columns} {...props} />
}

export default withApp(RequestTable)
