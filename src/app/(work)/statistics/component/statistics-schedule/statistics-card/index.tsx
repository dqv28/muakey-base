import { Tooltip } from 'antd'
import clsx from 'clsx'
import React from 'react'

type StatisticsCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  status?: 'in_progress' | 'completed' | 'overdue' | 'completed_late'
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  status,
  extra,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-[16px] rounded-[4px] border p-[12px] text-[13px] leading-[17px]',
        {
          '!bg-[#fff]': status === 'in_progress',
          '!border-[#389E0D] !bg-[#F6FFED]': status === 'completed',
          '!border-[#CF1322] !bg-[#FFF1F0]': status === 'overdue',
          '!border-[#B64FEE] !bg-[#F7E6FF]': status === 'completed_late',
        },
      )}
    >
      <Tooltip title={title}>
        <div className="line-clamp-2 flex-1 font-[500] !text-[#000000D9]">
          {title}
        </div>
      </Tooltip>
      {extra}
    </div>
  )
}

export default StatisticsCard
