'use client'

import { TiptapEditor } from '@/components'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Radio,
  Select,
  Upload,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React, { useState } from 'react'

type ContractModalFormProps = ModalProps & {
  children?: React.ReactNode
  formProps?: FormProps
  action?: 'create' | 'edit'
}

const ContractModalForm: React.FC<ContractModalFormProps> = ({
  children,
  formProps,
  action = 'create',
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  const typeOptions = [
    {
      label: 'HĐ không xác định thời hạn',
      value: 'unlimited',
    },
    {
      label: 'HĐ có thời hạn',
      value: 'limited',
    },
    {
      label: 'HĐ thử việc',
      value: 'trial',
    },
  ]

  const statusOptions = [
    {
      label: 'Đã ký',
      value: 'signed',
    },
    {
      label: 'Chưa ký',
      value: 'not_signed',
    },
  ]

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        title={action === 'create' ? 'Tạo hợp đồng mới' : 'Chỉnh sửa hợp đồng'}
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        okText={action === 'create' ? 'Tạo mới' : 'Cập nhật'}
        cancelText="Hủy"
        onOk={handleSubmit}
        width={846}
        okButtonProps={{
          htmlType: 'submit',
        }}
        modalRender={(dom) => (
          <Form layout="vertical" {...formProps}>
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
            label="Loại hợp đồng"
            name="type"
            initialValue="unlimited"
          >
            <Select options={typeOptions} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            className="mb-[16px]! flex-1"
            label="Thời gian (Bắt đầu - kết thúc)"
            name="time"
          >
            <DatePicker.RangePicker className="w-full" locale={locale} />
          </Form.Item>

          <Form.Item
            className="mb-[16px]! flex-1"
            label="Trạng thái"
            name="status"
            initialValue="signed"
          >
            <Radio.Group options={statusOptions} />
          </Form.Item>
        </div>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Tệp đính kèm"
          name="attachment"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mb-[16px]! flex-1" label="Ghi chú" name="note">
          <TiptapEditor />
        </Form.Item>

        <Form.Item className="mb-0! flex-1" name="present">
          <Checkbox checked>Hợp đồng hiện tại</Checkbox>
        </Form.Item>
      </Modal>
    </>
  )
}

export default ContractModalForm
