import { SwitchFormItem } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, CheckboxOptionType, Form, Input } from 'antd'
import clsx from 'clsx'
import React from 'react'

export type EmployeeContactSwitchFormItemProps = {
  className?: string
}

const EmployeeContactSwitchFormItem: React.FC<
  EmployeeContactSwitchFormItemProps
> = ({ className }) => {
  const options: CheckboxOptionType[] = [
    {
      label: 'Là người phụ thuộc',
      value: 'dependent',
    },
    {
      label: 'Là liên hệ khẩn cấp',
      value: 'emergency',
    },
    {
      label: 'Nằm trong hộ khẩu',
      value: 'household',
    },
  ]

  return (
    <div className={className}>
      <SwitchFormItem
        title="Nhập thông tin gia đình, người phụ thuộc và liên hệ khác"
        extra={<Button icon={<PlusOutlined />} />}
      >
        <Card>
          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="full_name"
              label="Họ và tên"
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="relationship"
              label="Mối quan hệ"
            >
              <Input placeholder="Nhập quan hệ" />
            </Form.Item>
          </div>

          <Form.Item className="mb-[16px]!" name="contact" label="Liên hệ">
            <Input placeholder="Nhập liên hệ" />
          </Form.Item>

          <Form.Item className="mb-0!" name="type" initialValue="dependent">
            <Checkbox.Group className={clsx('w-full')} options={options} />
          </Form.Item>
        </Card>
      </SwitchFormItem>
    </div>
  )
}

export default EmployeeContactSwitchFormItem
