import clsx from 'clsx'
import React from 'react'

type StatisticsColHeaderProps = {
  title?: string
  subTitle?: string
  className?: string
}

const StatisticsColHeader: React.FC<StatisticsColHeaderProps> = ({
  title,
  subTitle,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex h-[70px] flex-col items-center justify-center border-b py-[12px] font-[500]',
        className,
      )}
    >
      <div className="text-[14px] leading-[22px]">{title}</div>
      <div className="text-[14px] leading-[22px]">{subTitle}</div>
    </div>
  )
}

export default StatisticsColHeader
