import { Button, Divider } from 'antd'
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
    <div className="rounded-[16px] bg-[#fff] p-[16px]">
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-[500]">Tổng hợp ngày công</span>
        <Button type="primary">Lịch sử yêu cầu</Button>
      </div>
      <Divider className="!my-[12px]" />

      <div className="flex items-center justify-around gap-[12px]">
        {items &&
          items.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <span className="text-[14px] text-[#00000073]">{item.title}</span>
              <span className="text-[24px]">{item.value}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CheckInStatistics
