import { Tooltip } from 'antd'
import clsx from 'clsx'
import React from 'react'

type StatisticsCardProps = {
  title?: React.ReactNode
  timestamps?: number
  status?: 'in_progress' | 'completed' | 'failed'
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  status,
  timestamps,
}) => {
  return (
    <div
      className={clsx(
        'flex items-start justify-between gap-[16px] rounded-[4px] border p-[12px] text-[13px] leading-[17px]',
        status === 'in_progress' || {
          'border-[#389E0D] bg-[#F6FFED]': status === 'completed',
          'border-[#CF1322] bg-[#FFF1F0]': status === 'failed',
        },
      )}
    >
      <Tooltip title={title}>
        <div className="line-clamp-2 font-[500]">{title}</div>
      </Tooltip>
      <span className="text-[#0958D9]">{Number(timestamps || 0)}h</span>
    </div>
  )
}

export default StatisticsCard
