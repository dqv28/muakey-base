import { getAccounts } from '@/libs/data'
import React from 'react'
import StatisticsFiltered from './statistics-filtered'

const PageHeader: React.FC = async () => {
  const accounts = await getAccounts()

  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">Thống kê</span>
        <StatisticsFiltered members={accounts} />
      </div>
    </div>
  )
}

export default PageHeader
