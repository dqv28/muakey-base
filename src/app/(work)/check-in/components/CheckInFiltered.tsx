'use client'

import { DatePicker } from 'antd'
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
    <div>
      <DatePicker
        style={{ width: 160 }}
        picker="month"
        placeholder="Chọn tháng"
        onChange={handleChange}
      />
    </div>
  )
}

export default CheckInFiltered
