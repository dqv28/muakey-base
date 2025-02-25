import { randomColor } from '@/libs/utils'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Avatar, Col, Empty, Row } from 'antd'
import React from 'react'
import ResourcesCard from '../resources-card'

export type ResourcesListProps = {
  resources?: any
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  if (resources?.length <= 0) {
    return <Empty description="Chưa có tài liệu" />
  }

  return (
    <Row gutter={[16, 16]}>
      {resources?.map((item: any) => {
        const body =
          item.type === 'text'
            ? {
                text: {
                  content: item.text_content,
                },
              }
            : {
                account: {
                  name: item.account,
                  password: item.password,
                  note: item.note,
                },
              }

        return (
          <Col key={item.id} span={6}>
            <ResourcesCard
              title={
                <div className="flex items-center gap-[8px]">
                  <Avatar
                    src={item.thumbnail}
                    shape="square"
                    style={{ backgroundColor: randomColor(item.name) }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="text-[16px] font-[700] leading-[24px]">
                    {item.name}
                  </span>
                </div>
              }
              extra={
                <div className="flex items-center gap-[16px]">
                  <EyeOutlined className="text-[#1677ff]" />
                  <EditOutlined />
                </div>
              }
              body={body}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default ResourcesList
