import { getMe } from '@/libs/data'
import React from 'react'
import JobInfomationCard from './components/job-infomation-card'
import JobProgressCard from './components/job-progress-card'
import JobSalaryCard from './components/job-salary-card'

const JobPage: React.FC = async () => {
  const userAsJob = await getMe({
    include: 'profile',
  })

  return (
    <div className="no-scroll h-[calc(100vh-87px)] !space-y-[16px] overflow-y-auto">
      <JobInfomationCard title="Thông tin công việc" job={userAsJob} />

      <JobSalaryCard title="Thành phần lương" data={userAsJob} />

      <JobProgressCard title="Lịch sử phát triển sự nghiệp" />
    </div>
  )
}

export default JobPage
