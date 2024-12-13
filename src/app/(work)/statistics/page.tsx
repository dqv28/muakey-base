import React from 'react'
import PageHeader from './component/PageHeader'
import StatisticsSchedule from './component/StatisticsSchedule'

const StatisticsPage: React.FC<any> = async (prop: { searchParams: any }) => {
  const searchParams = await prop.searchParams

  return (
    <div className="h-[100vh]">
      <PageHeader
        params={{
          categoryId: searchParams?.cate || 2,
        }}
      />

      <div className="h-[calc(100vh-68px)] overflow-auto">
        <StatisticsSchedule
          options={{
            account_id: searchParams?.mid || '',
            dw: searchParams?.dw || '',
          }}
        />
      </div>
    </div>
  )
}

export default StatisticsPage
