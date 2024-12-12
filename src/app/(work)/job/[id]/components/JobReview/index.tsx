'use client'

import getYoutubeVideoId, {
  abbreviateNumber,
  convertRelativeTime,
} from '@/libs/utils'
import { OpenOutlined } from '@/ui/icons'
import {
  EyeOutlined,
  LikeOutlined,
  LoadingOutlined,
  MessageOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { YouTubeEmbed } from '@next/third-parties/google'
import { Tooltip } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { refreshDataAction } from './action'

type JobReviewProps = {
  task?: any
  query?: any
}

const JobReview: React.FC<JobReviewProps> = ({ task, query }) => {
  const [loading, setLoading] = useState(false)
  const videoId = getYoutubeVideoId(String(task?.link_youtube))

  const handleRefresh = async () => {
    setLoading(true)

    try {
      await refreshDataAction({
        workflow_id: query?.workflowId,
      })
      setLoading(false)

      if (typeof window !== undefined) {
        window.location.reload()
      }
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  return (
    <div className="mb-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <div className="mb-[12px] flex items-center justify-between gap-[24px] text-[13px] text-[#888]">
        <span className="font-[600]">SẢN PHẨM</span>
        {loading ? (
          <LoadingOutlined />
        ) : (
          <ReloadOutlined
            className="cursor-pointer text-[12px] text-[#267cde]"
            onClick={handleRefresh}
          />
        )}
      </div>
      <YouTubeEmbed videoid={videoId || ''} />
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
