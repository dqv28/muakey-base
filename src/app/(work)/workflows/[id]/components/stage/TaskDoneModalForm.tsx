'use client'

import { Form, Input, Modal, ModalProps } from 'antd'
import React from 'react'
import toast from 'react-hot-toast'
import { editTaskAction } from '../../../action'

type TaskDoneModalFormProps = ModalProps & {
  taskId: number
  onSubmit?: () => void
  initialValues?: any
}

const TaskDoneModalForm: React.FC<TaskDoneModalFormProps> = ({
  taskId,
  onSubmit,
  initialValues,
  ...rest
}) => {
  const handleSubmit = async (formData: any) => {
    try {
      const { errors } = await editTaskAction(taskId, formData)

      if (errors) {
        toast.error(errors)
        return
      }

      onSubmit?.()
      toast.success('Đánh dấu hoàn thành.')
    } catch (error) {
      throw new Error(String(error))
    }
  }

  return (
    <Modal
      title="Báo cáo sản phẩm"
      modalRender={(dom) => (
        <Form
          onFinish={handleSubmit}
          initialValues={initialValues}
          layout="vertical"
        >
          {dom}
        </Form>
      )}
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
      }}
      {...rest}
    >
      <Form.Item
        className="!mb-[40px]"
        name="link_youtube"
        label="Link sản phẩm"
        rules={[
          {
            required: true,
            message: 'Nhập link sản phẩm',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Modal>
  )
}

export default TaskDoneModalForm
