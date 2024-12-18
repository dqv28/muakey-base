'use client'

import { InitializedMDXEditor } from '@/components'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { Form, Input, Modal, Select } from 'antd'
import React, { useRef, useState } from 'react'

type RequestModalFormProps = {
  children?: React.ReactNode
}

const RequestModalForm: React.FC<RequestModalFormProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const editorRef = useRef<MDXEditorMethods>(null)

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        // open={open}
        onCancel={() => setOpen(false)}
        title="TẠO ĐỀ XUẤT MỚI"
        destroyOnClose
        modalRender={(dom) => <Form layout="vertical">{dom}</Form>}
        okText="Gửi đề xuất"
        cancelText="Quay lại"
        width={760}
      >
        <Form.Item
          label="Tên đề xuất"
          name="name"
          rules={[
            {
              required: true,
              message: 'Nhập tên đề xuất',
            },
          ]}
        >
          <Input placeholder="Tên đề xuất" />
        </Form.Item>

        <Form.Item
          label="Nhóm đề xuất"
          name="group"
          rules={[
            {
              required: true,
              message: 'Lựa chọn nhóm đề xuất',
            },
          ]}
        >
          <Select
            placeholder="-- Lựa chọn nhóm đề xuất --"
            options={[
              {
                label: 'Đề xuất tăng lương',
                value: 'request-1',
              },
              {
                label: 'Đề xuất nghỉ phép',
                value: 'request-2',
              },
              {
                label: 'Đề xuất tạm ứng',
                value: 'request-3',
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown=""
            placeholder="Mô tả đề xuất"
          />
        </Form.Item>
      </Modal>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="LỰA CHỌN NHÓM ĐỀ XUẤT"
        destroyOnClose
        modalRender={(dom) => <Form layout="vertical">{dom}</Form>}
        footer={<></>}
      >
        Chọn đê
      </Modal>
    </>
  )
}

export default RequestModalForm
