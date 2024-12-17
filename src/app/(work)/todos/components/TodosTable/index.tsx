'use client'

import { withApp } from '@/hoc'
import { convertTime } from '@/libs/utils'
import { CheckOutlined } from '@ant-design/icons'
import { App, Button, Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { markTodoCompletedAction } from './action'

type TodosTableProps = TableProps & {}

dayjs.extend(duration)

const TodosTable: React.FC<TodosTableProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { message, modal } = App.useApp()
  const router = useRouter()

  const handleMarkTodoCompleted = async (id: number) => {
    setLoading(true)

    try {
      const { message: msg, errors } = await markTodoCompletedAction(id)

      if (errors) {
        message.error(msg)
        setLoading(false)
        setOpen(false)
        return
      }

      message.success('Đã hoàn thành.')
      setLoading(false)
      setOpen(false)
      router.refresh()
    } catch (error) {
      throw new Error(String(error))
    }
  }

  const columns: TableProps['columns'] = [
    {
      title: 'Công việc',
      dataIndex: 'name',
      width: 500,
      render: (name, record) => {
        const t = new Date(record?.expired).getTime() - new Date().getTime()
        const timeStatus = t >= 0 ? 'inprogress' : 'overdue'
        const time = dayjs.duration(Math.abs(t))

        return (
          <>
            <div className="mb-[4px]">{name}</div>
            {record?.expired && (
              <Tag color={timeStatus === 'inprogress' ? 'green' : 'red'}>
                {timeStatus === 'inprogress' ? 'Đến hạn trong' : 'Quá hạn'}{' '}
                {convertTime(time.asSeconds())}
              </Tag>
            )}
          </>
        )
      },
    },
    {
      title: 'Ngày giao',
      dataIndex: 'started_at',
      render: (timestamp) => (
        <div>{dayjs(new Date(timestamp)).format('HH:mm DD/MM/YYYY')}</div>
      ),
    },
    {
      title: 'Thời hạn',
      dataIndex: 'expired',
      render: (expired) => (
        <div>
          {expired
            ? dayjs(new Date(expired)).format('HH:mm DD/MM/YYYY')
            : 'Không thời hạn'}
        </div>
      ),
    },
    {
      title: 'Giai đoạn',
      dataIndex: 'stage',
    },
    {
      title: 'Quy trình',
      dataIndex: 'workflow',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          record?.stage === 'Không có' &&
          (record?.status ? (
            <Tag color="green">
              Đã hoàn thành <CheckOutlined />
            </Tag>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                modal.confirm({
                  title: 'Xác nhận',
                  content: 'Đánh dấu hoàn thành nhiệm vụ này?',
                  open,
                  okButtonProps: {
                    loading,
                  },
                  onCancel: () => setOpen(false),
                  onOk: () => handleMarkTodoCompleted(record?.id),
                })
              }}
            >
              Đánh dấu hoàn thành
            </Button>
          ))
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      rowClassName={(todo) => (todo?.status ? 'bg-[#deffdb]' : '')}
      {...props}
    />
  )
}

export default withApp(TodosTable)
