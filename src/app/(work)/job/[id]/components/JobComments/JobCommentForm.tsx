'use client'

import { InitializedMDXEditor } from '@/components'
import { linkPlugin } from '@mdxeditor/editor'
import { Button, Form, FormInstance } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Converter } from 'showdown'
import { addCommentAction } from './action'

type JobCommentFormProps = {
  options?: any
}

const JobCommentForm: React.FC<JobCommentFormProps> = ({ options }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [content, setContent] = useState('')

  const router = useRouter()
  const formRef = useRef<FormInstance>(null)
  const converter = new Converter()

  const [listOpen, setListOpen] = useState(false)

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message, errors } = await addCommentAction({
        ...formData,
        task_id: options?.taskId,
        content: converter.makeHtml(formData?.content),
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
        <InitializedMDXEditor
          contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
          markdown=""
          placeholder="Bình luận"
          plugins={[linkPlugin()]}
          onChange={(markdown) => {
            setDisabled(!markdown)
            console.log(markdown)
          }}
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
