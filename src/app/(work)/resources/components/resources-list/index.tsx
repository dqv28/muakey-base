import { ResourceModalForm } from '@/components'
import { randomColor } from '@/libs/utils'
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Avatar, Col, Empty, Row } from 'antd'
import React from 'react'
import ResourcesCard from '../resources-card'
import ResourcesDetailModal, {
  ResourcesDetailModalProps,
} from '../resources-detail-modal'

export type ResourcesListProps = {
  resources?: any
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  if (!resources || resources?.length <= 0) {
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

        const resourcesAsContent: ResourcesDetailModalProps['resources'] = [
          ...(item.type === 'text'
            ? [
                {
                  label: 'Nội dung',
                  value: (
                    <span
                      className="line-clamp-5"
                      dangerouslySetInnerHTML={{ __html: item?.text_content }}
                    />
                  ),
                },
              ]
            : [
                {
                  label: 'Tài khoản',
                  value: item.account,
                  copyable: true,
                },
                {
                  label: 'Mật khẩu',
                  value: item.password,
                  copyable: true,
                },
                {
                  label: 'Ghi chú',
                  value: (
                    <span
                      className="line-clamp-5 inline-block flex-1"
                      dangerouslySetInnerHTML={{ __html: item?.note }}
                    />
                  ),
                },
              ]),
          {
            label: 'Thời gian hết hạn',
            value: (
              <div className="flex items-center gap-[8px] text-[#F5222D]">
                <ClockCircleOutlined />
                <span>Còn 23 ngày</span>
              </div>
            ),
          },
          {
            label: 'Quyền truy cập tài liệu',
            value: item.members,
          },
        ]

        return (
          <Col key={item?.id} span={6}>
            <ResourcesCard
              title={
                <div className="flex items-center gap-[8px]">
                  <Avatar
                    src={item.thumbnail}
                    shape="square"
                    style={{
                      backgroundColor: randomColor(String(item?.name || '')),
                    }}
                  >
                    {item?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <span className="text-[16px] font-[700] leading-[24px]">
                    {item?.name}
                  </span>
                </div>
              }
              extra={
                <div className="flex items-center gap-[16px]">
                  <ResourcesDetailModal
                    resources={resourcesAsContent}
                    title={
                      <div className="flex items-center gap-[8px]">
                        <Avatar
                          src={item?.thumbnail}
                          shape="square"
                          style={{
                            backgroundColor: randomColor(
                              String(item?.name || ''),
                            ),
                          }}
                        >
                          {item?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <span className="text-[16px] font-[700] leading-[24px]">
                          {item.name}
                        </span>
                      </div>
                    }
                    initialValues={item}
                  >
                    <EyeOutlined className="text-[#1677ff]" />
                  </ResourcesDetailModal>
                  <ResourceModalForm initialValues={item} mode="edit">
                    <EditOutlined />
                  </ResourceModalForm>
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
