import { getWorkflowCategories } from '@/libs/data'
import { TabsProps } from 'antd'
import React from 'react'
import StatisticsFiltered from './StatisticsFiltered'

const PageHeader: React.FC<{
  params?: any
}> = async ({ params }) => {
  const categories = await getWorkflowCategories()

  const items: TabsProps['items'] = categories?.map((c: any) => ({
    key: c?.id,
    label: c?.name,
  }))

  const category = categories?.find((c: any) => c?.id === +params?.categoryId)

  return (
    <div className="border-b bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">Thống kê</span>
        <StatisticsFiltered
          members={category?.members}
          workflows={category?.workflows}
        />
      </div>
    </div>
  )
}

export default PageHeader
