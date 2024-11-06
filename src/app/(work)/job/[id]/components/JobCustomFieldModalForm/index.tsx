'use client'

import { Button, DatePicker, Form, FormInstance, Input, Modal } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { editTaskFieldAction } from '../../../actions'

type JobCustomFieldModalFormProps = {
  children?: React.ReactNode
  initialValues?: any
}

interface NumericInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const NumericInput: React.FC<NumericInputProps> = (props) => {
  const { value, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue)
    }
  }

  const handleBlur = () => {
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1)
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'))
  }

  return (
    <Input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder=""
      maxLength={16}
    />
  )
}

const JobCustomFieldModalForm: React.FC<JobCustomFieldModalFormProps> = ({
  children,
  initialValues,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const formRef = useRef<FormInstance>(null)

  const { require, taskId, value: initialValue, ...rest } = initialValues

  const handleSubmit = async (formData: any) => {
    try {
      var { error, success } = await editTaskFieldAction(rest?.id, {
        ...formData,
        field_id: rest?.id,
        task_id: taskId,
      })

      if (error) {
        toast.error(error)
        setOpen(false)
        return
      }

      toast.success(success)
      setOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    formRef.current?.resetFields()
  }, [open])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={`CHỈNH SỬA ${String(rest?.name).toLocaleUpperCase()}`}
        open={open}
        width={520}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form
          onFinish={handleSubmit}
          labelCol={{ flex: '24px' }}
          wrapperCol={{ flex: 1 }}
          initialValues={{
            ...rest,
            value:
              rest?.type === 'date'
                ? dayjs(dayjs(initialValue).format('YYYY-MM-DD')).valueOf()
                : initialValue,
          }}
          ref={formRef}
        >
          <Form.Item
            label={rest?.name}
            name="value"
            rules={
              require
                ? [
                    {
                      required: true,
                      message: 'Trường này không được để trống.',
                    },
                  ]
                : undefined
            }
            layout="vertical"
            getValueProps={(value) => ({
              value:
                rest?.type === 'date' ? value && dayjs(Number(value)) : value,
            })}
          >
            {rest?.type === 'date' && (
              <DatePicker
                className="w-full"
                placeholder={rest?.name}
                format={(time) => String(dayjs(time).format('DD-MM-YYYY'))}
              />
            )}
            {rest?.type === 'paragraph' && <Input placeholder={rest?.name} />}
            {rest?.type === 'number' && (
              <NumericInput
                placeholder={String(rest?.name)}
                value={value}
                onChange={setValue}
              />
            )}
          </Form.Item>
          <Form.Item>
            <div className="flex items-center gap-[16px]">
              <Button className="flex-1" onClick={() => setOpen(false)}>
                Bỏ qua
              </Button>
              <Button
                className="flex-1"
                color="primary"
                type="primary"
                htmlType="submit"
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default JobCustomFieldModalForm
