import { Divider } from 'antd'
import React from 'react'

type CheckInDataType = {
  title?: React.ReactNode
  value?: string | number
}

type CheckInStatisticsProps = {
  items?: CheckInDataType[]
}

const CheckInStatistics: React.FC<CheckInStatisticsProps> = ({ items }) => {
  return (
    <div className="bg-[#fff] p-[16px]">
      <div className="text-center text-[14px] font-[500]">
        TỔNG HỢP NGÀY CÔNG
      </div>
      <Divider className="!my-[12px]" />

      <div className="flex items-center justify-around gap-[12px]">
        {items &&
          items.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <span className="text-[#00000073]">{item.title}</span>
              <span>{item.value}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CheckInStatistics
