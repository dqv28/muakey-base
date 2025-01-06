'use client'

import { randomColor } from '@/libs/utils'
import { SettingOutlined } from '@ant-design/icons'
import { Avatar, Calendar, Divider, Table, TableProps, Tabs } from 'antd'
import { createStyles } from 'antd-style'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { times } from 'lodash'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import CheckInSchedule from './CheckInSchedule'
import CheckInScheduleModalForm from './CheckInScheduleModalForm'

import locale from 'antd/es/date-picker/locale/vi_VN'
import CalendarDropdown from './CalendarDropdown'
import CheckInStatistics from './CheckInStatistics'
import CheckInTableExplanation from './CheckInTableExplanation'

type CheckInTableProps = TableProps & {
  options?: any
}

const useStyle = createStyles(({ css, token }) => {
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

const GLOBAL_BAN = [
  'Admin',
  'cinren16',
  'Mạnh',
  'Nghĩa IT',
  'Nhật',
  'Đức Thịnh',
]

const CheckInTable: React.FC<CheckInTableProps> = ({
  options,
  className: customClassName,
  ...props
}) => {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState('dashboard')

  const today = useMemo(() => new Date(), [])
  const [date, setDate] = useState<any>(dayjs(today))
  const { styles } = useStyle()
  const year = new Date().getFullYear()
  const month = options?.day || new Date().getMonth() + 1

  const dateParams = searchParams?.get('date')
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
      onCell: (data: any) => {
        const cellValue = data?.[`${num + 1}/${month}`]

        return {
          className: !!cellValue?.checkInValue
            ? cellValue?.on_time
              ? 'bg-[#deffdb]'
              : 'bg-[#ffe8e8]'
            : '',
        }
      },
      render: (value: any) => {
        const checkIn = value.checkInValue

        return (
          <>
            {Array.isArray(checkIn) ? (
              <div className="flex flex-col gap-[4px]">
                <span>{checkIn[0]}</span>
                {checkIn[1] && (
                  <>
                    <Divider className="!m-0 !w-[10px]" />
                    <span>{checkIn[1]}</span>
                  </>
                )}
              </div>
            ) : null}
          </>
        )
      },
    })),
  ]

  const { user, workSchedule } = options

  const checkInDataSource = options?.members
    ?.filter((m: any) => !GLOBAL_BAN.includes(m?.full_name))
    ?.filter(
      (m: any) =>
        user?.role === 'Admin lv2' ||
        (user?.role !== 'Admin lv2' && user?.id === m?.id),
    )
    ?.map((m: any) => {
      const checkInHistories = options?.attendances?.filter(
        (a: any) => a?.account_id === m?.id,
      )

      const fields = times(dateNumber, (num): any => {
        const checkIn = checkInHistories?.find(
          (c: any) => new Date(c?.checkin).getDate() == num + 1,
        )

        const checkInValue = checkIn
          ? [
              dayjs(checkIn?.checkin).format('HH:mm'),
              checkIn?.checkout
                ? dayjs(checkIn?.checkout).format('HH:mm')
                : null,
            ]
          : null

        return [
          `${num + 1}/${month}`,
          { checkInValue, on_time: checkIn?.on_time },
        ]
      })

      return {
        member: {
          fullName: m?.full_name,
          avatar: m?.avatar,
        },
        ...Object.fromEntries(fields),
      }
    })

  useEffect(() => {
    setDate(dayjs(searchParams?.get('date') || today))
  }, [today, searchParams])

  const days = Object.entries(checkInDataSource[0])?.filter(
    (c: any) => !!c[1]?.checkInValue,
  )

  const checkInStatisticsItems = [
    {
      title: 'Công chuẩn',
      value: 26,
    },
    {
      title: 'Công làm việc thực tế',
      value: days?.length,
    },
    {
      title: 'Nghỉ có hưởng lương',
      value: 0,
    },
    {
      title: 'Nghỉ không hưởng lương',
      value: 0,
    },
    {
      title: 'Tổng OT',
      value: 0,
    },
    {
      title: 'Tổng công hưởng lương',
      value: 0,
    },
  ]

  return (
    <div>
      {user?.role === 'Admin lv2' ? (
        <div className="rounded bg-[#fff]">
          <Tabs
            tabBarExtraContent={
              mode === 'schedule' && (
                <CheckInScheduleModalForm
                  initialValues={{
                    workSchedule,
                  }}
                >
                  <div className="px-[16px]">
                    <SettingOutlined className="cursor-pointer text-[18px]" />
                  </div>
                </CheckInScheduleModalForm>
              )
            }
            items={[
              {
                key: 'dashboard',
                label: <div className="px-[16px]">Tổng quan</div>,
                children: (
                  <Table
                    className={clsx(styles.customTable, customClassName)}
                    columns={checkInColumns}
                    dataSource={checkInDataSource}
                    rowHoverable={false}
                    scroll={{ x: 'max-content', y: 55 * 5 }}
                    {...props}
                  />
                ),
              },
              {
                key: 'schedule',
                label: <div className="px-[16px]">Lịch làm việc</div>,
                children: <CheckInSchedule schedule={workSchedule} />,
              },
            ]}
            onChange={(key) => setMode(key)}
          />
        </div>
      ) : (
        <div className="space-y-[16px]">
          {user?.role !== 'Admin lv2' && (
            <CheckInStatistics items={checkInStatisticsItems} />
          )}
          <div className="space-y-[24px] rounded-[16px] bg-[#fff] p-[16px]">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-[500]">Chi tiết ngày công</span>
              <CheckInTableExplanation
                items={[
                  {
                    label: 'Giờ kế hoạch',
                    className: 'bg-[#1890FF]',
                  },
                  {
                    label: 'Giờ thực tế',
                    className: 'bg-[#237804]',
                  },
                  {
                    label: 'Lỗi chấm công',
                    className: 'bg-[#F5222D]',
                  },
                  {
                    label: 'Nghỉ',
                    className: 'bg-[#FA8C16]',
                  },
                  {
                    label: 'OT',
                    className: 'bg-[#722ED1]',
                  },
                ]}
              />
            </div>
            <Calendar
              rootClassName="border border-[#0505050f]"
              headerRender={() => <></>}
              fullCellRender={(current) => {
                const timestamp = dayjs(current).format('D/M')
                const info = checkInDataSource[0][String(timestamp)] || []

                const date = String(dayjs(current).format('YYYY-MM-DD'))

                const day = workSchedule?.find(
                  (s: any) => s?.day_of_week === date,
                )

                const isCurrentMonth =
                  String(dayjs(current).format('YYYY-MM')) ===
                  (dateParams || dayjs(new Date()).format('YYYY-MM'))

                return (
                  <CalendarDropdown
                    currentDate={current}
                    day={day}
                    options={{
                      isCurrentMonth,
                      info,
                    }}
                  />
                )
              }}
              value={date}
              locale={locale}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckInTable
