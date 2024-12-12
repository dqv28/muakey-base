import { randomColor } from '@/libs/utils'
import { Avatar, Tooltip } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'

type StatisticsCardProps = {
  title?: string
  user?: any
  expire?: Date
  status?: 'in_progress' | 'completed' | 'failed'
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  user,
  expire,
  status,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-[12px] rounded-[4px] border p-[12px] text-[13px] leading-none',
        status === 'in_progress' || {
          'border-[#009c37] bg-[#d9f8e5]': status === 'completed',
          'border-[#c34343] bg-[#ffeded]': status === 'failed',
        },
      )}
    >
      <Tooltip title={title}>
        <div className="line-clamp-2 font-[500] leading-[16px]">{title}</div>
      </Tooltip>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Avatar
            src={user?.avatar}
            size={16}
            style={{ backgroundColor: randomColor(String(user?.fullName)) }}
          >
            {String(user?.fullName).charAt(0).toUpperCase()}
          </Avatar>
          <span>{user?.fullName}</span>
        </div>
        <div>{expire && dayjs(new Date(expire)).format('HH:mm')}</div>
      </div>
    </div>
  )
}

export default StatisticsCard
