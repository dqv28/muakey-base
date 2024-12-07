'use client'

import { ConfigProvider, DatePicker } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import locale from 'antd/locale/vi_VN'

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
      <DatePicker
        style={{ width: 160 }}
        picker="month"
        onChange={handleChange}
      />
    </ConfigProvider>
  )
}

export default CheckInFiltered
