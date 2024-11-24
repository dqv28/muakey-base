'use client'

import { Form, Input, Modal, ModalProps } from 'antd'
import React from 'react'

type TaskDoneModalFormProps = ModalProps & {}

const TaskDoneModalForm: React.FC<TaskDoneModalFormProps> = (props) => {
  return (
    <Modal
      title="Báo cáo sản phẩm"
      modalRender={(dom) => <Form>{dom}</Form>}
      destroyOnClose
      {...props}
    >
      <Form.Item
        className="!mb-[40px]"
        layout="vertical"
        name="link-youtube"
        label="Link sản phẩm"
      >
        <Input />
      </Form.Item>
    </Modal>
  )
}

export default TaskDoneModalForm
