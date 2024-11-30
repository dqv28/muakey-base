import { getKpi } from '@/libs/data'
import { Table, TableProps } from 'antd'
import React from 'react'
import WorkflowStatisticsFiltered from './WorkflowStatisticsFiltered'

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

  const stageColumns: TableProps['columns'] = Object.keys(statistics?.[0] || {})
    .filter((s: any) => s !== 'id')
    .map((k: string) => ({
      title: k,
      dataIndex: k,
    }))

  return (
    <div className="px-[16px] pb-[24px] pt-[12px]">
      <div className="mb-[12px] flex items-center justify-between gap-[24px] text-[24px]">
        <span className="font-[500]">Thống kê</span>
        <WorkflowStatisticsFiltered />
      </div>
      <Table columns={stageColumns} dataSource={statistics} />
    </div>
  )
}

export default WorkflowStatistics
