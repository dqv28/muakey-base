import { abbreviateNumber, convertRelativeTime, getVideoId } from '@/libs/utils'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import React from 'react'

type JobReviewProps = {
  task?: any
}

const JobReview: React.FC<JobReviewProps> = ({ task }) => {
  const videoId = getVideoId(String(task?.link_youtube))
  return (
    <div className="mt-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <iframe className='size-full' src={`//www.youtube.com/embed/${videoId}`} />
      <div className="!mt-[16px] flex items-center justify-between gap-[12px] text-nowrap">
        <div className='flex items-center gap-[12px]'>
          <div>
            <EyeOutlined /> {abbreviateNumber(task?.view_count)}
          </div>
          <div>
            <LikeOutlined /> {abbreviateNumber(task?.like_count)}
          </div>
          <div>
            <MessageOutlined /> {abbreviateNumber(task?.comment_count)}
          </div>
        </div>

        <span>{convertRelativeTime(task?.date_posted)}</span>
      </div>
    </div>
  )
}

export default JobReview
