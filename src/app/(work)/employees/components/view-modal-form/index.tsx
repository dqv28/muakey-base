'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Form, FormProps, Input, Modal, ModalProps } from 'antd'
import React, { useState } from 'react'
import { getViewFieldsAction } from '../action'

export type ViewModalFormProps = ModalProps & {
  formProps?: FormProps
  children?: React.ReactNode
}

const ViewModalForm: React.FC<ViewModalFormProps> = ({
  formProps,
  children,
  ...rest
}) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  useAsyncEffect(async () => {
    if (!open) return

    const res = await getViewFieldsAction()

    console.log(res)
  }, [open])

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        title="Tạo views mới"
        open={open}
        okText="Thêm"
        cancelText="Hủy"
        okButtonProps={{
          htmlType: 'submit',
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form onFinish={handleSubmit} layout="vertical" {...formProps}>
            {dom}
          </Form>
        )}
        width={846}
        {...rest}
      >
        <Form.Item
          name="name"
          label="Tên views"
          rules={[{ required: true, message: 'Tên views không được để trống' }]}
        >
          <Input placeholder="Nhập tên views" />
        </Form.Item>

        <Form.Item label="Cột hiển thị">
          <Input.Search placeholder="Nhận tên cột" />
        </Form.Item>
      </Modal>
    </>
  )
}

export default ViewModalForm
