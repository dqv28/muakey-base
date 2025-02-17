import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import { Button, Divider, Form, FormInstance, Input } from 'antd'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

type TiptapLinkActionProps = {
  editor: Editor
  href: string
  onEdit?: (href: string) => void
}

const TiptapLinkAction: React.FC<TiptapLinkActionProps> = ({
  editor,
  href,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const formRef = useRef<FormInstance>(null)

  const handleSubmit = ({ url }: any) => {
    onEdit?.(url)
    formRef.current?.resetFields()
    setIsEdit(false)
  }

  const focusLink = editor.isActive('link')

  useEffect(() => {
    if (!focusLink) {
      setIsEdit(false)
    }
  }, [focusLink])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('url', href)
    }
  }, [isEdit])

  return (
    <>
      {isEdit ? (
        <Form
          className="flex items-center gap-[8px]"
          onFinish={handleSubmit}
          ref={formRef}
          initialValues={{
            url: href,
          }}
        >
          <Form.Item className="!mb-0 w-[232px]" name="url">
            <Input
              className="h-[32px] border-none bg-[#f5f5f5]"
              prefix={<LinkOutlined />}
              placeholder="Nhập url"
            />
          </Form.Item>
          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex items-center gap-[4px]">
          <Link
            className="inline-block text-[#1677ff] underline"
            href={href || ''}
            target="_blank"
          >
            {href}
          </Link>

          <Divider type="vertical" />

          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => setIsEdit(true)}
          />

          <Button
            icon={<DeleteOutlined />}
            type="text"
            onClick={() =>
              editor.chain().focus().extendMarkRange('link').unsetLink().run()
            }
          />
        </div>
      )}
    </>
  )
}

export default TiptapLinkAction
