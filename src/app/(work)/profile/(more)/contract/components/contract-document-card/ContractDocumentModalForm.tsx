'use client'

import { TiptapEditor } from '@/components'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Select,
  Upload,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import { useState } from 'react'

type ContractDocumentModalFormProps = ModalProps & {
  children?: React.ReactNode
  formProps?: FormProps
}

const ContractDocumentModalForm: React.FC<ContractDocumentModalFormProps> = ({
  children,
  formProps,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  const typeOptions = [
    {
      label: 'Giấy khám sức khoẻ',
      value: 'health_checkup',
    },
  ]
  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        title="Thêm giấy tờ nhân sự"
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        width={846}
        okText="Tạo mới"
        cancelText="Hủy"
        onOk={handleSubmit}
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
            <Input placeholder="Nhập" />
          </Form.Item>

          <Form.Item
            className="mb-[16px]! flex-1"
            label="Loại giấy tờ"
            name="type"
            initialValue="health_checkup"
          >
            <Select options={typeOptions} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            className="mb-[16px]! flex-1"
            label="Ngày cấp"
            name="issued_date"
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>

          <Form.Item
            className="mb-[16px]! flex-1"
            label="Ngày hết hạn"
            name="expired_date"
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
        </div>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Nơi cấp"
          name="issued_place"
        >
          <Input placeholder="Nhập" />
        </Form.Item>

        <Form.Item
          className="mb-[16px]! flex-1"
          label="Tệp đính kèm"
          name="attachment"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0! flex-1" label="Ghi chú" name="note">
          <TiptapEditor />
        </Form.Item>
      </Modal>
    </>
  )
}

export default ContractDocumentModalForm
