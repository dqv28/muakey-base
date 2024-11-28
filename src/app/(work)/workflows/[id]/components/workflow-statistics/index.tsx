import { getKpi } from '@/libs/data'
import { Table, TableProps } from 'antd'
import React from 'react'

type WorkflowStatisticsProps = {
  workflowId: number
}

const WorkflowStatistics: React.FC<WorkflowStatisticsProps> = async ({
  workflowId,
}) => {
  const statistics = await getKpi({
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
      <div className="mb-[12px] text-[24px]">
        <span className="font-[500]">Thống kê</span>
      </div>
      <Table columns={stageColumns} dataSource={statistics} />
    </div>
  )
}

export default WorkflowStatistics
