import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import ProfileWorkHistoryModalForm from './ProfileWorkHistoryModalForm'
import ProfileWorkHistoryTable from './ProfileWorkHistoryTable'

type ProfileWorkHistoryCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  items?: any[]
  options?: any
}

const ProfileWorkHistoryCard: React.FC<ProfileWorkHistoryCardProps> = ({
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
          <ProfileWorkHistoryModalForm initialValues={options}>
            <Button icon={<PlusOutlined />} type="primary">
              Thêm mới
            </Button>
          </ProfileWorkHistoryModalForm>
        )}
      </div>

      <ProfileWorkHistoryTable
        dataSource={items}
        pagination={false}
        options={options}
      />
    </Card>
  )
}

export default ProfileWorkHistoryCard
