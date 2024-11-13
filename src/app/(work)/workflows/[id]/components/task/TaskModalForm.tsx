'use client'

import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Select,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addTaskAction, editTaskAction } from '../../../action'

type TaskModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  query?: any
  action?: 'edit' | 'create'
}

const TaskModalForm: React.FC<TaskModalFormProps> = ({
  children,
  initialValues,
  query,
  title,
  action = 'create',
  ...rest
}) => {
  console.log(initialValues)
  const [open, setOpen] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const router = useRouter()
  const params = useParams()

  const { account_id, members, ...restInitialValues } = initialValues

  const handleSubmit = async (formData: any) => {
    const { member: memberVal, ...restFormData } = formData

    const member: any = members.filter(
      (m: any) =>
        `${`${m.full_name} ·`} ${m.username} ${!!m.position ? `· ${m.position}` : ''}` ===
        memberVal,
    )

    console.log({
      ...restFormData,
      account_id: member[0]?.id || null,
    })

    try {
      if (action === 'create') {
        var { error, success } = await addTaskAction({
          ...restFormData,
          account_id: member[0]?.id || null,
          workflow_id: params?.id || null,
        })
      } else {
        var { error, success } = await editTaskAction(initialValues?.id, {
          ...restFormData,
          account_id: member[0]?.id || null,
        })
      }

      if (error) {
        if (typeof error === 'string') {
          toast.error(error)

          return
        }

        const nameList: string[] = Object.keys(error)

        formRef.current?.setFields(
          nameList.map((name) => ({
            name,
            errors: [error?.[name]],
          })),
        )

        return
      }

      toast.success(success)
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const mem: any = members?.find((m: any) => m?.id === account_id)

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={title || 'TẠO NHIỆM VỤ MỚI'}
        open={open}
        onCancel={() => setOpen(false)}
        width={760}
        cancelText="Bỏ qua"
        okText={action === 'create' ? 'Tạo nhiệm vụ mới' : 'Cập nhật'}
        okButtonProps={{
          htmlType: 'submit',
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            ref={formRef}
            initialValues={{
              ...restInitialValues,
              member: account_id
                ? `${`${mem?.full_name} ·`} ${mem?.username} ${!!mem?.position ? `· ${mem?.position}` : ''}`
                : undefined,
            }}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
        {...rest}
      >
        <Form.Item
          name="name"
          label="Tên nhiệm vụ"
          rules={[
            {
              required: true,
              message: 'Nhập tên nhiệm vụ.',
            },
          ]}
        >
          <Input
            className="border-b border-[#eee]"
            placeholder="Tên nhiệm vụ"
          />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input
            className="border-b border-[#eee]"
            placeholder="Mô tả nhiệm vụ"
          />
        </Form.Item>
        <Form.Item name="member" label="Giao cho">
          <Select
            options={members?.map((m: any) => {
              const mem = `${`${m.full_name} ·`} ${m.username} ${!!m.position ? `· ${m.position}` : ''}`

              return {
                label: mem,
                value: mem,
              }
            })}
            placeholder="-- Lựa chọn một người dưới đây --"
          />
        </Form.Item>
        <Form.Item name="expired" label="Thời hạn">
          <InputNumber
            className="w-full border-b border-[#eee]"
            placeholder="Thời hạn"
          />
        </Form.Item>
      </Modal>
    </>
  )
}

export default TaskModalForm
