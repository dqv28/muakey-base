import { randomColor } from '@/libs/utils'
import { Card, Progress } from '@/ui'
import { Avatar, Tooltip } from 'antd'
import React from 'react'

type WorkflowCardProps = {
  name?: string
  description?: string
  members?: any[]
  total?: any
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  name,
  description,
  members,
  total,
}) => {
  const completedPercent = (total?.successTask / total?.task) * 100
  const failedPercent = (total?.failedTask / total?.task) * 100

  return (
    <Card className="size-full">
      <div className="text-[16px] font-[400] leading-[20px]">{name}</div>
      <p className="mt-[8px] min-h-[36px] text-[12px] text-[#999]">
        {description || 'Không có mô tả'}
      </p>
      <div className="mt-[16px] space-y-[8px]">
        <Avatar.Group
          max={{
            count: 3,
            style: {
              backgroundColor: '#fde3cf',
              color: '#f56a00',
            },
          }}
        >
          {members &&
            members?.map((mem: any) => (
              <Tooltip key={mem?.id} title={mem?.full_name}>
                <Avatar
                  key={mem?.username}
                  src={mem?.avatar}
                  style={{
                    backgroundColor: randomColor(mem?.full_name || ''),
                    cursor: 'pointer',
                  }}
                >
                  {String(mem?.full_name).charAt(0).toLocaleUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
        </Avatar.Group>
        <Progress
          size={8}
          className="w-full"
          color={['#42b814', '#c34343']}
          percent={[completedPercent, failedPercent]}
        />
        <div className="flex items-center justify-between text-[12px]">
          <span>
            {total?.task || 0} <span className="text-[#999]">Nhiệm vụ</span>
          </span>
          <div className="flex items-center gap-[4px]">
            <span>
              {total?.successTask || 0}{' '}
              <span className="text-[#999]">Hoàn thành</span>
            </span>
            ·
            <span>
              {total?.failedTask || 0}{' '}
              <span className="text-[#999]">Thất bại</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default WorkflowCard
