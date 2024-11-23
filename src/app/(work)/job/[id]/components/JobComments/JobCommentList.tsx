'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, ConfigProvider, List, ListProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import JobCommentCollapse from './JobCommentCollapse'

type JobCommentListProps = ListProps<any> & {}

const JobCommentList: React.FC<JobCommentListProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          List: {
            emptyTextPadding: 0,
          },
        },
      }}
    >
      <List
        renderItem={(item: any) => (
          <div className="mb-[8px] rounded-[4px] border border-[#eee] bg-[#fafafa] py-[20px] pl-[16px]">
            <div className="flex items-start gap-[20px]">
              <Avatar
                src={item?.avatar}
                style={{ backgroundColor: randomColor(item?.full_name || '') }}
                size={40}
              >
                {String(item?.full_name).charAt(0).toLocaleUpperCase()}
              </Avatar>
              <div className="flex-1">
                <div className="text-[16px] font-[500] text-[#267cde]">
                  {item?.full_name}
                </div>
                <div className="text-[13px] text-[#999]">
                  {dayjs(item?.created_at).format('HH:mm MMM DD, YYYY')}
                </div>

                <div
                  className="mt-[8px]"
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                />

                <JobCommentCollapse comment={item} />
              </div>
            </div>
          </div>
        )}
        locale={{
          emptyText: <></>,
        }}
        {...props}
      />
    </ConfigProvider>
  )
}

export default JobCommentList
