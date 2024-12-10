import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { times } from 'lodash'
import React from 'react'
import StatisticsColHeader from './StatisticsColHeader'

type StatisticsScheduleProps = {}

const StatisticsSchedule: React.FC<StatisticsScheduleProps> = (props) => {
  return (
    <Row className="h-full">
      {times(8, (num) => (
        <Col key={num} span={3} className="h-full border-r">
          <StatisticsColHeader />
          <div className="flex items-center justify-center">
            <Button
              className="my-[8px]"
              type="text"
              icon={<PlusOutlined className="text-[10px]" />}
            >
              Thêm công việc
            </Button>
          </div>
          <div className="px-[8px]">{`Cột ${num + 1}`}</div>
        </Col>
      ))}
    </Row>
  )
}

export default StatisticsSchedule
