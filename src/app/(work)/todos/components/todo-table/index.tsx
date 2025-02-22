'use client'

import { useAsyncEffect } from '@/libs/hook'
import { randomColor } from '@/libs/utils'
import { CheckOutlined, EyeOutlined } from '@ant-design/icons'
import { Avatar, Table, TableProps, Tag } from 'antd'
import { createStyles } from 'antd-style'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { TodoContext } from '../PageProvider'
import { getTodosRequest } from './action'
import TodoCompletedButton from './todo-completed-button'
type TodoTableProps = TableProps & {
  options?: any
}

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
    .ant-table-tbody {
      .ant-table-row:hover {
        .ant-table-cell {
          background: transparent;
        }
      }
    }
  `,
}))

const generateStatus = (status: string) => {
  switch (status) {
    case 'in_progress':
      return <Tag color="blue">Đang làm</Tag>
    case 'overdue':
      return <Tag color="red">Quá hạn</Tag>
    case 'completed':
      return <Tag color="green">Hoàn thành</Tag>
    case 'failed':
      return <Tag color="red">Thất bại</Tag>
    default:
      return <></>
  }
}

const columns: TableProps['columns'] = [
  {
    title: 'Công việc',
    dataIndex: 'name',
    width: 500,
    render: (name, record) => {
      return (
        <>
          <Link
            href={`/job/${record?.id}?wid=${record?.workflowId}`}
            className="mb-[4px] block"
          >
            {name}
          </Link>

          <div className="flex items-center">
            <div>{generateStatus(record?.status)}</div>
            {record?.creator_name && (
              <div className="text-[#00000073]">
                Người tạo{' '}
                <span className="text-[#000000E0]">{record?.creator_name}</span>{' '}
                lúc{' '}
                {String(dayjs(record?.created_at).format('HH:mm DD/MM/YYYY'))}
              </div>
            )}
          </div>
        </>
      )
    },
  },
  {
    title: 'Người giao',
    dataIndex: 'account_id',
    render: (_, record) => (
      <div className="flex items-center gap-[8px]">
        <Avatar
          src={record?.account_avatar}
          style={{ backgroundColor: randomColor(record?.account_name) }}
        >
          {String(record?.account_name).charAt(0).toUpperCase()}
        </Avatar>
        <span className="font-[600] text-[#000000E0]">
          {record?.account_name}
        </span>
      </div>
    ),
  },
  {
    title: 'Ngày giao',
    dataIndex: 'started_at',
    render: (timestamp) => (
      <div>{dayjs(new Date(timestamp)).format('HH:mm - DD/MM/YYYY')}</div>
    ),
  },
  {
    title: 'Thời hạn',
    dataIndex: 'expired',
    render: (expired) => (
      <div>
        {expired
          ? dayjs(new Date(expired)).format('HH:mm - DD/MM/YYYY')
          : 'Không thời hạn'}
      </div>
    ),
  },
  {
    title: 'Quy trình',
    dataIndex: 'workflow_name',
    render: (value) =>
      value ? <span className="text-[#1677ff]">{value}</span> : '---:---',
  },
  {
    title: 'Giai đoạn',
    dataIndex: 'stage_name',
    render: (value) =>
      value ? <span className="text-[#1677ff]">{value}</span> : '---:---',
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    render: (_, record) => {
      return (
        <div className="flex items-center gap-[8px]">
          <Link href={`/job/${record?.id}?wid=${record?.workflow_id}`}>
            <EyeOutlined className="text-[#1677ff]" />
          </Link>
          {record?.stage_name === 'Không có' &&
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

const TodoTable: React.FC<TodoTableProps> = ({
  dataSource: initialDataSource,
  options,
  ...rest
}) => {
  const searchParams = useSearchParams()
  const { loading, setLoading } = useContext(TodoContext)

  const [dataSource, setDataSource] = useState<any>(initialDataSource || [])
  const { styles } = useStyle()

  useAsyncEffect(async () => {
    if (searchParams.size <= 0) {
      setDataSource(initialDataSource || [])
      setLoading(false)
      return
    }

    const todos = await getTodosRequest(searchParams)

    setLoading(false)
    setDataSource(
      todos?.filter((todo: any) =>
        searchParams.get('type') === 'assign_me'
          ? todo.account_id === options.userId
          : todo.creator_by === options.userId,
      ),
    )
  }, [searchParams])

  return (
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      rowClassName="bg-transparent hover:bg-[#E6F4FF] transition-all duration-200"
      loading={loading}
      pagination={{
        pageSize: 8,
      }}
      {...rest}
    />
  )
}

export default TodoTable
