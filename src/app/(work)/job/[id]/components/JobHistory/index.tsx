import { getTaskHistories } from '@/libs/data'
import { Timeline } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

type JobHistoryProps = {
  taskId: number
}

const JobHistory: React.FC<JobHistoryProps> = async ({ taskId }) => {
  const taskHistories = await getTaskHistories({
    task_id: taskId,
  })

  return (
    <div className="mt-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] pt-[24px]">
      <Timeline
        items={taskHistories?.map((d: any) => ({
          children: (
            <>
              <div>
                <span className="font-[700]">{d?.full_name}</span> đã chuyển
                công việc từ{' '}
                <span className="font-[700]">{d?.name_old_stage}</span> đến{' '}
                <span className="font-[700]">{d?.name_new_stage}</span>
              </div>
              <div className="text-[12px]">
                {dayjs(d?.created_at).format('HH:mm DD-MM-YYYY')}
              </div>
            </>
          ),
        }))}
      />
    </div>
  )
}

export default JobHistory
