'use client'

import { GLOBAL_BAN } from '@/libs/constant'
import { randomColor } from '@/libs/utils'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Select,
  SelectProps,
} from 'antd'
import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type StatisticsFilteredProps = {
  members?: any[]
}

const StatisticsFiltered: React.FC<StatisticsFilteredProps> = ({ members }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = new URLSearchParams(searchParams)

  const handleChange = (value: any) => {
    if (value?.length > 0) {
      query.set('mid', value.join(','))
    } else {
      query.delete('mid')
    }

    router.push(`?${String(query)}`)
  }

  const memberOptions = members
    ?.filter((m: any) => m?.type !== 'department')
    ?.filter((m: any) => !GLOBAL_BAN.includes(m?.full_name))
    ?.map((m: any) => ({
      label: m?.full_name,
      value: m?.id,
      avatar: m?.avatar,
    }))

  const optionRender: SelectProps['optionRender'] = (option) => {
    const { data } = option

    return (
      <div className="flex items-center gap-[8px]">
        <Avatar
          src={data?.avatar}
          style={{ backgroundColor: randomColor(String(option.label)) }}
        >
          {String(option.label).charAt(0).toUpperCase()}
        </Avatar>
        <span>{option.label}</span>
      </div>
    )
  }

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (date) {
      query.set('dw', String(dayjs(date).format('YYYY-MM-DD')))
    } else {
      query.delete('dw')
    }

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
        <Button icon={<LeftOutlined />} size="large" />
        <Button size="large">Hôm nay</Button>
        <Button icon={<RightOutlined />} size="large" />
      </div>
      <Select
        mode="multiple"
        placeholder="Nhân viên"
        allowClear
        style={{ width: 240 }}
        options={memberOptions}
        optionRender={optionRender}
        onChange={handleChange}
        size="large"
      />
    </div>
  )
}

export default StatisticsFiltered
