'use client'

import { Tabs, TabsProps } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type StatisticsTabsProps = TabsProps & {}

const StatisticsTabs: React.FC<StatisticsTabsProps> = (props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleChange = (activeKey: string) => {
    const query = new URLSearchParams(searchParams)
    query.set('cate', activeKey)

    router.push(`?${String(query)}`)
  }

  return (
    <Tabs
      className="leading-none"
      tabBarStyle={{
        marginBottom: 0,
      }}
      onChange={handleChange}
      {...props}
    />
  )
}

export default StatisticsTabs
