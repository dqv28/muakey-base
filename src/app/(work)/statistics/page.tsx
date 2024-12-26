import { getAccounts } from '@/libs/data'
import { getSchedule } from '@/libs/statistics'
import { getWeek } from '@/libs/utils'
import React from 'react'
import PageHeader from './component/PageHeader'
import StatisticsSchedule from './component/StatisticsSchedule'

const StatisticsPage: React.FC<any> = async (prop: { searchParams: any }) => {
  const searchParams = await prop.searchParams

  const today = new Date()
  const week = getWeek(searchParams?.dw ? new Date(searchParams?.dw) : today)

  const [schedule, accounts] = await Promise.all([
    getSchedule({
      start: week[0].date,
      end: week[6].date,
    }),
    getAccounts(),
  ])

  return (
    <div className="h-[100vh]">
      <PageHeader />

      <div className="h-[calc(100vh-68px)] overflow-auto">
        <StatisticsSchedule
          options={{
            account_id: searchParams?.mid || '',
            schedule,
            accounts,
          }}
        />
      </div>
    </div>
  )
}

export default StatisticsPage
