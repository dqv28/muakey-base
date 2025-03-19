import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import ProfileEduInfomationModalForm from './ProfileEduInfomationModalForm'
import ProfileEduInfomationTable from './ProfileEduInfomationTable'

export type ProfileEduInfomationCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  items?: any[]
  options?: any
}

const ProfileEduInfomationCard: React.FC<ProfileEduInfomationCardProps> = ({
  title,
  extra,
  items,
  options,
}) => {
  return (
    <Card
      classNames={{
        body: 'p-[24px]! space-y-[16px]',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px] leading-[28px] font-[500]">{title}</div>
        {extra || (
          <ProfileEduInfomationModalForm
            initialValues={{
              id: options?.userId,
            }}
          >
            <Button icon={<PlusOutlined />} type="primary">
              Thêm mới
            </Button>
          </ProfileEduInfomationModalForm>
        )}
      </div>

      <ProfileEduInfomationTable
        dataSource={items}
        pagination={false}
        options={options}
      />
    </Card>
  )
}

export default ProfileEduInfomationCard
