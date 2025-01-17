'use client'

import { Col, List, Row, Skeleton } from 'antd'
import { times } from 'lodash'
import React from 'react'

const WorkflowListSkeleton: React.FC<any> = (props) => (
  <List
    className="divide-y divide-[#DDDDDD] pb-[40px]"
    dataSource={times(10, () => String)}
    renderItem={() => (
      <>
        <div className="flex items-center gap-[12px] py-[16px]">
          <Skeleton.Avatar size={36} active />
          <Skeleton.Node style={{ height: 18, width: 185 }} active />
        </div>
        <Row gutter={24}>
          {times(4, () => (
            <Col span={6}>
              <div className="aspect-[378/200] h-[200px] rounded-[8px] bg-[#fff] p-[20px]">
                <Skeleton active />
              </div>
            </Col>
          ))}
        </Row>
      </>
    )}
    {...props}
  />
)

export default WorkflowListSkeleton
