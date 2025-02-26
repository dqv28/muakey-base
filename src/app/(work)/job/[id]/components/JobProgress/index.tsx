'use client'

import { Tooltip } from 'antd'
import clsx from 'clsx'
import React from 'react'

type Step = {
  name?: string
  status?: 'pending' | 'completed' | 'failed'
}

type JobProgressProps = {
  steps?: Step[]
}

const JobProgress: React.FC<JobProgressProps> = ({ steps = [] }) => {
  const arrowClassName =
    "before:absolute before:-right-[4px] before:bottom-0 before:top-0 before:border-b-[14px] before:border-l-[4px] before:border-t-[14px] before:border-b-transparent before:border-t-transparent before:content-[''] before:z-20 after:absolute after:-right-[6px] after:bottom-0 after:top-0 after:border-b-[14px] after:border-l-[5px] after:border-t-[14px] after:border-b-transparent after:border-t-transparent after:content-[''] after:z-10 after:border-l-[#fff] after:z-10"

  return (
    <div className="mt-[16px] flex w-full items-center gap-[1px] text-[12px] leading-none">
      {steps?.map((step: any, index) => (
        <Tooltip
          className="cursor-default"
          key={index}
          placement="bottom"
          title={step?.name}
        >
          <div
            className={clsx(
              'relative h-[28px] flex-1 p-[8px] text-center font-[500] text-[#fff]',
              !step?.status && 'bg-[#E5E5E5] before:border-l-[#E5E5E5]',
              {
                [arrowClassName]: index !== steps.length - 1,
                'bg-[#45AAF7] before:border-l-[#45AAF7]':
                  step?.status === 'pending',
                'bg-[#42b814] before:border-l-[#42b814]':
                  step?.status === 'completed',
                'bg-[#c34343] before:border-l-[#c34343]':
                  step?.status === 'failed',
              },
            )}
          >
            <span className="line-clamp-1">{step?.status && step?.name}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

export default JobProgress
