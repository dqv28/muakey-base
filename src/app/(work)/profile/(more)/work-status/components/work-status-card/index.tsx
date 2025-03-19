import { Button, Card, CardProps } from 'antd'
import React from 'react'
import WorkLeaveModalForm from './WorkLeaveModalForm'
import WorkPauseModalForm from './WorkPauseModalform'

export type WorkStatusCardProps = CardProps & {
  title?: string
}

const WorkStatusCard: React.FC<WorkStatusCardProps> = ({ title, ...props }) => {
  return (
    <Card
      classNames={{
        body: '!space-y-[16px]',
      }}
      {...props}
    >
      <div className="text-[20px] leading-[28px] font-[500]">{title}</div>

      <div className="flex items-center gap-[16px]">
        <WorkPauseModalForm>
          <Button block>Kích hoạt trạng thái tạm nghỉ</Button>
        </WorkPauseModalForm>
        <WorkLeaveModalForm>
          <Button danger block>
            Thôi việc nhân sự
          </Button>
        </WorkLeaveModalForm>
      </div>
    </Card>
  )
}

export default WorkStatusCard
