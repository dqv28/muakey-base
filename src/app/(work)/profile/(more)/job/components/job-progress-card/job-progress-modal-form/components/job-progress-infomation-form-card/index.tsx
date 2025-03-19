import { Card, Form, Input, Select } from 'antd'
import React from 'react'

export type JobProgressInfomationFormCardProps = {
  title?: string
}

const JobProgressInfomationFormCard: React.FC<
  JobProgressInfomationFormCardProps
> = ({ title }) => {
  const departmentOptions = [
    {
      label: 'Phòng nhân sự',
      value: '1',
    },
    {
      label: 'Phòng code',
      value: '2',
    },
    {
      label: 'Phòng kế toán',
      value: '3',
    },
  ]

  const staffTypeOptions = [
    {
      label: 'Fulltime',
      value: 'fulltime',
    },
    {
      label: 'Parttime',
      value: 'parttime',
    },
  ]
  return (
    <Card>
      <div className="mb-[16px] text-[14px] leading-[22px] font-[600]">
        {title}
      </div>

      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Nhân sự"
          name="full_name"
        >
          <Input placeholder="Nhập" disabled />
        </Form.Item>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Vị trí cũ"
          name="old_position"
        >
          <Input placeholder="Nhập" disabled />
        </Form.Item>
      </div>

      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Phòng ban mới"
          name="new_department"
          initialValue={departmentOptions[0].value}
        >
          <Select options={departmentOptions} />
        </Form.Item>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Vị trí mới"
          name="new_position"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
      </div>

      <Form.Item
        className="mb-0! flex-1"
        label="Phân loại nhân sự mới"
        name="new_staff_type"
        initialValue={staffTypeOptions[0].value}
      >
        <Select options={staffTypeOptions} />
      </Form.Item>
    </Card>
  )
}

export default JobProgressInfomationFormCard
