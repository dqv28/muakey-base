'use client'

import { Form, FormProps, Modal, ModalProps } from 'antd'
import React, { useState } from 'react'
import JobProgressDecisionInformationFormCard from './components/job-progress-decision-information-form-card'
import JobProgressInfomationFormCard from './components/job-progress-infomation-form-card'
import JobProgressNewInfomationFormCard from './components/job-progress-new-infomation-form-card'

export type JobProgressModalFormProps = ModalProps & {
  children?: React.ReactNode
  formProps?: FormProps
}

const JobProgressModalForm: React.FC<JobProgressModalFormProps> = ({
  children,
  formProps,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        classNames={{
          body: '!space-y-[16px]',
        }}
        title="Tạo mới quyết định bổ nhiệm, tăng lương"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        width={846}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          htmlType: 'submit',
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form layout="vertical" {...formProps}>
            {dom}
          </Form>
        )}
        {...props}
      >
        <JobProgressInfomationFormCard title="Thông tin chung" />

        <JobProgressNewInfomationFormCard title="Thành phần lương mới" />

        <JobProgressDecisionInformationFormCard title="Thông tin quyết định" />
      </Modal>
    </>
  )
}

export default JobProgressModalForm
