'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Table } from 'antd'
import React, { useState } from 'react'
import { getTaskReportsAction } from './action'

type WorkflowDocsTableProps = {
  stageId: number
  stageName: string
}

const WorkflowDocsTable: React.FC<WorkflowDocsTableProps> = ({ stageId, stageName }) => {
  const [taskReports, setTaskReports] = useState<any[]>([])

  useAsyncEffect(async () => {
    const data = await getTaskReportsAction(stageId)

    setTaskReports(data)
  }, [stageId])

  const columnKeys = taskReports?.reduce((prev: any, current: any) => {
    const prevKeyLength = Object.keys(prev)
    const currentKeyLength = Object.keys(current)

    return prevKeyLength > currentKeyLength ? prev : current
  }, {})

  const columns = Object.keys(columnKeys || {})?.map(
    (report: string) => ({
      title: report.toLocaleUpperCase(),
      dataIndex: report.toLocaleLowerCase(),
    }),
  )

  const data: any[] = taskReports?.map((report: any) => {
    const newReport = Object.entries(report).map(([key, value]: any) => [
      String(key).toLocaleLowerCase(),
      value,
    ])

    return Object.fromEntries(newReport)
  })

  return taskReports.length > 0 && <>
  <div className='font-[500] ml-[24px] my-[16px]'>Giai đoạn: {String(stageName).toLocaleUpperCase()}</div>
    <Table columns={columns} dataSource={data} />
  </>
}

export default WorkflowDocsTable
