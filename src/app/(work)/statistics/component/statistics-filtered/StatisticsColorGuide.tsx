import React from 'react'

type ItemType = {
  color: string
  label: string
}

export type StatisticsColorGuideProps = {
  items?: ItemType[]
}

const StatisticsColorGuide: React.FC<StatisticsColorGuideProps> = ({
  items,
}) => {
  return (
    <div className="flex items-center gap-[16px]">
      {items?.map((item) => (
        <div className="flex items-center gap-[8px]" key={item.label}>
          <div
            className="h-[8px] w-[24px] rounded-full"
            style={{
              backgroundColor: item?.color,
            }}
          />
          <span className="text-[14px] leading-[22px]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default StatisticsColorGuide
