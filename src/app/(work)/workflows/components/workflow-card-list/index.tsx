import { Col, Row } from '@/ui'
import Link from 'next/link'
import React from 'react'
import WorkflowCard from './WorkflowCard'

type WorkflowCardListProps = {
  items?: any[]
}

const WorkflowCardList: React.FC<WorkflowCardListProps> = ({ items }) => {
  return (
    <Row gutter={[24, 24]} className="pb-[24px]">
      {(items || []).map((workflow: any, index: number) => (
        <Col span={6} key={index}>
          <Link href={`/workflows/${workflow.id}`}>
            <WorkflowCard
              name={workflow.name}
              description={workflow.description}
              members={workflow.members}
              total={{
                task: workflow.totalTask,
                successTask: workflow.totalSuccessTask,
                failedTask: workflow.totalFailedTask,
              }}
            />
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default WorkflowCardList
