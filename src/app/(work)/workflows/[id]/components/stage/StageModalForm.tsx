'use client'

import { Form, FormInstance, Input, Modal, ModalProps } from 'antd'
import { useParams } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addStageAction, editStageAction } from '../../../action'
import { StageContext } from '../WorkflowPageLayout'

type StageModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  query?: any
  action?: 'edit' | 'create'
}

const StageModalForm: React.FC<StageModalFormProps> = ({
  children,
  initialValues,
  query,
  title,
  action = 'create',
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const params = useParams()
  const { setStages } = useContext(StageContext)

  const handleSubmit = async (formData: any) => {
    try {
      if (action === 'edit') {
        var { error, success } = await editStageAction(query?.stage_id, {
          ...formData,
          workflow_id: params?.id,
        })

        setStages((prev: any[]) => {
          const newStages = [...prev]

          return newStages.map((stage: any) => {
            if (stage?.id === query?.stage_id) {
              return {
                ...formData,
                workflow_id: params?.id,
                id: query?.stage_id,
              }
            }

            return stage
          })
        })
      } else {
        var { error, success, id } = await addStageAction(
          {
            ...formData,
            workflow_id: params?.id,
          },
          query,
        )

        setStages((prev: any[]) => {
          if (query?.right && query?.index) {
            const currentIndex = prev?.findIndex(
              (s: any) => s?.index === query?.index,
            )

            return [
              ...prev.slice(0, currentIndex + 1),
              {
                ...formData,
                workflow_id: params?.id,
                id,
              },
              ...prev.slice(currentIndex + 1),
            ]
          }

          return [
            {
              ...formData,
              workflow_id: params?.id,
              id,
            },
            ...prev,
          ]
        })
      }

      if (error) {
        formRef.current?.setFields([
          {
            name: 'name',
            errors: [error],
          },
        ])

        return false
      }

      toast.success(success)
      setOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={title || 'THÊM 1 GIAI ĐOẠN MỚI VÀO LUỒNG CÔNG VIỆC'}
        open={open}
        onCancel={() => setOpen(false)}
        width={520}
        cancelText="Bỏ qua"
        okText={action === 'edit' ? 'Cập nhật' : 'Tạo giai đoạn mới'}
        okButtonProps={{
          htmlType: 'submit',
        }}
        modalRender={(dom) => (
          <Form
            ref={formRef}
            initialValues={initialValues}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
        destroyOnClose
        {...rest}
      >
        <Form.Item className="hidden" name="workflow_id">
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên giai đoạn *"
          rules={[
            {
              required: true,
              message: 'Nhập tên giai đoạn.',
            },
          ]}
        >
          <Input placeholder="Tên giai đoạn" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input placeholder="Mô tả giai đoạn" />
        </Form.Item>
        <Form.Item
          name="expired_after_hours"
          label="Thời gian dự kiến"
          rules={[
            {
              pattern: /[0-9]/,
              message: 'Vui lòng nhập dạng số.',
            },
          ]}
        >
          <Input placeholder="Thời gian (giờ)" />
        </Form.Item>
      </Modal>
    </>
  )
}

export default StageModalForm
