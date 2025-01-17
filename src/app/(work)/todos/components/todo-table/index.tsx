'use client'

import { convertTime } from '@/libs/utils'
import { CheckOutlined } from '@ant-design/icons'
import { Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React from 'react'
import TodoCompletedButton from './todo-completed-button'

type TodoTableProps = TableProps & {}

dayjs.extend(duration)

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
          <TodoCompletedButton todoId={record?.id} />
        ))
      )
    },
  },
]

const TodoTable: React.FC<TodoTableProps> = (props) => {
  return (
    <Table
      columns={columns}
      rowClassName={(todo) => (todo?.status ? 'bg-[#deffdb]' : '')}
      {...props}
    />
  )
}

export default TodoTable
