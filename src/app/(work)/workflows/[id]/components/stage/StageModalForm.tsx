'use client'

import { InitializedMDXEditor } from '@/components'
import { withApp } from '@/hoc'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { App, Form, FormInstance, Input, Modal, ModalProps } from 'antd'
import { useParams } from 'next/navigation'
import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Converter } from 'showdown'
import { addStageAction, editStageAction } from '../../../action'
import { StageContext } from '../WorkflowPageLayout'

type StageModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  query?: any
  action?: 'edit' | 'create'
}

const StageModalForm: React.FC<StageModalFormProps> = ({
  children,
  initialValues,
  query,
  title,
  action = 'create',
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const params = useParams()
  const { setStages, isAuth } = useContext(StageContext)
  const { message } = App.useApp()
  const editorRef = useRef<MDXEditorMethods>(null)
  const converter = new Converter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      if (action === 'edit') {
        var { errors, index } = await editStageAction(query?.stage_id, {
          ...formData,
          description: converter.makeHtml(formData?.description),
          workflow_id: params?.id,
        })

        setStages((prev: any[]) => {
          const newStages = [...prev]

          return newStages.map((stage: any) => {
            if (stage?.id === `stage_${query?.stage_id}`) {
              return {
                ...stage,
                ...formData,
                workflow_id: params?.id,
                id: query?.stage_id,
              }
            }

            return stage
          })
        })
      } else {
        var { errors, id, index } = await addStageAction(
          {
            ...formData,
            description: converter.makeHtml(formData?.description),
            workflow_id: params?.id,
          },
          query,
        )

        setStages((prev: any[]) => {
          if (query?.right && query?.index) {
            const currentIndex = prev?.findIndex(
              (s: any) => s?.index === query?.index,
            )

            return [
              ...prev.slice(0, currentIndex + 1),
              {
                ...formData,
                workflow_id: params?.id,
                id,
                index,
              },
              ...prev.slice(currentIndex + 1),
            ]
          }

          return [
            {
              ...formData,
              workflow_id: params?.id,
              id,
              index,
            },
            ...prev,
          ]
        })
      }

      if (errors) {
        formRef.current?.setFields(
          Object.keys(errors).map((k: any) => ({
            name: k,
            errors: errors[k],
          })),
        )

        setLoading(false)
        return false
      }

      toast.success(
        action === 'edit' ? 'Cập nhật thành công' : 'Thêm thành công',
      )
      setOpen(false)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  const { description, ...restInitialValues } = initialValues || {}

  useLayoutEffect(() => {
    setTimeout(() => {
      editorRef.current?.setMarkdown(description || '')
    }, 100)
  }, [open, description])

  return (
    <>
      <div
        onClick={() => {
          if (!isAuth) {
            message.error('Bạn không có quyền tạo giai đoạn')
            return
          }

          setOpen(true)
        }}
      >
        {children}
      </div>
      <Modal
        title={title || 'THÊM 1 GIAI ĐOẠN MỚI VÀO LUỒNG CÔNG VIỆC'}
        open={open}
        onCancel={() => setOpen(false)}
        width={700}
        cancelText="Bỏ qua"
        okText={action === 'edit' ? 'Cập nhật' : 'Tạo giai đoạn mới'}
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        modalRender={(dom) => (
          <Form
            ref={formRef}
            initialValues={restInitialValues}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
        destroyOnClose
        {...rest}
      >
        <Form.Item className="hidden" name="workflow_id">
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên giai đoạn *"
          rules={[
            {
              required: true,
              message: 'Nhập tên giai đoạn.',
            },
          ]}
        >
          <Input placeholder="Tên giai đoạn" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown={converter.makeMarkdown(description || '')}
            placeholder="Mô tả giai đoạn"
          />
        </Form.Item>
        <Form.Item
          name="expired_after_hours"
          label="Thời gian dự kiến"
          rules={[
            {
              pattern: /[0-9]/,
              message: 'Vui lòng nhập dạng số.',
            },
          ]}
        >
          <Input placeholder="Thời gian (giờ)" />
        </Form.Item>
      </Modal>
    </>
  )
}

export default withApp(StageModalForm)
