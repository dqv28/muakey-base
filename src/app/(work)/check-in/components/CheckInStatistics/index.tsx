import { Col, Divider, Row } from 'antd'
import React from 'react'

type CheckInDataType = {
  title?: React.ReactNode
  value?: string | number
}

type CheckInStatisticsProps = {
  items?: CheckInDataType[]
}

const CheckInStatistics: React.FC<CheckInStatisticsProps> = ({ items }) => {
  console.log(items)
  return (
    <div className="bg-[#fff] p-[16px]">
      <div className="text-center text-[14px] font-[500]">
        TỔNG HỢP NGÀY CÔNG
      </div>
      <Divider className="!my-[12px]" />

      <Row gutter={16}>
        {items &&
          items.map((item) => (
            <Col span={4} key={item.value}>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#00000073]">{item.title}</span>
                <span>{item.value}</span>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default CheckInStatistics
