'use client'

import { Form, FormInstance, Input, Modal, ModalProps, toast } from '@/ui'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { addTaskAction, editTaskAction } from '../../../action'
import TaskSelect from './TaskSelect'

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
  const [open, setOpen] = useState(false)
  const [openSelectBox, setOpenSelectBox] = useState(false)
  const [value, setValue] = useState<string | undefined>()
  const formRef = useRef<FormInstance>(null)
  const router = useRouter()

  const { account_id, members, ...restInitialValues } = initialValues

  const handleSubmit = async (formData: any) => {
    const member: any = members.filter(
      (m: any) =>
        `${`${m.full_name} ·`} ${m.username} ${!!m.position && `· ${m.position}`}` ===
        value,
    )

    try {
      if (action === 'create') {
        var { error, success } = await addTaskAction({
          ...formData,
          account_id: member[0]?.id || 0,
        })
      } else {
        var { error, success } = await editTaskAction(initialValues?.id, {
          data: formData,
        })
      }

      if (error) {
        if (typeof error === 'string') {
          toast.error(error)

          return
        }

        for (const key in error) {
          formRef.current?.setError(key, {
            message: error[key],
          })
        }

        return
      }

      toast.success(success)
      setOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }

    router.refresh()
  }

  const mem: any = members?.find((m: any) => m?.id === account_id)

  useEffect(() => {
    formRef.current?.reset()
    setValue('')
  }, [open])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={title || 'TẠO NHIỆM VỤ MỚI'}
        open={open}
        onOpenChange={setOpen}
        width={760}
        okButtonProps={{
          children: action === 'create' ? 'Tạo nhiệm vụ mới' : 'Cập nhật',
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
        <Form
          formRef={formRef}
          values={{
            ...restInitialValues,
            member: account_id
              ? `${`${mem?.full_name} ·`} ${mem?.username} ${!!mem?.position && `· ${mem?.position}`}`
              : undefined,
          }}
          onSubmit={handleSubmit}
        >
          <Form.Item className="hidden" name="workflow_id">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={
              <span className="inline-block w-[130px]">Tên nhiệm vụ *</span>
            }
            rules={{
              required: 'Nhập tên nhiệm vụ.',
            }}
            type="horizontal"
          >
            <Input
              className="border-b border-[#eee]"
              placeholder="Tên nhiệm vụ"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="inline-block w-[130px]">Mô tả</span>}
            type="horizontal"
          >
            <Input
              className="border-b border-[#eee]"
              placeholder="Mô tả nhiệm vụ"
            />
          </Form.Item>
          <Form.Item
            name="member"
            label={<span className="inline-block w-[130px]">Giao cho</span>}
            type="horizontal"
          >
            <TaskSelect
              defaultValue={value}
              value={value}
              text={value}
              open={openSelectBox}
              onChange={(e) => setValue(e.target.value)}
              onClick={() => setOpenSelectBox(!openSelectBox)}
              onItemSelect={(value) => setValue(value)}
              options={members}
            />
          </Form.Item>
          <Form.Item
            name="expired"
            label={<span className="inline-block w-[130px]">Thời hạn</span>}
            type="horizontal"
          >
            <Input className="border-b border-[#eee]" placeholder="Thời hạn" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TaskModalForm
