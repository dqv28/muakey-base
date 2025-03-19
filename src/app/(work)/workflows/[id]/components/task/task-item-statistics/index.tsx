import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import React from 'react'

type TaskItemStatisticsProps = {
  view?: number | string
  like?: number | string
  comment?: number | string
  date?: string
}

const TaskItemStatistics: React.FC<TaskItemStatisticsProps> = ({
  view,
  like,
  comment,
  date,
}) => {
  return (
    <div className="mt-[16px]! flex items-center justify-between gap-[12px] text-nowrap text-[#fff]">
      <div className="flex items-center gap-[12px]">
        <div>
          <EyeOutlined /> {view}
        </div>
        <div>
          <LikeOutlined /> {like}
        </div>
        <div>
          <MessageOutlined /> {comment}
        </div>
      </div>

      <span>{date}</span>
    </div>
  )
}

export default TaskItemStatistics
