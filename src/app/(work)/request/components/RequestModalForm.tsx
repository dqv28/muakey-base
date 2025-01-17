'use client'

import { InitializedMDXEditor } from '@/components'
import { withApp } from '@/hoc'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { App, Form, FormInstance, Input, Modal, Select } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import RequestSelectModal from './RequestSelectModal'
import { addProposeAction } from './action'

type RequestModalFormProps = {
  children?: React.ReactNode
  groups?: any[]
  options?: any
}

const RequestModalForm: React.FC<RequestModalFormProps> = ({
  children,
  groups,
  options,
}) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [group, setGroup] = useState<any>()

  const editorRef = useRef<MDXEditorMethods>(null)
  const formRef = useRef<FormInstance>(null)
  const { message } = App.useApp()
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message: msg, errors } = await addProposeAction(formData)

      if (errors) {
        message.success(msg)
        setLoading(false)
        return
      }

      message.success('Gửi thành công')
      setLoading(false)
      setFormOpen(false)
      router.refresh()
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  useEffect(() => {
    if (group?.name === 'Khác') {
      formRef.current?.resetFields()
    }

    setFormOpen(group !== undefined)
  }, [group])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        open={formOpen}
        onCancel={() => {
          setFormOpen(false)
          setGroup(undefined)
          // setOpen(true)
        }}
        title="TẠO ĐỀ XUẤT MỚI"
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            initialValues={{
              propose_category_id:
                group?.name === 'Khác' ? undefined : group?.id,
            }}
            onFinish={handleSubmit}
            ref={formRef}
          >
            {dom}
          </Form>
        )}
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        okText="Gửi đề xuất"
        cancelText="Quay lại"
        width={760}
      >
        <Form.Item
          label="Tên đề xuất"
          name="name"
          rules={[
            {
              required: true,
              message: 'Nhập tên đề xuất',
            },
          ]}
        >
          <Input placeholder="Tên đề xuất" />
        </Form.Item>

        <Form.Item
          label="Nhóm đề xuất"
          name="propose_category_id"
          rules={[
            {
              required: true,
              message: 'Lựa chọn nhóm đề xuất',
            },
          ]}
        >
          {group?.name !== 'Khác' ? (
            <Select
              placeholder="-- Lựa chọn nhóm đề xuất --"
              options={groups?.map((g: any) => ({
                label: g?.name,
                value: g?.id,
              }))}
              onChange={(_, option) => {
                if (!Array.isArray(option) && option?.label === 'Khác') {
                  setGroup({
                    name: option?.label,
                    id: +option?.value,
                  })
                }
              }}
            />
          ) : (
            <Input placeholder="Nhập nhóm đề xuất" />
          )}
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown=""
            placeholder="Mô tả đề xuất"
          />
        </Form.Item>
      </Modal>

      <RequestSelectModal
        open={open}
        dataSource={groups}
        onItemClick={setGroup}
        onCancel={() => setOpen(false)}
        isAdmin={options?.role === 'Admin lv2'}
      />
    </>
  )
}

export default withApp(RequestModalForm)
