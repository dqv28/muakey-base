import { getAccounts } from '@/libs/data'
import { getSchedule } from '@/libs/statistics'
import { getWeek } from '@/libs/utils'
import React from 'react'
import PageHeader from './component/PageHeader'
import StatisticsFiltered from './component/statistics-filtered'
import StatisticsSchedule from './component/statistics-schedule'

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
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader />

      <div className="p-[16px]">
        <div className="h-[calc(100vh-101px)] overflow-hidden rounded-[16px] border bg-[#fff]">
          <StatisticsFiltered members={accounts} />
          <div className="overflow-x-auto">
            <StatisticsSchedule
              options={{
                account_id: searchParams?.mid || '',
                dw: searchParams?.dw || '',
                schedule,
                accounts,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage
