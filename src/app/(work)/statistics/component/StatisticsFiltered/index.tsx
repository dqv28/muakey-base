'use client'

import { ConfigProvider, DatePicker, Select } from 'antd'
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
    ?.filter((mem: any) => mem?.type !== 'department')
    ?.map((m: any) => ({
      label: m?.full_name,
      value: m?.id,
    }))

  return (
    <div className="flex items-center gap-[8px]">
      <ConfigProvider locale={locale}>
        <DatePicker
          className="w-full"
          picker="week"
          style={{ width: 300 }}
          onChange={(date) => {
            if (date) {
              query.set('dw', String(dayjs(date).format('YYYY-MM-DD')))
            } else {
              query.delete('dw')
            }

            router.push(`?${String(query)}`)
          }}
          format={'YYYY-MM-DD'}
        />
      </ConfigProvider>
      <Select
        mode="multiple"
        placeholder="Thành viên"
        allowClear
        style={{ width: 300 }}
        options={memberOptions}
        onChange={handleChange}
      />
    </div>
  )
}

export default StatisticsFiltered
