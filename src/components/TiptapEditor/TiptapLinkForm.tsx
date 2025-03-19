'use client'

import { LinkOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type TiptapLinkProps = {
  onAdd?: (url: string) => void
}

const TiptapLinkForm: React.FC<TiptapLinkProps> = ({ onAdd }) => {
  const [linkInput, setLinkInput] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  const urlModalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleAdd = (url: string) => {
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
      setLinkInput('')
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
          'absolute top-[100%] right-1/2 flex h-[58px] w-[333px] translate-x-1/2 items-center gap-[8px] rounded-[8px] border border-[#e5e5e5] bg-[#fff] p-[12px] transition-all',
          {
            'visible h-0 opacity-0': !showLinkInput,
            'z-10 h-auto opacity-100': showLinkInput,
          },
        )}
        ref={urlModalRef}
      >
        <Input
          className="h-[32px] flex-1 border-none bg-[#f5f5f5]"
          prefix={<LinkOutlined />}
          placeholder="Nhập url"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
        />
        <Button
          className="w-[70px]"
          type="primary"
          onClick={() => handleAdd(linkInput)}
        >
          Thêm
        </Button>
      </div>
    </div>
  )
}

export default TiptapLinkForm
