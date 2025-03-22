import dayjs from 'dayjs'
import React from 'react'

type JobOverViewProps = {
  task?: any
  members?: any[]
  currentStage?: string
}

const JobOverView: React.FC<JobOverViewProps> = ({
  task,
  members,
  currentStage,
}) => {
  return (
    <div className="space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px] text-[13px]">
      <div className="mb-[12px] font-[600] text-[#888]">THÔNG TIN NHIỆM VỤ</div>
      <div>
        Mã nhiệm vụ: <span className="font-[700]">{task?.code}</span>
      </div>
      <div>
        Cập nhật gần nhất lúc {dayjs(task?.updated_at).format('DD/MM/YYYY')}
      </div>
      <div>
        Giai đoạn hiện tại: <span className="font-[700]">{currentStage}</span>
      </div>
      <div>
        Người thực thi giai đoạn:{' '}
        <span className="font-[700]">
          {members?.map((mem: any) => mem?.username)?.join(', ')}
        </span>
      </div>
    </div>
  )
}

export default JobOverView
