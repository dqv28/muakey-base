import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import ProfileContactModalForm from './ProfileContactModalForm'
import ProfileContactTable from './ProfileContactTable'

type ProfileContactCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  items?: any[]
  options?: any
}

const ProfileContactCard: React.FC<ProfileContactCardProps> = ({
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
          <ProfileContactModalForm initialValues={options}>
            <Button icon={<PlusOutlined />} type="primary">
              Thêm mới
            </Button>
          </ProfileContactModalForm>
        )}
      </div>

      <ProfileContactTable
        dataSource={items}
        pagination={false}
        options={options}
      />
    </Card>
  )
}

export default ProfileContactCard
