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
        'flex flex-col items-center justify-center border-b py-[12px] font-[500]',
        className,
      )}
    >
      <div className="text-[14px]">{title}</div>
      <div className="text-[24px]">{subTitle}</div>
    </div>
  )
}

export default StatisticsColHeader
