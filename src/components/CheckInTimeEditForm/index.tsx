'use client'

import { withApp } from '@/hoc'
import { App, Button, DatePicker, Form, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { addProposeAction } from '../../app/(work)/check-in/components/checkin-form/action'
import FormCard from './FormCard'

type CheckInTimeEditFormProps = {
  initialValues?: any
}

const FormFields: React.FC<{
  initialValues?: any
}> = ({ initialValues }) => {
  return (
    <>
      <Form.Item
        className="w-[230px]"
        label="Ngày"
        name="date"
        rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
      >
        <DatePicker className="w-full" locale={locale} />
      </Form.Item>

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
            <Form.Item
              className="!mb-0"
              name="check_in"
              rules={[{ required: true, message: 'Vui lòng chọn giờ vào' }]}
            >
              <DatePicker
                className="w-full"
                locale={locale}
                picker="time"
                showSecond={false}
              />
            </Form.Item>
          }
          checkOut={
            <Form.Item
              className="!mb-0"
              name="check_out"
              rules={[{ required: true, message: 'Vui lòng chọn giờ ra' }]}
            >
              <DatePicker
                className="w-full"
                locale={locale}
                picker="time"
                showSecond={false}
              />
            </Form.Item>
          }
        />
      </div>

      <Form.Item
        className="mt-[24px]"
        name="description"
        label="Lý do sửa giờ vào/ra"
      >
        <Input.TextArea
          autoSize={{
            minRows: 3,
          }}
        />
      </Form.Item>
    </>
  )
}

const CheckInTimeEditForm: React.FC<CheckInTimeEditFormProps> = ({
  initialValues,
}) => {
  const { mode, ...restInitialVlues } = initialValues

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    const { check_in, check_out, date } = formData

    const startDate = `${String(dayjs(date).format('YYYY-MM-DD'))} ${check_in ? String(dayjs(check_in).format('HH:mm:ss')) : ''}`
    const endDate = `${String(dayjs(date).format('YYYY-MM-DD'))} ${check_out ? String(dayjs(check_out).format('HH:mm:ss')) : ''}`

    try {
      const { message: msg, errors } = await addProposeAction({
        name: 'Sửa giờ vào ra',
        start_time: startDate.trim(),
        end_time: endDate.trim(),
        propose_category_id: 6,
      })

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      message.success('Gửi yêu cầu thành công')
      setLoading(false)
      form.resetFields()
      router.refresh()
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  if (mode === 'modal') {
    return <FormFields />
  }

  return (
    <div className="rounded-[16px] bg-[#fff] p-[16px]">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        initialValues={{
          ...restInitialVlues,
          check_in: restInitialVlues?.date,
        }}
      >
        <FormFields />

        <Form.Item className="!mb-0">
          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withApp(CheckInTimeEditForm)
