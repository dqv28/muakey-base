'use client'

import { EditOutlined, EnterOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import TagDeleteButton from '../TagDeleteButton'

type TagOptionProps = {
  option?: any
  onDelete?: () => void
  onEdit?: (values: any) => void
}

const TagOption: React.FC<TagOptionProps> = ({ option, onDelete, onEdit }) => {
  const { data } = option

  const [editable, setEditable] = useState(false)
  const [tagName, setTagName] = useState(
    String(option?.label).split('-')[0] || '',
  )
  const [tagColor, setTagColor] = useState(data?.code_color || '')

  return (
    <div className="group relative flex min-h-[32px] items-center gap-[16px]">
      <div className="flex w-full flex-1 items-center gap-[8px]">
        {editable ? (
          <>
            <Input
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              onClick={(e) => e?.stopPropagation()}
            />
            <Input
              value={tagColor}
              onChange={(e) => setTagColor(e.target.value)}
              onClick={(e) => e?.stopPropagation()}
            />
          </>
        ) : (
          <>
            <div
              className="size-[24px] rounded-[4px]"
              style={{
                backgroundColor: data?.code_color || '#888',
              }}
            />
            <div className="line-clamp-1 inline-block w-[calc(100%-68px)]">
              {String(option?.label).split('-')[0]}
            </div>
          </>
        )}
      </div>
      {editable ? (
        <Button
          icon={<EnterOutlined className="text-[12px] text-[#777]" />}
          type="text"
          onClick={(e) => {
            e.stopPropagation()
            setEditable(false)
            onEdit?.({
              id: option?.value,
              title: tagName,
              color: tagColor,
            })
          }}
        />
      ) : (
        <div className="visible z-[10020] flex !size-[16px] items-center gap-[8px] opacity-0 transition-all group-hover:opacity-100">
          <>
            <Button
              className="absolute right-[44px] !p-0"
              icon={<EditOutlined className="text-[12px] text-[#777]" />}
              type="text"
              onClick={(e) => {
                e.stopPropagation()
                setEditable(true)
              }}
            />
            <TagDeleteButton
              className="absolute right-[8px]"
              tagId={Number(option?.value)}
              onDelete={onDelete}
            />
          </>
        </div>
      )}
    </div>
  )
}

export default TagOption
