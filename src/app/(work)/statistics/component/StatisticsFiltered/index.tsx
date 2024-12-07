'use client'

import { Select } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type StatisticsFilteredProps = {
  members?: any[]
  workflows?: any[]
}

const StatisticsFiltered: React.FC<StatisticsFilteredProps> = ({
  members,
  workflows,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleChange = (value: any) => {
    const query = new URLSearchParams(searchParams)

    if (value) {
      query.set('m', value)
    } else {
      query.delete('m')
    }

    router.push(`?${String(query)}`)
  }

  const memberOptions = members?.map((m: any) => ({
    label: m?.full_name || m?.username,
    value: m?.full_name || m?.username,
  }))

  const workflowOptions = workflows?.map((w: any) => ({
    label: w?.name,
    value: w?.name,
  }))

  return (
    <div className="flex items-center gap-[8px]">
      <Select
        placeholder="Quy trình"
        allowClear
        style={{ width: 200 }}
        options={workflowOptions}
      />
      <Select
        placeholder="Thành viên"
        allowClear
        style={{ width: 160 }}
        options={memberOptions}
        onChange={handleChange}
      />
    </div>
  )
}

export default StatisticsFiltered
