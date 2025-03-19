'use client'

import { TiptapEditor } from '@/components'
import {
  Alert,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React, { useState } from 'react'

export type ScheduleHolidayModalFormProps = ModalProps & {
  children?: React.ReactNode
  formProps?: FormProps
  initialValues?: any
}

const ScheduleHolidayModalForm: React.FC<ScheduleHolidayModalFormProps> = ({
  children,
  formProps,
  initialValues,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        title="Chỉnh sửa dữ liệu ngày phép"
        open={open}
        onCancel={() => setOpen(false)}
        width={846}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          htmlType: 'submit',
        }}
        modalRender={(dom) => (
          <Form onFinish={handleSubmit} layout="vertical" {...formProps}>
            {dom}
          </Form>
        )}
        {...props}
      >
        <div className="flex items-center gap-[16px]">
          <Form.Item className="mb-[16px]! flex-1" label="Nhân sự" name="staff">
            <Input placeholder="Nhập" disabled />
          </Form.Item>

          <Form.Item
            className="mb-[16px]! flex-1"
            label="Ngày có hiệu lực"
            name="effective_date"
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            className="mb-[16px]! flex-1"
            label="Tổng ngày phép có hưởng lương"
            name="total_holiday_with_salary"
          >
            <Input placeholder="Nhập" />
          </Form.Item>

          <Form.Item
            className="mb-[16px]! flex-1"
            label="Phép thâm niên"
            name="seniority_holiday"
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </div>

        <Alert
          className="mb-[16px]!"
          message={
            <span>
              Tổng ngày phép: <span className="font-[600]">4</span> ngày
            </span>
          }
          type="success"
          showIcon
          closable
        />

        <Form.Item className="mb-[16px]! flex-1" label="Ghi chú" name="note">
          <TiptapEditor />
        </Form.Item>
      </Modal>
    </>
  )
}

export default ScheduleHolidayModalForm
