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
import CheckInScheduleModalForm from './CheckInScheduleModalForm'

import { END_TIME, GLOBAL_BAN, START_TIME } from '@/libs/constant'
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjsLocale from 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import { calculateWorkTime } from '../ultils'
import CalendarDropdown from './CalendarDropdown'
import CheckInStatistics from './check-statistics'
import CheckInTableExplanation from './CheckInTableExplanation'

type CheckInTableProps = TableProps & {
  options?: any
  onDateSelect?: (date: any) => void
}

const generateTimestamp = (start: string, end: string, currentDate: number) => {
  const startDate = new Date(start).getDate()
  const endDate = new Date(end).getDate()

  if (startDate <= currentDate && endDate >= currentDate) {
    if (startDate === currentDate && endDate === currentDate) {
      const startTime = dayjs(start).format('HH:mm')
      const endTime = dayjs(end).format('HH:mm')

      return [startTime, endTime]
    }

    if (startDate === currentDate) {
      const startTime = dayjs(start).format('HH:mm')

      return [startTime, END_TIME]
    }

    if (currentDate > startDate && currentDate < endDate) {
      return [START_TIME, END_TIME]
    }

    if (currentDate === endDate) {
      const endTime = dayjs(end).format('HH:mm')

      return [START_TIME, endTime]
    }
  }

  return null
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

const CheckInTable: React.FC<CheckInTableProps> = ({
  options,
  onDateSelect,
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

  dayjs.extend(relativeTime)
  dayjs.locale(dayjsLocale)

  const dateParams = searchParams?.get('date')
  const dateNumber = new Date(year, month, 0).getDate()

  const checkInColumns: TableProps['columns'] = [
    {
      title: 'Thành viên',
      dataIndex: 'member',
      fixed: true,
      width: 300,
      render: (value, record) => {
        const workDays = Object.entries(record)?.filter(
          (c: any) => !!c[1]?.checkInValue,
        )

        return (
          <div className="flex items-center justify-between">
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

            <div>TC: {calculateWorkTime(workDays)}</div>
          </div>
        )
      },
    },
    ...times(dateNumber, (num): any => {
      const date = dayjs(
        `${year}-${month > 9 ? month : `0${month}-${num + 1 > 9 ? num + 1 : `0${num + 1}`}`}`,
      )

      return {
        title: (
          <div>
            <div>{String(date.format('dd'))}</div>
            <div>{String(date.format('DD/MM'))}</div>
          </div>
        ),
        dataIndex: `${num + 1}/${month}`,
        width: 120,
        align: 'center',
        render: (value: any) => {
          const checkIn = value.checkInValue

          return (
            <div className="flex flex-col gap-[4px]">
              {checkIn?.map((c: any, index: number) => (
                <>
                  {index > 0 && <Divider className="!my-[4px]" />}
                  <div key={c[0]}>
                    {c[0]} - {c[1] ? c[1] : '--:--'}
                  </div>
                </>
              ))}
            </div>
          )
        },
      }
    }),
  ]

  const { user, workSchedule, attendances, propose } = options

  const checkInDataSource = options?.members
    ?.filter((m: any) => !GLOBAL_BAN.includes(m?.full_name))
    ?.map((m: any) => {
      const checkInHistories = attendances?.filter(
        (a: any) => a?.account_id === m?.id,
      )

      const myPropose = propose?.filter(
        (p: any) => p?.full_name === m?.full_name,
      )
      const otPropose = myPropose
        .filter((p: any) => p?.category_name === 'Đăng ký OT')
        .map((p: any) => p?.date)
        .flat()

      const timeOffPropose = myPropose
        .filter((p: any) => p?.category_name === 'Đăng ký nghỉ')
        .map((p: any) => p?.date)
        .flat()

      const fields = times(dateNumber, (num): any => {
        const currentDate = num + 1

        const checkIn = checkInHistories?.filter(
          (c: any) => new Date(c?.checkin).getDate() == num + 1,
        )

        const checkInValue =
          checkIn?.length >= 1
            ? checkIn?.map((c: any) => [
                dayjs(c?.checkin).format('HH:mm'),
                c?.checkout ? dayjs(c?.checkout).format('HH:mm') : null,
              ])
            : null

        const timeOff = timeOffPropose?.map((t: any) =>
          generateTimestamp(t?.start_date, t?.end_date, currentDate),
        )

        const ot = otPropose?.map((t: any) =>
          generateTimestamp(t?.start_date, t?.end_date, currentDate),
        )

        return [
          `${currentDate}/${month}`,
          {
            checkInValue,
            timeOff,
            ot,
          },
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

  const days = Object.entries(checkInDataSource[0] || {})?.filter(
    (c: any) => !!c[1]?.checkInValue,
  )

  const checkInData = checkInDataSource?.find(
    (c: any) => c?.member?.fullName === user?.full_name,
  )

  const timeOffs = workSchedule?.filter((s: any) => s?.go_to_work === 0)
  const standard = dateNumber - timeOffs?.length

  const checkInStatisticsItems = [
    {
      title: 'Công chuẩn',
      value: standard,
    },
    {
      title: 'Công làm việc thực tế',
      value: calculateWorkTime(days),
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
                    {...props}
                  />
                ),
              },
              {
                key: 'schedule',
                label: <div className="px-[16px]">Lịch làm việc</div>,
                children: (
                  <Calendar
                    rootClassName="border border-[#0505050f]"
                    headerRender={() => <></>}
                    fullCellRender={(current) => {
                      const timestamp = dayjs(current).format('D/M')

                      const info = checkInData?.[String(timestamp)] || []

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
                          onDateClick={(date) => onDateSelect?.(date)}
                        />
                      )
                    }}
                    value={date}
                    locale={locale}
                  />
                ),
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
                const info = checkInData?.[String(timestamp)] || []

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
                    onDateClick={(date) => onDateSelect?.(date)}
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
