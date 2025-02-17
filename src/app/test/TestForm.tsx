'use client'

import { TiptapEditor } from '@/components'
import { Button, Form, FormProps } from 'antd'
import React, { useState } from 'react'

type TestFormProps = FormProps & {}

const TestForm: React.FC<TestFormProps> = (props) => {
  const [content, setContent] = useState('')

  const handleSubmit = (values: any) => {
    console.log(values?.content)
    setContent(values?.content)
  }

  return (
    <>
      <div className="mb-[8px] mt-[16px] font-bold">1. Tiptap Editor</div>
      <div className="flex items-start gap-[12px]">
        <Form
          {...props}
          className="flex-1"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item name="content">
            <TiptapEditor />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div
          className="min-h-[190px] flex-1 rounded-lg border p-[12px]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  )
}

export default TestForm
