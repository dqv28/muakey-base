'use client'

import { App, Form, FormInstance, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addWorkflowCategoryAction } from '../../action'
import FormFields from './FormFields'
import { useAsyncEffect } from '@/libs/hook'
import { getWorkflowCategoryByIdAction } from './action'
import { withApp } from '@/hoc'

const WorkflowExtra: React.FC<{
  action?: 'create' | 'edit'
  initialValues?: any
  children?: React.ReactNode
}> = ({ action = 'create', initialValues, children }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState()

  const formRef = useRef<FormInstance>(null)
  const { message } = App.useApp()

  useAsyncEffect(async () => {
    const res = await getWorkflowCategoryByIdAction(initialValues?.id)

    setCategory(res)
  }, [])

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      if (action === 'edit') {
        console.log({
          formData,
        })
        return
      } else {
        var { errors } = await addWorkflowCategoryAction({
          ...formData,
          members: (formData?.members || []).join(' '),
        })
      }

      if (errors) {
        const nameList = Object.keys(errors)

        formRef.current?.setFields(
          nameList.map((name: string) => ({
            name,
            errors: [errors?.[name]],
          })),
        )

        setLoading(false)
        return
      }

      message.success('Đã thêm 1 danh mục mới.')
      setOpen(false)
      setLoading(false)

      if (typeof window !== undefined) {
        window.location.reload()
      }
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title="TẠO DANH MỤC MỚI"
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
        okText="Tạo danh mục mới"
        cancelText="Bỏ qua"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            onFinish={handleSubmit}
            ref={formRef}
            layout="vertical"
            initialValues={category}
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

export default withApp(WorkflowExtra)
