'use client'

import { useAsyncEffect } from '@/libs/hook'
import React, { useState } from 'react'
import WorkflowStatisticsFiltered from './WorkflowStatisticsFiltered'
import WorkflowStatisticsTable from './WorkflowStatisticsTable'
import { getKpiAction } from './action'

type WorkflowStatisticsProps = {
  workflowId: number
  params?: any
}

const WorkflowStatistics: React.FC<WorkflowStatisticsProps> = ({
  workflowId,
  params,
}) => {
  const [statistics, setStatistics] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await getKpiAction({
      ...params,
      workflow_id: workflowId,
    })

    setStatistics(res)
  }, [])

  return (
    <div className="px-[16px] pb-[24px] pt-[12px]">
      <div className="mb-[12px] flex items-center justify-between gap-[24px] text-[24px]">
        <span className="font-[500]">Thống kê</span>
        <WorkflowStatisticsFiltered />
      </div>
      <WorkflowStatisticsTable
        statistics={statistics}
        loading={statistics?.length <= 0}
      />
    </div>
  )
}

export default WorkflowStatistics
