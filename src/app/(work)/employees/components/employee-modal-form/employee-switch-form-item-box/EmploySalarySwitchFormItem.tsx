import { SwitchFormItem } from '@/components'
import { Card, Form, Input } from 'antd'
import React from 'react'

export type EmploySalarySwitchFormItemProps = {
  className?: string
}

const EmploySalarySwitchFormItem: React.FC<EmploySalarySwitchFormItemProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <SwitchFormItem title="Nhập thông tin lương (VND)">
        <div className="space-y-[16px]">
          <Card>
            <div className="mb-[16px] text-[14px] font-[600] leading-[22px]">
              Thành phần lương
            </div>

            <div className="flex items-center gap-[16px]">
              <Form.Item
                className="mb-[16px]! flex-1"
                name="basic_salary"
                label="Lương cơ bản"
              >
                <Input placeholder="Nhập" />
              </Form.Item>
              <Form.Item
                className="mb-[16px]! flex-1"
                name="travel_allowance"
                label="Phụ cấp đi lại"
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </div>

            <div className="flex items-center gap-[16px]">
              <Form.Item
                className="mb-[16px]! flex-1"
                name="food_allowance"
                label="Phụ cấp ăn uống"
              >
                <Input placeholder="Nhập" />
              </Form.Item>
              <Form.Item
                className="mb-[16px]! flex-1"
                name="other_allowance"
                label="Thưởng, KPI"
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </div>

            <div className="flex items-center gap-[16px]">
              <Form.Item
                className="mb-0! flex-1"
                name="insurance_by_company"
                label="BHXH, BHYT, BHTN do công ty đóng (21,5%)"
              >
                <Input placeholder="Nhập" disabled />
              </Form.Item>
              <Form.Item
                className="mb-0! flex-1"
                name="insurance_by_employee"
                label="BHXH, BHYT, BHTN do NLĐ đóng (10,5%)"
              >
                <Input placeholder="Nhập" disabled />
              </Form.Item>
            </div>
          </Card>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-0! flex-1"
              name="gross_salary"
              label="Lương Gross (Lương sau khi cộng BHXH, BHYT, BHTN)"
            >
              <Input placeholder="Nhập" disabled />
            </Form.Item>
            <Form.Item
              className="mb-0! flex-1"
              name="net_salary"
              label="Lương NET"
            >
              <Input placeholder="Nhập" disabled />
            </Form.Item>
          </div>
        </div>
      </SwitchFormItem>
    </div>
  )
}

export default EmploySalarySwitchFormItem
