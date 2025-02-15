'use client'

import { convertTime } from '@/libs/utils'
import { CheckOutlined, EyeOutlined } from '@ant-design/icons'
import { Table, TableProps, Tag } from 'antd'
import { createStyles } from 'antd-style'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import Link from 'next/link'
import React from 'react'
import TodoCompletedButton from './todo-completed-button'

type TodoTableProps = TableProps & {}

dayjs.extend(duration)

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table-thead {
      tr {
        th {
          background-color: #fff;
        }
      }
    }
  `,
}))

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
          <Link
            href={`/job/${record?.id}?wid=${record?.workflowId}`}
            className="mb-[4px] block"
          >
            {name}
          </Link>
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
    title: 'Quy trình',
    dataIndex: 'workflowName',
    render: (value) => <span className="text-[#1677ff]">{value}</span>,
  },
  {
    title: 'Giai đoạn',
    dataIndex: 'stage',
    render: (value) => <span className="text-[#1677ff]">{value}</span>,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    render: (_, record) => {
      return (
        <div className="flex items-center gap-[8px]">
          <Link href={`/job/${record?.id}?wid=${record?.workflowId}`}>
            <EyeOutlined className="text-[#1677ff]" />
          </Link>
          {record?.stage === 'Không có' &&
            (record?.status ? (
              <Tag color="green">
                Đã hoàn thành <CheckOutlined />
              </Tag>
            ) : (
              <TodoCompletedButton todoId={record?.id} />
            ))}
        </div>
      )
    },
  },
]

const TodoTable: React.FC<TodoTableProps> = (props) => {
  const { styles } = useStyle()

  return (
    <Table
      className={styles.customTable}
      columns={columns}
      rowClassName={(todo) => (todo?.status ? 'bg-[#deffdb]' : '')}
      {...props}
    />
  )
}

export default TodoTable
