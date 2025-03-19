import { Col, Row } from 'antd'
import React from 'react'
import WorkflowCard from './WorkflowCard'

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
