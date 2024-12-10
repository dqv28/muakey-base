import React from 'react'

type StatisticsColHeaderProps = {}

const StatisticsColHeader: React.FC<StatisticsColHeaderProps> = (props) => {
  return (
    <div className="border-b py-[12px] text-center font-[500]">
      <div className="text-[14px]">T1</div>
      <div className="text-[24px]">10</div>
    </div>
  )
}

export default StatisticsColHeader
