import { EditOutlined } from '@ant-design/icons'
import { Button, Card, ListProps } from 'antd'
import React from 'react'
import ProfileDeductionList from './ProfileDeductionList'
import ProfileDeductionsModalForm from './ProfileDeductionsModalForm'

export type ProfileDeductionsCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  user?: any
}

const ProfileDeductionsCard: React.FC<ProfileDeductionsCardProps> = ({
  title,
  extra,
  user,
}) => {
  const data: ListProps<any>['dataSource'] = [
    {
      label: 'Mã số thuế',
      value: user?.tax_code || '--',
    },
    {
      label: 'Giảm trừ thuế thu nhập cá nhân',
      value: user?.tax_reduced || '--',
    },
    {
      label: 'Số sổ BHXH',
      value: user?.BHXH || '--',
    },
    {
      label: 'Nơi đăng ký',
      value: user?.place_of_registration || '--',
    },
    {
      label: 'Vùng lương',
      value: user?.salary_scale || '--',
    },
  ]

  return (
    <Card
      classNames={{
        body: 'p-[24px]! space-y-[16px]',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px] leading-[28px] font-[500]">{title}</div>
        {extra || (
          <ProfileDeductionsModalForm initialValues={user}>
            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
          </ProfileDeductionsModalForm>
        )}
      </div>

      <ProfileDeductionList dataSource={data} />
    </Card>
  )
}

export default ProfileDeductionsCard
