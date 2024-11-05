'use client'

import { Form, FormInstance, Input, Modal, ModalProps, toast } from '@/ui'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { addStageAction, editStageAction } from '../../../action'

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

  const handleSubmit = async (formData: any) => {
    try {
      if (action === 'edit') {
        var { error, success } = await editStageAction(query?.stage_id, {
          ...formData,
          workflow_id: params?.id,
        })
      } else {
        var { error, success } = await addStageAction(
          {
            ...formData,
            workflow_id: params?.id,
          },
          query,
        )
      }

      if (error) {
        formRef.current?.setError('name', {
          message: error,
        })

        return false
      }

      setOpen(false)
      toast.success(success)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    formRef.current?.reset()
  }, [open])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={title || 'THÊM 1 GIAI ĐOẠN MỚI VÀO LUỒNG CÔNG VIỆC'}
        open={open}
        onOpenChange={setOpen}
        width={520}
        okButtonProps={{
          children: action === 'edit' ? 'Cập nhật' : 'Tạo giai đoạn mới',
          size: 'large',
          onClick: () => formRef.current?.submit(),
        }}
        cancelButtonProps={{
          children: 'Bỏ qua',
          size: 'large',
          onClick: () => setOpen(false),
        }}
        {...rest}
      >
        <Form formRef={formRef} values={initialValues} onSubmit={handleSubmit}>
          <Form.Item className="hidden" name="workflow_id">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên giai đoạn *"
            rules={{
              required: 'Nhập tên giai đoạn.',
            }}
          >
            <Input
              className="border-b border-[#eee]"
              placeholder="Tên giai đoạn"
              borderless
              ghost
            />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input
              className="border-b border-[#eee]"
              placeholder="Mô tả giai đoạn"
              borderless
              ghost
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StageModalForm
