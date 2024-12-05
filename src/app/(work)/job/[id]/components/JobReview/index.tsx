import { abbreviateNumber, convertRelativeTime, getVideoId } from '@/libs/utils'
import { OpenOutlined } from '@/ui/icons'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Link from 'next/link'
import React from 'react'

type JobReviewProps = {
  task?: any
}

const JobReview: React.FC<JobReviewProps> = ({ task }) => {
  const videoId = getVideoId(String(task?.link_youtube))

  return (
    <div className="mb-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <div className="mb-[12px] font-[600] text-[#888] text-[13px]">SẢN PHẨM</div>
      <iframe
        className="size-full"
        src={`//www.youtube.com/embed/${videoId}`}
      />
      <div className="!mt-[16px] flex items-center justify-between gap-[12px] text-nowrap">
        <div className="flex items-center gap-[12px]">
          <div>
            <Tooltip title="Lượt xem">
              <EyeOutlined /> {abbreviateNumber(task?.view_count)}
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Lượt thích">
              <LikeOutlined /> {abbreviateNumber(task?.like_count)}
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Bình luận">
              <MessageOutlined /> {abbreviateNumber(task?.comment_count)}
            </Tooltip>
          </div>
          <Link
            className="text-[#267cde]"
            href={task?.link_youtube}
            target="_blank"
          >
            <Tooltip title="Xem video trong tab mới">
              <OpenOutlined className="mt-[0.2em] text-[20px]" />
            </Tooltip>
          </Link>
        </div>

        <span>{convertRelativeTime(task?.date_posted)}</span>
      </div>
    </div>
  )
}

export default JobReview
