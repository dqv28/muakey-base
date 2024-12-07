'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, Divider, Table, TableProps } from 'antd'
import { createStyles } from 'antd-style'
import dayjs from 'dayjs'
import { times } from 'lodash'
import React from 'react'

type CheckInTableProps = TableProps & {
  options?: any
}

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  }
})

const CheckInTable: React.FC<CheckInTableProps> = ({ options, ...props }) => {
  const { styles } = useStyle()
  const year = new Date().getFullYear()
  const month = options?.day || new Date().getMonth() + 1

  const dateNumber = new Date(year, month, 0).getDate()

  const checkInColumns: TableProps['columns'] = [
    {
      title: 'Thành viên',
      dataIndex: 'member',
      fixed: true,
      width: 240,
      render: (value) => (
        <div className="flex items-center gap-[8px]">
          <Avatar
            src={value?.avatar}
            style={{
              backgroundColor: randomColor(value?.fullName || ''),
            }}
            size={32}
          >
            {String(value?.fullName).charAt(0).toLocaleUpperCase()}
          </Avatar>
          <span>{value?.fullName}</span>
        </div>
      ),
    },
    ...times(dateNumber, (num): any => ({
      title: `${num + 1 > 9 ? num + 1 : `0${num + 1}`}/${month}`,
      dataIndex: `${num + 1}/${month}`,
      width: 80,
      align: 'center',
      render: (value: any) => {
        return (
          <>
            {Array.isArray(value) ? (
              <div className="flex flex-col gap-[4px]">
                <span>{value[0]}</span>
                {value[1] && (
                  <>
                    <Divider className="!m-0 !w-[10px]" />
                    <span>{value[1]}</span>
                  </>
                )}
              </div>
            ) : null}
          </>
        )
      },
    })),
  ]

  const checkInDataSource = options?.members?.map((m: any) => {
    const checkInHistories = options?.attendances?.filter(
      (a: any) => a?.account_id === m?.id,
    )

    const fields = times(dateNumber, (num): any => {
      const checkInDate = checkInHistories?.find(
        (c: any) => new Date(c?.checkin).getDate() == num + 1,
      )

      const checkInValue = checkInDate
        ? [
            dayjs(checkInDate?.checkin).format('HH:mm'),
            checkInDate?.checkout
              ? dayjs(checkInDate?.checkout).format('HH:mm')
              : null,
          ]
        : null
        
      return [`${num + 1}/${month}`, checkInValue]
    })

    return {
      member: {
        fullName: m?.full_name,
        avatar: m?.avatar,
      },
      ...Object.fromEntries(fields),
    }
  })

  return (
    <Table
      className={styles.customTable}
      columns={checkInColumns}
      dataSource={checkInDataSource}
      {...props}
    />
  )
}

export default CheckInTable
