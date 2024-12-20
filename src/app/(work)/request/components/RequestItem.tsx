'use client'

import { CloseOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons'
import { Input, List, Popconfirm } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type RequestItemProps = {
  item?: any
  onDelete?: () => void
  onEdit?: (values: any) => void
}

const RequestItem: React.FC<RequestItemProps> = ({
  item,
  onDelete,
  onEdit,
}) => {
  const [editable, setEditable] = useState(false)
  const [values, setValues] = useState<any>({
    name: item?.name || '',
    description: item?.description || '',
  })
  const nameRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      nameRef.current &&
      !e.composedPath().includes(nameRef.current) &&
      descriptionRef.current &&
      !e.composedPath().includes(descriptionRef.current)
    ) {
      setEditable(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <List.Item.Meta
      className="px-[24px]"
      title={
        <div
          className="flex items-start justify-between gap-[12px]"
          ref={nameRef}
        >
          {editable ? (
            <Input
              className="w-[400px]"
              defaultValue={values?.name}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setValues((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
          ) : (
            <span>{values?.name}</span>
          )}
          <div
            className="flex items-center gap-[4px]"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Popconfirm
              title="Xóa nhóm đề xuất?"
              description="Xác nhận xóa nhóm đề xuất này?"
              onConfirm={(e) => {
                e?.stopPropagation()
                onDelete?.()
              }}
              onCancel={(e) => e?.stopPropagation()}
              okText="Xác nhận"
              cancelText="Hủy bỏ"
            >
              <CloseOutlined className="visible p-[6px] opacity-0 transition-all group-hover:opacity-100" />
            </Popconfirm>
            {!editable ? (
              <EditOutlined
                className="text-[#1677ff]"
                onClick={() => setEditable(true)}
              />
            ) : (
              <EnterOutlined
                className="text-[#1677ff]"
                onClick={() => {
                  onEdit?.(values)
                  setEditable(false)
                }}
              />
            )}
          </div>
        </div>
      }
      description={
        <div ref={descriptionRef}>
          {editable ? (
            <Input
              className="w-[400px]"
              defaultValue={values?.description}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setValues((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }}
            />
          ) : (
            <span>{values?.description}</span>
          )}
        </div>
      }
    />
  )
}

export default RequestItem
