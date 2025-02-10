'use client'

import { CloseOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteTagAction } from '../action'

const TagDeleteButton: React.FC<
  ButtonProps & {
    tagId: number
    onDelete?: () => void
  }
> = ({ tagId, onDelete, ...rest }) => {
  const [tagDeleteLoading, setTagDeleteLoading] = useState(false)

  const handleDelete = async (id: number) => {
    setTagDeleteLoading(true)

    try {
      const { errors, message } = await deleteTagAction(id)

      if (errors) {
        setTagDeleteLoading(false)
        toast.error(message)
        return
      }

      setTagDeleteLoading(false)
      onDelete?.()
    } catch (error) {
      setTagDeleteLoading(false)
      throw new Error(String(error))
    }
  }

  return (
    <Button
      className="!p-0"
      icon={<CloseOutlined className="text-[12px] text-[#777]" />}
      type="text"
      loading={tagDeleteLoading}
      onClick={(e) => {
        e.stopPropagation()
        handleDelete(Number(tagId))
      }}
      {...rest}
    />
  )
}

export default TagDeleteButton
