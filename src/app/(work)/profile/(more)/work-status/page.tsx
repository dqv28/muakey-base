import React from 'react'
import WorkLeaveHistoryCard from './components/work-leave-history-card'
import WorkPauseHistoryCard from './components/work-pause-history-card'
import WorkStatusCard from './components/work-status-card'

const WorkStatusPage: React.FC = () => {
  return (
    <div className="no-scroll h-[calc(100vh-87px)] !space-y-[16px] overflow-y-auto">
      <WorkStatusCard title="Tình trạng việc làm" />

      <WorkPauseHistoryCard title="Lịch sử tạm nghỉ" />

      <WorkLeaveHistoryCard title="Lịch sử nghỉ việc" />
    </div>
  )
}

export default WorkStatusPage
