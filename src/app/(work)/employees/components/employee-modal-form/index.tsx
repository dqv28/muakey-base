'use client'

import { Form, FormProps, Modal, ModalProps } from 'antd'
import React, { useState } from 'react'
import EmployeeSwitchFormItemBox from './employee-switch-form-item-box'
import EmployeeInfomationFormItemBox from './EmployeeInfomationFormItemBox'
import EmployeeResumeFormItemBox from './EmployeeResumeFormItemBox'
import EmployeeSelectFormItemBox from './EmployeeSelectFormItemBox'

export type EmployeeModalFormProps = ModalProps & {
  initialValues?: any
  formProps?: FormProps
  children?: React.ReactNode
}

const EmployeeModalForm: React.FC<EmployeeModalFormProps> = ({
  children,
  formProps,
  initialValues,
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
        title="Thêm nhân sự mới"
        open={open}
        width={846}
        okText="Thêm"
        cancelText="Hủy"
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form layout="vertical" onFinish={handleSubmit} {...formProps}>
            {dom}
          </Form>
        )}
        {...props}
      >
        <div className="divide-y">
          <EmployeeSelectFormItemBox />

          <EmployeeInfomationFormItemBox className="pt-[16px]" />

          <EmployeeResumeFormItemBox className="py-[16px]" />

          <EmployeeSwitchFormItemBox className="pt-[16px]" />
        </div>
      </Modal>
    </>
  )
}

export default EmployeeModalForm
