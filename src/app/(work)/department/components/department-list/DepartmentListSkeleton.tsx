'use client'

import { Avatar, Col, Row, Skeleton } from 'antd'
import clsx from 'clsx'
import { times } from 'lodash'
import React from 'react'

const DepartmentListSkeleton: React.FC<any> = () => {
  return (
    <Row gutter={[24, 24]}>
      {times(48, () => (
        <Col span={6}>
          <div className="aspect-[384/104] h-[104px] rounded-[4px] bg-[#fff] p-[16px]">
            <div className="flex items-center justify-between gap-[12px]">
              <Skeleton.Node style={{ width: 85, height: 16 }} active />
              <Skeleton.Node style={{ width: 16, height: 16 }} active />
            </div>

            <Avatar.Group className="mt-[16px]">
              {times(4, (num) => (
                <Skeleton
                  className={clsx({
                    '-ml-[16px]': num > 0,
                  })}
                  avatar={{
                    size: 32,
                  }}
                  active
                />
              ))}
            </Avatar.Group>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default DepartmentListSkeleton
