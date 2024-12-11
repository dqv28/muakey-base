'use client'

import { convertTime } from '@/libs/utils'
import { Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React from 'react'

type TodosTableProps = TableProps & {}

dayjs.extend(duration)

const TodosTable: React.FC<TodosTableProps> = (props) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Công việc',
      dataIndex: 'name',
      width: 700,
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
      title: 'Thời hạn',
      dataIndex: 'expired',
      render: (expired) => (
        <div>{dayjs(new Date(expired)).format('HH:mm DD/MM/YYYY')}</div>
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
  ]

  return <Table columns={columns} {...props} />
}

export default TodosTable
