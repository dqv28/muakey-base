'use client'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Select,
} from 'antd'
import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type StatisticsFilteredProps = {}

const addDate = (date: Date, days: number) => {
  let d = new Date(date)
  d.setDate(d.getDate() + days)

  return String(dayjs(d).format('YYYY-MM-DD'))
}

const StatisticsFiltered: React.FC<StatisticsFilteredProps> = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = new URLSearchParams(searchParams)
  const filterBy = query.get('as')

  const memberOptions = [
    {
      label: 'Nhân viên',
      value: 'staff',
    },
    {
      label: 'Quy trình',
      value: 'workflow',
    },
  ]

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (date) {
      query.set('dw', String(dayjs(date).format('YYYY-MM-DD')))
    } else {
      query.delete('dw')
    }

    router.push(`?${String(query)}`)
  }

  const currentDate = query.get('dw')
  const today = String(dayjs(new Date()).format('YYYY-MM-DD'))

  const handleChangeDate = (date: string, type?: 'add' | 'sub') => {
    query.set(
      'dw',
      type ? addDate(new Date(date), type === 'add' ? 1 : -1) : today,
    )

    router.push(`?${String(query)}`)
  }

  return (
    <div className="flex items-center gap-[8px] p-[16px]">
      <ConfigProvider locale={locale}>
        <DatePicker
          className="w-full"
          picker="week"
          style={{ width: 280 }}
          onChange={handleDateChange}
          format={'YYYY-MM-DD'}
          size="large"
        />
      </ConfigProvider>
      <div className="flex items-center gap-[8px]">
        <Button
          icon={<LeftOutlined />}
          size="large"
          onClick={() => handleChangeDate(currentDate || today, 'sub')}
        />
        <Button size="large" onClick={() => handleChangeDate(today)}>
          Hôm nay
        </Button>
        <Button
          icon={<RightOutlined />}
          size="large"
          onClick={() => handleChangeDate(currentDate || today, 'add')}
        />
      </div>
      <Select
        allowClear
        style={{ width: 240 }}
        options={memberOptions}
        size="large"
        defaultValue={[filterBy || 'staff']}
        onChange={(value) => {
          if (value) {
            query.set('as', String(value))
          } else {
            query.delete('as')
          }

          router.push(`?${String(query)}`)
        }}
      />
    </div>
  )
}

export default StatisticsFiltered
