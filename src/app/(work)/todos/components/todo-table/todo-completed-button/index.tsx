'use client'

import { withApp } from '@/hoc'
import { App, Button } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { markTodoCompletedAction } from '../action'

type TodoCompletedButtonProps = {
  todoId: number
}

const TodoCompletedButton: React.FC<TodoCompletedButtonProps> = ({
  todoId,
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { message, modal } = App.useApp()
  const router = useRouter()

  const handleMarkTodoCompleted = async (id: number) => {
    setLoading(true)

    try {
      const { message: msg, errors } = await markTodoCompletedAction(id)

      if (errors) {
        message.error(msg)
        setLoading(false)
        setOpen(false)
        return
      }

      message.success('Đã hoàn thành.')
      setLoading(false)
      setOpen(false)
      router.refresh()
    } catch (error) {
      throw new Error(String(error))
    }
  }

  return (
    <Button
      type="primary"
      onClick={() => {
        modal.confirm({
          title: 'Xác nhận',
          content: 'Đánh dấu hoàn thành nhiệm vụ này?',
          open,
          okButtonProps: {
            loading,
          },
          onCancel: () => setOpen(false),
          onOk: () => handleMarkTodoCompleted(todoId),
        })
      }}
    >
      Đánh dấu hoàn thành
    </Button>
  )
}

export default withApp(TodoCompletedButton)
