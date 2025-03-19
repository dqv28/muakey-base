import { Card, Form, Input } from 'antd'
import React from 'react'

export type JobProgressNewInfomationFormCardProps = {
  title?: string
}

const JobProgressNewInfomationFormCard: React.FC<
  JobProgressNewInfomationFormCardProps
> = ({ title }) => {
  return (
    <Card>
      <div className="mb-[16px] text-[14px] leading-[22px] font-[600]">
        {title}
      </div>

      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Lương cơ bản"
          name="basic_salary"
        >
          <Input placeholder="Nhập" />
        </Form.Item>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Phụ cấp đi lại"
          name="travel_allowance"
        >
          <Input placeholder="Nhập" />
        </Form.Item>
      </div>

      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Phụ cấp ăn uống"
          name="food_allowance"
        >
          <Input placeholder="Nhập" />
        </Form.Item>

        <Form.Item className="mb-[16px]! flex-1" label="Thưởng, KPI" name="kpi">
          <Input placeholder="Nhập" />
        </Form.Item>
      </div>

      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-0! flex-1"
          label="BHXH, BHYT, BHTN do công ty đóng (21,5%)"
          name="insurance"
        >
          <Input placeholder="Nhập" disabled />
        </Form.Item>

        <Form.Item
          className="mb-0! flex-1"
          label="BHXH, BHYT, BHTN do NLĐ đóng (10,5%)"
          name="insurance_employee"
        >
          <Input placeholder="Nhập" disabled />
        </Form.Item>
      </div>

      <div className="mt-[16px] flex items-center gap-[16px]">
        <Form.Item
          className="mb-0! flex-1"
          label="Lương Gross (Lương sau khi cộng BHXH, BHYT, BHTN)"
          name="gross_salary"
        >
          <Input placeholder="Nhập" disabled />
        </Form.Item>

        <Form.Item className="mb-0! flex-1" label="Lương Net" name="net_salary">
          <Input placeholder="Nhập" disabled />
        </Form.Item>
      </div>
    </Card>
  )
}

export default JobProgressNewInfomationFormCard
