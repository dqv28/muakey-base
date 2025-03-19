import { Card, CardProps } from 'antd'
import React from 'react'
import WorkLeaveHistoryTable from './WorkLeaveHistoryTable'

export type WorkLeaveHistoryCardProps = CardProps & {
  title?: string
}

const WorkLeaveHistoryCard: React.FC<WorkLeaveHistoryCardProps> = ({
  title,
  ...props
}) => {
  return (
    <Card classNames={{ body: '!space-y-[16px]' }} {...props}>
      <div className="text-[20px] leading-[28px] font-[500]">{title}</div>

      <WorkLeaveHistoryTable />
    </Card>
  )
}

export default WorkLeaveHistoryCard
