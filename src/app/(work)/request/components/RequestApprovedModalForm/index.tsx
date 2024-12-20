'use client'

import { withApp } from '@/hoc'
import { App, Form, FormProps, Input, Modal, ModalProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { updateProposeAction } from '../action'

type RequestApprovedModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: FormProps['initialValues']
}

const RequestApprovedModalForm: React.FC<RequestApprovedModalFormProps> = ({
  children,
  initialValues,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message: msg, errors } = await updateProposeAction(
        initialValues?.id,
        {
          ...formData,
          status: 'approved',
        },
      )

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      setLoading(false)
      setOpen(false)
      router.refresh()
      message.success('Duyệt đề xuất thành công')
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title="Ý kiến phê duyệt"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Chấp nhận đề xuất này"
        cancelText="Hủy bỏ"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        modalRender={(dom) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            {dom}
          </Form>
        )}
        {...rest}
      >
        <Form.Item name="reason">
          <Input.TextArea placeholder="Gửi ý kiến" />
        </Form.Item>
      </Modal>
    </>
  )
}

export default withApp(RequestApprovedModalForm)
