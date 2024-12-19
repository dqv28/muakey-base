'use client'

import { Col, Row } from '@/ui'
import dynamic from 'next/dynamic'
import React from 'react'

const WorkflowCard = dynamic(() => import('./WorkflowCard'), {
  ssr: false,
})

type WorkflowCardListProps = {
  items?: any[]
  options?: any
}

const WorkflowCardList: React.FC<WorkflowCardListProps> = ({
  items,
  options,
}) => {
  return (
    <Row gutter={[24, 24]} className="pb-[24px]">
      {(items || []).map((workflow: any, index: number) => (
        <Col span={6} key={index}>
          <WorkflowCard
            workflow={workflow}
            total={{
              task: workflow.totalTask,
              successTask: workflow.totalSuccessTask,
              failedTask: workflow.totalFailedTask,
            }}
            options={options}
          />
        </Col>
      ))}
    </Row>
  )
}

export default WorkflowCardList
