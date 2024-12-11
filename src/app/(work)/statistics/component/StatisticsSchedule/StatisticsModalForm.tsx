'use client'

import { InitializedMDXEditor } from '@/components'
import { withApp } from '@/hoc'
import { useAsyncEffect } from '@/libs/hook'
import { PlusOutlined } from '@ant-design/icons'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { App, Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import React, { useRef, useState } from 'react'
import { addTodoAction, getAccountsAction } from './action'

type StatisticsModalFormProps = {}

const StatisticsModalForm: React.FC<StatisticsModalFormProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])
  const editorRef = useRef<MDXEditorMethods>(null)
  const { message } = App.useApp()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message: msg, errors } = await addTodoAction(formData)

      if (errors) {
        message.error(msg)
        return
      }

      setOpen(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  useAsyncEffect(async () => {
    const res = await getAccountsAction()

    setAccounts([...res])
  }, [])

  return (
    <>
      <Button
        className="my-[8px]"
        type="text"
        icon={<PlusOutlined className="text-[10px]" />}
        onClick={() => setOpen(true)}
      >
        Thêm công việc
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Thêm công việc"
        modalRender={(dom) => (
          <Form onFinish={handleSubmit} layout="vertical">
            {dom}
          </Form>
        )}
        width={760}
        okText="Thêm mới"
        cancelText="Bỏ qua"
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
      >
        <Form.Item name="name" label="Tên công việc">
          <Input placeholder="Tên công việc" />
        </Form.Item>
        <Form.Item
          rootClassName="min-h-[240px]"
          name="description"
          label="Mô tả"
        >
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown=""
            placeholder="Mô tả nhiệm vụ"
          />
        </Form.Item>
        <Form.Item name="account_id" label="Giao cho">
          <Select
            placeholder="-- Lựa chọn một người dưới đây --"
            options={[
              ...accounts?.map((acc: any) => ({
                label: acc?.full_name,
                value: acc?.id,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item name="expired" label="Thời hạn">
          <DatePicker className="w-full" placeholder="Thời hạn" />
        </Form.Item>
      </Modal>
    </>
  )
}

export default withApp(StatisticsModalForm)
