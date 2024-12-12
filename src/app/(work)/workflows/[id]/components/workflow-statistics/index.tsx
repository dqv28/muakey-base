import { getKpi } from '@/libs/data'
import React from 'react'
import WorkflowStatisticsFiltered from './WorkflowStatisticsFiltered'
import WorkflowStatisticsTable from './WorkflowStatisticsTable'

type WorkflowStatisticsProps = {
  workflowId: number
  params?: any
}

const WorkflowStatistics: React.FC<WorkflowStatisticsProps> = async ({
  workflowId,
  params,
}) => {
  const statistics = await getKpi({
    ...params,
    workflow_id: workflowId,
  })

  return (
    <div className="px-[16px] pb-[24px] pt-[12px]">
      <div className="mb-[12px] flex items-center justify-between gap-[24px] text-[24px]">
        <span className="font-[500]">Thống kê</span>
        <WorkflowStatisticsFiltered />
      </div>
      <WorkflowStatisticsTable statistics={statistics} />
    </div>
  )
}

export default WorkflowStatistics
