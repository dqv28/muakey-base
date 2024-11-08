import { Timeline } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

type JobHistoryProps = {
  dataSource?: any
}

const JobHistory: React.FC<JobHistoryProps> = ({ dataSource }) => {
  return (
    <div className="mt-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[24px]">
      <Timeline
        items={dataSource?.map((d: any) => ({
          children: (
            <div>
              <div>
                <span className="font-[700]">{d?.full_name}</span> đã chuyển
                công việc từ{' '}
                <span className="font-[700]">{d?.name_old_stage}</span> đến{' '}
                <span className="font-[700]">{d?.name_new_stage}</span>
              </div>
              <div className="text-[12px]">
                {dayjs(d?.created_at).format('HH:mm DD-MM-YYYY')}
              </div>
            </div>
          ),
        }))}
      />
    </div>
  )
}

export default JobHistory
