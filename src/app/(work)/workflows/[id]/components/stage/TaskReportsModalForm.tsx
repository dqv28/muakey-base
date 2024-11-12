import { Form, FormInstance, Input, Modal, ModalProps } from 'antd'
import React, { useRef } from 'react'

type TaskReportsModalFormProps = Pick<
  ModalProps,
  'open' | 'onCancel' | 'onOk'
> & {
  onSubmit?: (values: any) => void
}

const TaskReportsModalForm: React.FC<TaskReportsModalFormProps> = ({
  onSubmit,
  onOk,
  ...rest
}) => {
  const formRef = useRef<FormInstance>(null)

  return (
    <Modal
      title="Báo cáo giai đoạn gì đấy"
      onOk={(e) => {
        formRef.current?.submit()
        onOk?.(e)
      }}
      {...rest}
    >
      <Form ref={formRef} onFinish={onSubmit}>
        <Form.Item name="field">
          <Input placeholder="Write something..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskReportsModalForm
