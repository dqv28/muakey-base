import { getCommentsByTaskId } from '@/libs/data'
import React from 'react'
import JobCommentForm from './JobCommentForm'
import JobCommentList from './JobCommentList'

type JobCommentsProps = {
  query?: any
}

const getCommentsByTaskIdRequest = async (taskId: number) => {
  return await getCommentsByTaskId({
    task_id: taskId,
  })
}

const JobComments: React.FC<JobCommentsProps> = async ({ query }) => {
  const comments = await getCommentsByTaskIdRequest(query?.taskId)

  return (
    <div className="mt-[24px]">
      <div className="text-[12px] font-[500] text-[#42b814]">BÌNH LUẬN</div>
      <div className="mt-[16px]">
        <JobCommentForm options={{ taskId: query?.taskId }} />
      </div>
      <div className="mt-[16px]">
        <JobCommentList dataSource={comments} />
      </div>
    </div>
  )
}

export default JobComments
