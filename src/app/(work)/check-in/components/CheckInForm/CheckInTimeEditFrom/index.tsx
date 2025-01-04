import { Button, DatePicker, Form, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React from 'react'
import FormCard from './FormCard'

type CheckInTimeEditFormProps = {}

const CheckInTimeEditForm: React.FC<CheckInTimeEditFormProps> = (props) => {
  return (
    <Form layout="vertical">
      <Form.Item className="w-[230px]" label="Ngày" name="date">
        <DatePicker className="w-full" locale={locale} />
      </Form.Item>

      <Form.Item>
        <div className="flex items-center gap-[24px]">
          <FormCard
            className="flex-1"
            title="Giờ kế hoạch"
            checkIn="09:00:00"
            checkOut="18:30:00"
          />
          <FormCard
            className="flex-1"
            title="Giờ thực tế"
            checkIn="09:00:00"
            checkOut="--:--:--"
          />
          <FormCard
            className="flex-1"
            title="Sửa giờ vào/ra"
            checkIn={
              <DatePicker className="w-full" locale={locale} picker="time" />
            }
            checkOut={
              <DatePicker className="w-full" locale={locale} picker="time" />
            }
          />
        </div>
      </Form.Item>

      <Form.Item
        className="mt-[24px]"
        name="reason"
        label="Lý do sửa giờ vào/ra"
      >
        <Input.TextArea
          autoSize={{
            minRows: 3,
          }}
        />
      </Form.Item>

      <Form.Item className="!mb-0">
        <Button type="primary">Gửi yêu cầu</Button>
      </Form.Item>
    </Form>
  )
}

export default CheckInTimeEditForm
