'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, Button, Table, TableProps } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

type StatisticsTableProps = TableProps & {}

const StatisticsTable: React.FC<StatisticsTableProps> = ({
  dataSource,
  ...rest
}) => {
  const [statistics, setStatistics] = useState(dataSource || [])
  const columnNames = dataSource?.reduce((init: any, current: any) => {
    return Array.from(new Set([...init, ...Object.keys(current)]))
  }, [])

  const columns: TableProps['columns'] = [
    ...columnNames?.map((c: string) => ({
      title: c,
      dataIndex: c,
      className: 'min-w-[160px] max-w-[620px]',
      render: (value: any) =>
        c === 'Người thực thi' ? (
          <div className="flex items-center gap-[8px]">
            <Avatar
              className="text-[12px]"
              style={{ backgroundColor: randomColor(String(value)) }}
            >
              {String(value).charAt(0).toUpperCase()}
            </Avatar>
            <span>{value}</span>
          </div>
        ) : (
          <span
            className={clsx({
              'text-[#ff4d4f]': value === 'Thất bại',
              'text-[#52c41a]': value === 'Hoàn thành',
            })}
          >
            {value}
          </span>
        ),
    })),
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: () => {
        return <Button type="primary">Góp ý</Button>
      },
    },
  ]

  useEffect(() => {
    setStatistics(dataSource || [])
  }, [dataSource, statistics])

  return (
    <Table
      rootClassName="min-w-full !max-w-max w-max"
      columns={columns}
      dataSource={dataSource}
      {...rest}
    />
  )
}

export default StatisticsTable
