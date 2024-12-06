'use client'

import { toast } from '@/ui'
import { App, Form, FormInstance, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { addWorkflowAction, editWorkflowAction } from '../../action'
import FormFields from './FormFields'
import { withApp } from '@/hoc'

type WorkflowModalFormProps = {
  initialValues?: any
  action?: 'create' | 'edit'
  children?: React.ReactNode
}

const WorkflowModalForm: React.FC<WorkflowModalFormProps> = ({
  initialValues,
  action = 'create',
  children
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const router = useRouter()

  const { message } = App.useApp()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      if (action === 'edit') {
        var { errors } = await editWorkflowAction(initialValues?.id, {
          ...formData,
          manager: (formData?.manager || []).join(' '),
        })
      } else {
        var { id: workflowId, errors } = await addWorkflowAction({
          ...formData,
          manager: (formData?.manager || []).join(' '),
        })
      }

      if (errors) {
        const nameList: string[] = Object.keys(errors)

        formRef.current?.setFields(
          nameList.map((name) => ({
            name,
            errors: [errors?.[name]],
          })),
        )

        setLoading(false)
        return false
      }

      if (action === 'create') router.push(`/workflows/${workflowId}`)

      message.success(action === 'create' ? 'Đã thêm 1 quy trình mới.' : 'Cập nhật thành công.')
      setOpen(false)
      setLoading(false)
      
      if (typeof window !== 'undefined' && action === 'edit') {
        window.location.reload()
      }
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children || 'Tạo mới workflow'}
      </div>
      <Modal
        title={action === 'create' ? "Tạo luồng công việc mới" : 'Cập nhật luồng công việc'}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => formRef.current?.submit()}
        width={760}
        okText={action === 'create' ? "Tạo mới" : 'Cập nhật'}
        cancelText="Bỏ qua"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        modalRender={(dom) => (
          <Form
            initialValues={{
              ...initialValues,
              manager: String(initialValues?.manager).split(' '),
            }}
            ref={formRef}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
      >
        <FormFields />
      </Modal>
    </>
  )
}

export default withApp(WorkflowModalForm)
