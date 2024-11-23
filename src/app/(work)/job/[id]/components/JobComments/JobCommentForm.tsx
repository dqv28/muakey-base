'use client'

import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addCommentAction } from './action'

type JobCommentFormProps = {
  options?: any
}

const JobCommentForm: React.FC<JobCommentFormProps> = ({ options }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    console.log({
      ...formData,
      task_id: options?.taskId,
    })

    try {
      const { success, error } = await addCommentAction({
        ...formData,
        task_id: options?.taskId,
      })

      if (error) {
        toast.error(error)
        return
      }

      toast.success(success)
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
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
