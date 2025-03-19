import { SwitchFormItem } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React from 'react'

export type EmployeeEduInformationSwitchFormItemProps = {
  className?: string
}

const EmployeeEduInformationSwitchFormItem: React.FC<
  EmployeeEduInformationSwitchFormItemProps
> = ({ className }) => {
  return (
    <div className={className}>
      <SwitchFormItem
        title="Nhập thông tin học vấn"
        extra={<Button icon={<PlusOutlined />} />}
      >
        <Card>
          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="school"
              label="Tên trường"
            >
              <Input placeholder="Nhập tên trường" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="major"
              label="Chuyên ngành"
            >
              <Input placeholder="Nhập chuyên ngành" />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-0! flex-1"
              name="time_range"
              label="Thời gian (Bắt đầu - kết thúc)"
            >
              <DatePicker.RangePicker className="w-full" locale={locale} />
            </Form.Item>
            <Form.Item className="mb-0! flex-1" name="degree" label="Bằng cấp">
              <Input placeholder="Nhập" />
            </Form.Item>
          </div>
        </Card>
      </SwitchFormItem>
    </div>
  )
}

export default EmployeeEduInformationSwitchFormItem
