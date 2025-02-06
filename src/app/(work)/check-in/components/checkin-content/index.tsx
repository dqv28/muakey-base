'use client'

import dayjs from 'dayjs'
import React, { useState } from 'react'
import CheckInForm from '../checkin-form'
import CheckInHistoryTable from '../checkin-history-table'
import CheckInTable from '../CheckInTable'

type CheckInContentProps = {
  options?: any
  query?: any
}

const CheckInContent: React.FC<CheckInContentProps> = ({ query, options }) => {
  const [date, setDate] = useState(new Date())

  const { members, day, propose, ...restOptions } = options

  const { type } = query

  const filteredPropose = propose?.filter(
    (p: any) =>
      ['Đăng ký OT', 'Đăng ký nghỉ'].includes(p?.category_name) &&
      p?.status === 'approved',
  )
  const { attendances } = restOptions?.attendances

  const dateStr = String(dayjs(date).format('YYYY-MM-DD'))
  const dateTarget = attendances?.find((a: any) => {
    const dateTargetStr = String(dayjs(a?.checkin).format('YYYY-MM-DD'))

    return dateStr === dateTargetStr
  })

  switch (type) {
    case 'form-request':
      return (
        <CheckInForm
          initialValues={{
            date,
            user: options?.user,
            attendances: dateTarget,
          }}
        />
      )

    case 'table-history':
      return <CheckInHistoryTable options={{ propose, user: options?.user }} />

    default:
      return (
        <CheckInTable
          options={{
            ...restOptions,
            propose: filteredPropose,
            members: members?.filter((mem: any) => mem?.type !== 'department'),
            day: Number(day || 0),
          }}
          scroll={{
            x: 'max-content',
            y: 'calc(100vh - 218px)',
          }}
          pagination={false}
          bordered
          onDateSelect={setDate}
        />
      )
  }
}

export default CheckInContent
