import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import { Button, Divider, FormInstance, Input } from 'antd'
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
  const [linkInput, setLinkInput] = useState('')
  const formRef = useRef<FormInstance>(null)

  const handleAdd = (url: string) => {
    onEdit?.(url)

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
  }, [isEdit, href])

  return (
    <>
      {isEdit ? (
        <div className="flex items-center gap-[8px]">
          <Input
            className="h-[32px] flex-1 border-none bg-[#f5f5f5]"
            prefix={<LinkOutlined />}
            placeholder="Nhập url"
            defaultValue={href}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          <Button
            className="w-[70px]"
            type="primary"
            onClick={() => handleAdd(linkInput || href)}
          >
            Sửa
          </Button>
        </div>
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
