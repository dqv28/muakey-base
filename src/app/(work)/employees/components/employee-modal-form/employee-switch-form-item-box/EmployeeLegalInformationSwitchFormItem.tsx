import { SwitchFormItem } from '@/components'
import { Card, Form, Input, Radio, RadioGroupProps, Select } from 'antd'
import React from 'react'

export type EmployeeLegalInformationSwitchFormItemProps = {
  className?: string
}

const EmployeeLegalInformationSwitchFormItem: React.FC<
  EmployeeLegalInformationSwitchFormItemProps
> = ({ className }) => {
  const options: RadioGroupProps['options'] = [
    { label: 'Có', value: true },
    { label: 'Không', value: false },
  ]

  return (
    <div className={className}>
      <SwitchFormItem title="Nhập thông tin pháp lý">
        <Card>
          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="tax_code"
              label="Mã số thuế"
            >
              <Input placeholder="Nhập" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="tax_reduction"
              label="Giảm trừ thuế thu nhập cá nhân"
              initialValue={true}
            >
              <Radio.Group options={options} />
            </Form.Item>
          </div>

          <Form.Item
            className="mb-[16px]!"
            name="health_insurance_number"
            label="Số sổ BHYT"
          >
            <Input placeholder="Nhập" />
          </Form.Item>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-0! flex-1"
              name="place_register"
              label="Nơi đăng ký"
            >
              <Input placeholder="Nhập" />
            </Form.Item>
            <Form.Item
              className="mb-0! flex-1"
              name="salary_zone"
              label="Vùng lương"
            >
              <Select placeholder="Chọn" />
            </Form.Item>
          </div>
        </Card>
      </SwitchFormItem>
    </div>
  )
}

export default EmployeeLegalInformationSwitchFormItem
