'use client'

import { withApp } from '@/hoc'
import { App, Card, Form, FormProps, Input, Modal, ModalProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { updateProfileAction } from '../../../action'

export type JobSalaryModalFormProps = ModalProps & {
  children?: React.ReactNode
  formProps?: FormProps
  initialValues?: any
}

const JobSalaryModalForm: React.FC<JobSalaryModalFormProps> = ({
  children,
  formProps,
  initialValues,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { message } = App.useApp()

  const { salary, ...restInitialValues } = initialValues

  const handleSubmit = async (values: any) => {
    setLoading(true)

    const { insurance, insurance_employee, ...restValues } = values

    try {
      const { message: msg, errors } = await updateProfileAction(
        restInitialValues?.id,
        {
          salary: {
            id: salary?.id,
            ...restValues,
          },
        },
      )

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      message.success('Cập nhật thành công')
      setOpen(false)
      setLoading(false)
      router.refresh()
    } catch (error) {
      setLoading(false)
      throw new Error(error as string)
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        title="Thành phần lương"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        width={846}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
              ...salary,
            }}
            {...formProps}
          >
            {dom}
          </Form>
        )}
        {...props}
      >
        <Card>
          <div className="mb-[16px] text-[14px] leading-[22px] font-[600]">
            Thành phần lương
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              label="Lương cơ bản"
              name="basic_salary"
            >
              <Input placeholder="Nhập" />
            </Form.Item>

            <Form.Item
              className="mb-[16px]! flex-1"
              label="Phụ cấp đi lại"
              name="travel_allowance"
            >
              <Input placeholder="Nhập" />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              label="Phụ cấp ăn uống"
              name="eat_allowance"
            >
              <Input placeholder="Nhập" />
            </Form.Item>

            <Form.Item
              className="mb-[16px]! flex-1"
              label="Thưởng, KPI"
              name="kpi"
            >
              <Input placeholder="Nhập" />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-0! flex-1"
              label="BHXH, BHYT, BHTN do công ty đóng (21,5%)"
              name="insurance"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              className="mb-0! flex-1"
              label="BHXH, BHYT, BHTN do NLĐ đóng (10,5%)"
              name="insurance_employee"
            >
              <Input disabled />
            </Form.Item>
          </div>
        </Card>

        <div className="mt-[16px] flex items-center gap-[16px]">
          <Form.Item
            className="mb-0! flex-1"
            label="Lương Gross (Lương sau khi cộng BHXH, BHYT, BHTN)"
            name="gross_salary"
          >
            <Input placeholder="Nhập" disabled />
          </Form.Item>

          <Form.Item
            className="mb-0! flex-1"
            label="Lương Net"
            name="net_salary"
          >
            <Input placeholder="Nhập" disabled />
          </Form.Item>
        </div>
      </Modal>
    </>
  )
}

export default withApp(JobSalaryModalForm)
