import { Form, Input, Select } from 'antd'
import React from 'react'

export type EmployeeSelectFormItemBoxProps = {
  className?: string
}

const EmployeeSelectFormItemBox: React.FC<EmployeeSelectFormItemBoxProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-[16px]">
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Chọn email nhân sự"
          rules={[{ required: true, message: 'Chọn mail nhân sự' }]}
        >
          <Select placeholder="Chọn mail" />
        </Form.Item>
        <Form.Item
          className="mb-[16px]! flex-1"
          label="Tài khoản"
          rules={[{ required: true, message: 'Nhập tài khoản' }]}
        >
          <Select placeholder="Nhập tài khoản" />
        </Form.Item>
      </div>

      <Form.Item
        className="mb-[16px]!"
        name="password"
        label="Mật khẩu"
        rules={[{ required: true, message: 'Nhập mật khẩu' }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>
    </div>
  )
}

export default EmployeeSelectFormItemBox
