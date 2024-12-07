import { getReportStatistics } from '@/libs/statistics'
import React from 'react'
import PageHeader from './component/PageHeader'
import StatisticsTable from './component/StatisticsTable'

const StatisticsPage: React.FC<any> = async (prop: { searchParams: any }) => {
  const searchParams = await prop.searchParams

  const reportStatistics = await getReportStatistics({
    category_id: searchParams?.cate || 2,
  })

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader
        params={{
          categoryId: searchParams?.cate || 2,
        }}
      />

      <div className="h-[calc(100vh-72px)] overflow-auto p-[16px]">
        <StatisticsTable dataSource={reportStatistics} />
      </div>
    </div>
  )
}

export default StatisticsPage
