import { SwitchFormItem } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React from 'react'

export type EmployeeHistorySwitchFormItemProps = {
  className?: string
}

const EmployeeHistorySwitchFormItem: React.FC<
  EmployeeHistorySwitchFormItemProps
> = ({ className }) => {
  return (
    <div className={className}>
      <SwitchFormItem
        title="Nhập thông tin lịch sử làm việc"
        extra={<Button icon={<PlusOutlined />} />}
      >
        <Card>
          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="business"
              label="Tổ chức, doanh nghiệp"
            >
              <Input placeholder="Nhập tên tổ chức, doanh nghiệp" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="time_stamp"
              label="Thời gian (Bắt đầu - kết thúc)"
            >
              <DatePicker.RangePicker className="w-full" locale={locale} />
            </Form.Item>
          </div>

          <Form.Item
            className="mb-[16px]! flex-1"
            name="position"
            label="Vị tri"
          >
            <Input placeholder="Nhập vị trí" />
          </Form.Item>
        </Card>
      </SwitchFormItem>
    </div>
  )
}

export default EmployeeHistorySwitchFormItem
