'use client'

import { withApp } from '@/hoc'
import { App, DatePicker, Form, Input, Modal, ModalProps } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { addWorkScheduleAction, updateWorkScheduleAction } from './action'

type CheckInScheduleModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
}

const CheckInScheduleModalForm: React.FC<CheckInScheduleModalFormProps> = ({
  children,
  initialValues,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()
  const router = useRouter()

  const { workSchedule } = initialValues

  const workScheduleFiltered = workSchedule?.filter(
    (s: any) => s?.go_to_work === 0,
  )

  const handleSubmit = async (formData?: any) => {
    setLoading(true)

    const nextSchedule = await addWorkScheduleAction()

    const ids = formData?.ids?.map((date: Date) => {
      const dateStr = String(dayjs(date).format('YYYY-MM-DD'))

      const schedule = [...workSchedule, ...nextSchedule]?.find(
        (s: any) => s?.day_of_week === dateStr,
      )

      return schedule?.id || null
    })

    try {
      const { message: msg, errors } = await updateWorkScheduleAction({
        ...formData,
        ids,
      })

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
      throw new Error(String(error))
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title="Cập nhật lịch làm việc"
        open={open}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            initialValues={{
              ids: workScheduleFiltered?.map((s: any) => dayjs(s?.day_of_week)),
            }}
            onFinish={handleSubmit}
          >
            {dom}
          </Form>
        )}
        width={760}
        destroyOnClose
        {...rest}
      >
        <Form.Item
          name="ids"
          label="Chọn ngày nghỉ"
          rules={[
            {
              required: true,
              message: 'Chưa chọn ngày',
            },
          ]}
        >
          <DatePicker multiple locale={locale} />
        </Form.Item>
        <Form.Item name="description" label="Ghi chú">
          <Input.TextArea
            autoSize={{ minRows: 6 }}
            placeholder="Ghi chú ngày nghỉ"
          />
        </Form.Item>
      </Modal>
    </>
  )
}

export default withApp(CheckInScheduleModalForm)
