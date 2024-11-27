'use client'

import { PlusOutlined } from '@/ui/icons'
import { Button, Form, FormInstance, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addWorkflowCategoryAction } from '../../action'
import FormFields from './FormFields'

const WorkflowExtra: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { errors } = await addWorkflowCategoryAction({
        ...formData,
        members: (formData?.members || []).join(' '),
      })

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

      toast.success('Đã thêm 1 danh mục mới.')
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
      <Button
        className="!p-[10px] !text-[12px] text-[#fff]"
        icon={<PlusOutlined className="text-[16px]" />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Tạo mới danh mục
      </Button>
      <Modal
        title="TẠO DANH MỤC MỚI"
        open={open}
        onCancel={() => setOpen(false)}
        width={760}
        okText="Tạo danh mục mới"
        cancelText="Bỏ qua"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form onFinish={handleSubmit} ref={formRef} layout="vertical">
            {dom}
          </Form>
        )}
      >
        <FormFields />
      </Modal>
    </>
  )
}

export default WorkflowExtra
