'use client'

import { TiptapEditor } from '@/components'
import { Button, Form } from 'antd'
import clsx from 'clsx'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { editTaskAction } from '../../../actions'

type JobDescriptionProps = {
  value?: any
  params?: any
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  value: defaultValue,
  params,
}) => {
  const [value, setValue] = useState(defaultValue || '')
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message, errors } = await editTaskAction(params?.task?.id, {
        description: formData?.description,
      })

      if (errors) {
        toast.error(message)
        setLoading(false)
        return
      }

      toast.success('Cập nhật thành công')
      setIsEdit(false)
      setLoading(false)
      setValue(formData?.description)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <div className="mt-[24px]">
      <div className="flex items-center justify-between gap-[24px]">
        <div className="text-[12px] font-[500] text-[#42b814]">MÔ TẢ</div>
        <span
          className="cursor-pointer text-[13px] text-[#267cde] hover:underline"
          onClick={() => setIsEdit(!isEdit)}
        >
          Chỉnh sửa
        </span>
      </div>
      {isEdit ? (
        <Form
          className="!mt-[16px]"
          onFinish={handleSubmit}
          initialValues={{ description: value || '' }}
        >
          <Form.Item
            rootClassName="!mb-[16px]"
            name="description"
            valuePropName="content"
          >
            <TiptapEditor placeholder="Mô tả nhiệm vụ" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Cập nhật
            </Button>
            <Button
              className="ml-[8px]"
              variant="outlined"
              onClick={() => setIsEdit(false)}
            >
              Bỏ qua
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div
          className={clsx(
            'prose mt-[8px] max-w-full!',
            value ? 'text-[#333]' : 'text-[#999]',
          )}
          dangerouslySetInnerHTML={{ __html: value || 'Không có mô tả' }}
        />
      )}
    </div>
  )
}

export default JobDescription
