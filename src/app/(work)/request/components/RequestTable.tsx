'use client'

import { withApp } from '@/hoc'
import { randomColor } from '@/libs/utils'
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { App, Avatar, Table, TableProps, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { memo, useEffect, useState } from 'react'
import { deleteProposeAction } from './action'
import RequestConfirmModalForm from './request-confirm-modal-form'

type RequestTableProps = TableProps & {
  query?: any
  options?: any
}

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

const RequestTable: React.FC<RequestTableProps> = memo(
  ({ dataSource, query, options, ...rest }) => {
    const [requests, setRequests] = useState(dataSource || [])
    const { user } = options

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
              style={{
                backgroundColor: randomColor(String(record?.full_name)),
              }}
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
            <div className="flex items-center gap-[8px]">
              {user?.role === 'Admin lv2' && (
                <>
                  <RequestConfirmModalForm
                    initialValues={{
                      id: record.id,
                    }}
                    status="approved"
                  >
                    <Tooltip title="Duyệt đề xuất">
                      <CheckOutlined className="cursor-pointer text-[#389e0d]" />
                    </Tooltip>
                  </RequestConfirmModalForm>
                  <RequestConfirmModalForm
                    initialValues={{
                      id: record.id,
                    }}
                    status="canceled"
                  >
                    <Tooltip title="Từ chối đề xuất">
                      <CloseOutlined className="cursor-pointer text-[#cf1322]" />
                    </Tooltip>
                  </RequestConfirmModalForm>
                </>
              )}

              <div
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
                <Tooltip title="Xóa đề xuất">
                  <DeleteOutlined className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          ),
      },
    ]

    useEffect(() => {
      setRequests(() =>
        (dataSource || [])?.filter((data: any) =>
          data.status.includes(query?.status),
        ),
      )
    }, [query?.status, dataSource])

    return <Table columns={columns} dataSource={requests} {...rest} />
  },
)

RequestTable.displayName = 'RequestTable'

export default withApp(RequestTable)
