import { getKpi } from '@/libs/data'
import { Table, TableProps } from 'antd'
import React from 'react'

type WorkflowStatisticsProps = Omit<TableProps, 'title'> & {
  title?: React.ReactNode
  workflowId: number
}

const WorkflowStatistics: React.FC<WorkflowStatisticsProps> = async ({
  title,
  workflowId,
  ...rest
}) => {
  const statistics = await getKpi({
    workflow_id: workflowId,
  })

  const stageColumns = Object.keys(statistics?.[0] || {})
    .filter((s: any) => s !== 'id')
    .map((k: string) => ({
      title: k,
      dataIndex: k,
      key: k,
    }))

  return (
    <div className="px-[16px] py-[12px]">
      <div className="mb-[12px] text-[24px] font-[500]">{title}</div>
      <Table columns={stageColumns} dataSource={statistics} {...rest} />
    </div>
  )
}

export default WorkflowStatistics
