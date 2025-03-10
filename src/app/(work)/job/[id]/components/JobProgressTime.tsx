'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, List, Progress } from 'antd'
import clsx from 'clsx'
import React from 'react'

type JobProgressTimeProps = {
  stages?: any
  total?: number
  timestamp?: string
}

const JobProgressTime: React.FC<JobProgressTimeProps> = ({
  stages,
  total,
  timestamp,
}) => {
  return (
    <div className="mt-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <div className="flex items-center justify-between gap-[24px] text-[12px] text-[#888]">
        <span className="font-[500]">TỔNG THỜI GIAN</span>
        <span>
          Đã sử dụng <span className="text-[#000]">{total}h</span>
        </span>
      </div>
      <Progress className="!m-0" percent={100} showInfo={false} />
      <div className="text-[12px] font-[500]">TIẾN TRÌNH CỦA CÁC GIAI ĐOẠN</div>
      <List
        dataSource={stages}
        renderItem={(stage: any, index: number) => {
          return (
            <List.Item className="py-[12px]">
              <div className="flex w-full items-start gap-[12px]">
                <Avatar
                  className={clsx('!text-[12px]', {
                    '!bg-[#42b814]': stage?.status === 'completed',
                    '!bg-[#c34343]': stage?.status === 'failed',
                    '!bg-[#45AAF7]': stage?.status === 'pending',
                  })}
                  shape="circle"
                  size={24}
                >
                  {index + 1}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-[24px]">
                    <span className="font-[500]">{stage?.name}</span>
                    <span className="text-[12px] text-[#aaa]">{timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between gap-[24px] text-[#aaa]">
                    <span className="text-[12px]">
                      Thời hạn: {stage?.expired_after_hours || 0}h
                    </span>
                    <span className="text-[12px]">
                      Thực tế:{' '}
                      <span className="font-[500] text-[#000]">
                        {Number(stage?.hours + stage?.minutes / 60).toFixed(2)}h
                      </span>
                    </span>
                  </div>
                  {stage?.account && (
                    <div className="mt-[4px] flex items-center gap-[8px]">
                      <Avatar
                        className="!text-[10px]"
                        src={stage?.account?.avatar}
                        size={20}
                        shape="circle"
                        style={{
                          backgroundColor: randomColor(
                            String(stage?.account?.full_name),
                          ),
                        }}
                        alt={stage?.account?.full_name}
                      >
                        {String(stage?.account?.full_name)
                          .charAt(0)
                          .toLocaleUpperCase()}
                      </Avatar>
                      <span className="text-[12px]">
                        {stage?.account?.full_name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </List.Item>
          )
        }}
        split
      />
    </div>
  )
}

export default JobProgressTime
