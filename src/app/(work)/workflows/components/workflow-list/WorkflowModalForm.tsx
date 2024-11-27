'use client'

import { toast } from '@/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { addWorkflowAction } from '../../action'
import FormFields from './FormFields'

type WorkflowModalFormProps = {
  initialValues?: any
}

const WorkflowModalForm: React.FC<WorkflowModalFormProps> = ({
  initialValues,
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormInstance>(null)

  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { id: workflowId, errors } = await addWorkflowAction(formData)

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

      toast.success('Đã thêm 1 quy trình mới.')
      router.push(`/workflows/${workflowId}`)
      setOpen(false)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined className="text-[16px]" />}
        onClick={() => setOpen(true)}
      >
        Tạo mới workflow
      </Button>
      <Modal
        title="Tạo luồng công việc mới"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => formRef.current?.submit()}
        width={760}
        okText="Tạo luồng công việc mới"
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

export default WorkflowModalForm
