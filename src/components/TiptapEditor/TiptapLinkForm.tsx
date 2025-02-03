'use client'

import { LinkOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type TiptapLinkProps = {
  onAdd?: (url: string) => void
}

const TiptapLinkForm: React.FC<TiptapLinkProps> = ({ onAdd }) => {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [form] = Form.useForm()

  const urlModalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (values: any) => {
    const { url } = values

    onAdd?.(url)

    setShowLinkInput(false)
  }

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (buttonRef.current && e.composedPath().includes(buttonRef.current))
      return

    if (
      urlModalRef.current &&
      !e.composedPath().includes(urlModalRef.current)
    ) {
      setShowLinkInput(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!showLinkInput) {
      form.resetFields()
    }
  }, [showLinkInput])

  return (
    <div className="relative">
      <div
        className="flex size-[32px] cursor-pointer items-center justify-center rounded-[6px] bg-transparent transition-all hover:bg-[#0000000a]"
        ref={buttonRef}
        onClick={() => setShowLinkInput(!showLinkInput)}
      >
        <LinkOutlined className="text-[14px]" />
      </div>
      <div
        className={clsx(
          'absolute right-1/2 top-[100%] translate-x-1/2 rounded-[8px] border border-[#e5e5e5] bg-[#fff] p-[12px] transition-all',
          {
            'visible h-0 opacity-0': !showLinkInput,
            'z-10 h-auto opacity-100': showLinkInput,
          },
        )}
        ref={urlModalRef}
      >
        <Form
          className="flex items-center gap-[8px]"
          onFinish={handleSubmit}
          form={form}
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
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default TiptapLinkForm
