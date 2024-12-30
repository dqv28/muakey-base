import { Col, Divider, Row, Statistic } from 'antd'
import React from 'react'

type CheckInStatisticsProps = {}

type CheckInDataType = {
  title?: React.ReactNode
  value?: string | number
}

const checkInData: CheckInDataType[] = [
  {
    title: 'Công chuẩn',
    value: 26,
  },
  {
    title: 'Công làm việc thực tế',
    value: 0,
  },
  {
    title: 'Nghỉ có hưởng lương',
    value: 0,
  },
  {
    title: 'Nghỉ không hưởng lương',
    value: 0,
  },
  {
    title: 'Tổng OT',
    value: 0,
  },
  {
    title: 'Tổng công hưởng lương',
    value: 0,
  },
]

const CheckInStatistics: React.FC<CheckInStatisticsProps> = (props) => {
  return (
    <div className="bg-[#fff] p-[16px]">
      <div className="text-center text-[14px] font-[500]">
        TỔNG HỢP NGÀY CÔNG
      </div>
      <Divider className="!my-[12px]" />

      <Row gutter={16}>
        {checkInData.map((data) => (
          <Col span={4} key={data.value}>
            <Statistic
              className="flex flex-col items-center justify-center"
              title={data.title}
              value={data.value}
              valueStyle={{
                fontSize: 14,
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CheckInStatistics
