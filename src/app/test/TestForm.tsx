'use client'

import { TiptapEditor } from '@/components'
import { getThumbnailFromYoutubeUrl } from '@/lib/utils'
import { Button, Form, FormProps, Image, Input } from 'antd'
import React, { useState } from 'react'

type TestFormProps = FormProps & {}

const TestForm: React.FC<TestFormProps> = (props) => {
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const handleSubmit = (values: any) => {
    console.log(values?.content)
    setContent(values?.content)
  }

  const handleGetThumbnail = (values: any) => {
    console.log(values)
    setThumbnail(getThumbnailFromYoutubeUrl(values?.url))
  }

  return (
    <>
      <div className="mt-[16px] mb-[8px] font-bold">1. Tiptap Editor</div>
      <div className="flex items-start gap-[12px]">
        <Form
          className="flex-1"
          onFinish={handleSubmit}
          layout="vertical"
          {...props}
        >
          <Form.Item name="content" valuePropName="content">
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

      <div className="mt-[16px] mb-[8px] font-bold">
        2. Get Thumbnail From Youtube URL
      </div>
      <div className="flex items-start gap-[12px]">
        <Form
          className="flex-1"
          onFinish={handleGetThumbnail}
          layout="vertical"
          {...props}
        >
          <Form.Item name="url">
            <Input placeholder="Nhập link youtube" allowClear />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="flex-1 rounded-lg border p-[12px]">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt="thumbnail"
              className="h-auto w-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TestForm
