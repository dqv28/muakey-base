'use client'

import { ConfigProvider, DatePicker } from 'antd'
import locale from 'antd/locale/vi_VN'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type CheckInFilteredProps = {}

const CheckInFiltered: React.FC<CheckInFilteredProps> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (_: any, date: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString())

    if (date) {
      params.set('date', String(date))
    } else {
      params.delete('date')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <ConfigProvider locale={locale}>
      <div className="flex items-center gap-[8px]">
        {/* <DatePicker.RangePicker /> */}
        <DatePicker
          style={{ width: 200 }}
          picker="month"
          onChange={handleChange}
        />
      </div>
    </ConfigProvider>
  )
}

export default CheckInFiltered
