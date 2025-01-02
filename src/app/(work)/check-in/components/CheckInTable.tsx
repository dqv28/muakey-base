'use client'

import { randomColor } from '@/libs/utils'
import { SettingOutlined } from '@ant-design/icons'
import {
  Avatar,
  Calendar,
  Col,
  ConfigProvider,
  Divider,
  Dropdown,
  Row,
  Table,
  TableProps,
  Tabs,
} from 'antd'
import { createStyles } from 'antd-style'
import locale from 'antd/locale/vi_VN'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { times } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import CheckInSchedule from './CheckInSchedule'
import CheckInScheduleModalForm from './CheckInScheduleModalForm'

import Image from 'next/image'
import dayOffImagefrom from './day-off-img.jpg'

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

const GLOBAL_BAN = ['Admin', 'cinren16', 'Mạnh', 'Nghĩa IT', 'Nhật']

const CheckInTable: React.FC<CheckInTableProps> = ({ options, ...props }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode] = useState('dashboard')

  const today = useMemo(() => new Date(), [])
  const [date, setDate] = useState<any>(dayjs(today))
  const { styles } = useStyle()
  const year = new Date().getFullYear()
  const month = options?.day || new Date().getMonth() + 1
  const urlSearchParams = new URLSearchParams()

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

  const query = (p: string) => {
    const url = new URLSearchParams(searchParams.toString())

    url.set('form', String(p))

    router.push(`?${url.toString()}`)
  }

  const dropdownRender = () => {
    return (
      <div className="overflow-hidden rounded-[6px] bg-[#fff] p-[2px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[12px] leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('register-time-off')}
        >
          Đăng Ký Nghỉ
        </div>
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[12px] leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('change-shift')}
        >
          Thay Đổi Phân Ca
        </div>
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[12px] leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('change-check-in')}
        >
          Sửa Giờ Vào Ra
        </div>
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[12px] leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('register-ot')}
        >
          Đăng Ký OT
        </div>
      </div>
    )
  }

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
      value: days?.length,
    },
    {
      title: 'Nghỉ không hưởng lương',
      value: days?.length,
    },
    {
      title: 'Tổng OT',
      value: days?.length,
    },
    {
      title: 'Tổng công hưởng lương',
      value: days?.length,
    },
  ]

  return (
    <div>
      {user?.role === 'Admin lv2' ? (
        <div className="rounded bg-[#fff] p-[16px]">
          <Tabs
            tabBarExtraContent={
              mode === 'schedule' && (
                <CheckInScheduleModalForm
                  initialValues={{
                    workSchedule,
                  }}
                >
                  <SettingOutlined className="cursor-pointer text-[18px]" />
                </CheckInScheduleModalForm>
              )
            }
            items={[
              {
                key: 'dashboard',
                label: 'Tổng quan',
                children: (
                  <Table
                    className={clsx('w-full overflow-auto', styles.customTable)}
                    columns={checkInColumns}
                    dataSource={checkInDataSource}
                    rowHoverable={false}
                    {...props}
                  />
                ),
              },
              {
                key: 'schedule',
                label: 'Lịch làm việc',
                children: <CheckInSchedule schedule={workSchedule} />,
              },
            ]}
            onChange={(key) => setMode(key)}
          />
        </div>
      ) : (
        <ConfigProvider locale={locale}>
          <div className="space-y-[16px]">
            {user?.role !== 'Admin lv2' && (
              <div className="bg-[#fff] p-[16px]">
                <div className="text-center text-[14px] font-[500]">
                  TỔNG HỢP NGÀY CÔNG
                </div>
                <Divider className="!my-[12px]" />

                <Row gutter={16}>
                  {checkInStatisticsItems.map((item) => (
                    <Col span={4} key={item.value}>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[#00000073]">{item.title}</span>
                        <span>{item.value}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            <div className="bg-[#fff] p-[16px]">
              <div className="text-center text-[14px] font-[500]">
                CHI TIẾT NGÀY CÔNG
              </div>
              <Divider className="!my-[12px]" />
              <Calendar
                headerRender={() => <></>}
                fullCellRender={(current) => {
                  const timestamp = dayjs(current).format('D/M')
                  const info = checkInDataSource[0][String(timestamp)] || []

                  const date = String(dayjs(current).format('YYYY-MM-DD'))

                  const day = workSchedule?.find(
                    (s: any) => s?.day_of_week === date,
                  )

                  return (
                    <Dropdown
                      trigger={['click']}
                      dropdownRender={dropdownRender}
                    >
                      <div
                        className={clsx(
                          'mx-[2px] flex aspect-[220/160] size-full flex-col justify-between border-x border-x-[#fff] px-[8px] pb-[8px] pt-[6px]',
                          day?.go_to_work === 1 && info?.checkInValue?.[0]
                            ? info?.on_time
                              ? 'border-t border-t-[#deffdb] bg-[#deffdb]'
                              : 'border-t border-t-[#ffe8e8] bg-[#ffe8e8]'
                            : 'border-t border-t-[#eee]',
                        )}
                        onClick={() => {
                          urlSearchParams?.set(
                            'date',
                            current
                              ? String(dayjs(current).format('YYYY-MM'))
                              : '',
                          )

                          router.push(`?${urlSearchParams.toString()}`)
                        }}
                      >
                        <span className="block h-[22px]">
                          {String(dayjs(current).format('DD/MM'))}
                        </span>
                        {day?.go_to_work !== undefined ? (
                          day?.go_to_work === 0 ? (
                            <div className="flex flex-1 items-center justify-center">
                              <Image
                                className="aspect-[600/453] object-cover"
                                src={dayOffImagefrom.src}
                                alt="day-off"
                                width={100}
                                height={80}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-[8px]">
                              {info.checkInValue?.[0] && (
                                <span>Vào: {info.checkInValue?.[0]}</span>
                              )}
                              {info.checkInValue?.[1] && (
                                <span>Ra: {info.checkInValue?.[1]}</span>
                              )}
                            </div>
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    </Dropdown>
                  )
                }}
                value={date}
                onPanelChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </ConfigProvider>
      )}
    </div>
  )
}

export default CheckInTable
