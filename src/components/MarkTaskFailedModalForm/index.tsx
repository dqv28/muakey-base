import { Form, FormInstance, Input, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { moveStageAction } from './action'

type MarkTaskFailedModalFormProps = {
  children?: React.ReactNode
  options?: any
}

const MarkTaskFailedModalForm: React.FC<MarkTaskFailedModalFormProps> = ({
  children,
  options,
}) => {
  const [markOpen, setMarkOpen] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const { failedStageId, task } = options

  const handleSubmit = async (formData: any) => {
    try {
      const { error } = await moveStageAction(task?.id, failedStageId, formData)

      if (error) {
        toast.error(error)
        setMarkOpen(false)
        return
      }

      setMarkOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setMarkOpen(true)}>{children}</div>
      <Modal
        title="ĐÁNH DẤU NHIỆM VỤ THẤT BẠI"
        open={markOpen}
        onCancel={() => setMarkOpen(false)}
        onOk={() => formRef.current?.submit()}
        width={590}
        okText="Đánh dấu thất bại"
        okButtonProps={{
          htmlType: 'submit',
        }}
        destroyOnClose
      >
        <Form
          onFinish={handleSubmit}
          ref={formRef}
          initialValues={{
            name: task?.name,
          }}
          layout="vertical"
        >
          <Form.Item name="name" label="Tên luồng công việc">
            <Input placeholder="Tên luồng công việc" disabled />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Lý do thất bại"
            rules={[
              {
                required: true,
                message: 'Nhập lý do thất bại.',
              },
            ]}
          >
            <Input placeholder="Lý do thất bại" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default MarkTaskFailedModalForm
