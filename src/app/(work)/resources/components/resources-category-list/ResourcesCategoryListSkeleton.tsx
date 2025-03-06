'use client'

import { Col, Collapse, CollapseProps, Row, Skeleton } from 'antd'
import { times } from 'lodash'

const ResourcesCategoryListSkeleton: React.FC = () => {
  const items: CollapseProps['items'] = times(3, (index) => ({
    key: index,
    label: <Skeleton.Input active />,
    children: (
      <Row gutter={[16, 16]}>
        {times(12, (index) => (
          <Col key={index} span={6}>
            <div className="rounded-[8px] bg-[#fff] p-[20px]">
              <Skeleton active />
            </div>
          </Col>
        ))}
      </Row>
    ),
    extra: <Skeleton.Button active />,
    style: {
      border: 'none',
    },
    styles: {
      header: {
        alignItems: 'center',
        padding: '0 16px 16px',
      },
    },
  }))

  return (
    <div className="h-[calc(100vh-190px)] overflow-y-auto py-[12px]">
      <Collapse
        items={items}
        className="border-none bg-transparent"
        rootClassName="border-none bg-transparent"
        bordered={false}
        defaultActiveKey={times(3, (index) => index)}
        collapsible="icon"
      />
    </div>
  )
}

export default ResourcesCategoryListSkeleton
