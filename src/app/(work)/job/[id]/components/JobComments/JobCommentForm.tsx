'use client'

import { Button, Form, FormInstance, Input } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addCommentAction } from './action'

type JobCommentFormProps = {
  options?: any
}

const JobCommentForm: React.FC<JobCommentFormProps> = ({ options }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()
  const formRef = useRef<FormInstance>(null)

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message, errors } = await addCommentAction({
        ...formData,
        task_id: options?.taskId,
      })

      if (errors) {
        toast.error(message)

        setLoading(false)
        return
      }

      toast.success('Bạn vừa thêm thảo luận mới.')
      setLoading(false)
      formRef.current?.resetFields()
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <Form.Item className="!mb-[12px]" name="content">
        <Input.TextArea
          placeholder="Viết thảo luận của bạn"
          autoSize={{ minRows: 3 }}
          onChange={(e) => setDisabled(!e.target.value)}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button
          htmlType="submit"
          type="primary"
          disabled={disabled}
          loading={loading}
        >
          Gửi ngay
        </Button>
      </Form.Item>
    </Form>
  )
}

export default JobCommentForm
