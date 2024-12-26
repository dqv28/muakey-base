import { InitializedMDXEditor } from '@/components'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { Form, FormInstance, Input, Modal, ModalProps, Select } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Converter } from 'showdown'

type TaskReportsModalFormProps = Pick<
  ModalProps,
  'open' | 'onCancel' | 'onOk'
> & {
  onSubmit?: (values: any) => void
  reports?: any
}

const TaskReportsModalForm: React.FC<TaskReportsModalFormProps> = ({
  onSubmit,
  onOk,
  reports,
  ...rest
}) => {
  const formRef = useRef<FormInstance>(null)
  const editorRef = useRef<MDXEditorMethods>(null)
  const converter = new Converter()

  const reportsAsParagraph = reports?.filter(
    (field: any) => field?.type === 'paragraph',
  )

  const initFormData = Object.fromEntries(
    reports?.length >= 0
      ? reports?.map((field: any) => [field?.id, field?.value || ''])
      : [],
  )

  useEffect(() => {
    for (const report of reportsAsParagraph) {
      editorRef.current?.setMarkdown(report.value || '')
    }
  }, [reportsAsParagraph])

  const renderFieldInput = (
    type: string,
    fieldName: string,
    fieldId: number,
    options: any,
  ) => {
    switch (type) {
      case 'list':
        return <Select placeholder={`Báo cáo ${fieldName}`} options={options} />

      case 'paragraph':
        return (
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown={converter.makeMarkdown(initFormData[fieldId] || '')}
            placeholder={`Báo cáo ${fieldName}`}
          />
        )

      default:
        return <Input placeholder={`Báo cáo ${fieldName}`} />
    }
  }

  return (
    <Modal
      title="BÁO CÁO GIAI ĐOẠN"
      onOk={() => {
        formRef.current?.submit()
      }}
      modalRender={(dom) => (
        <Form
          ref={formRef}
          onFinish={onSubmit}
          layout="vertical"
          initialValues={initFormData}
        >
          {dom}
        </Form>
      )}
      destroyOnClose
      width={700}
      {...rest}
    >
      {reports?.length >= 0 &&
        reports?.map((field: any) => {
          const options = field?.options?.map((f: string) => ({
            label: f,
            value: f,
          }))

          return (
            <Form.Item
              label={field?.name}
              name={field?.id}
              key={field?.id}
              rules={[
                {
                  required: field?.require === 1,
                  message: `Nhập ${field?.name}`,
                },
              ]}
            >
              {renderFieldInput(field?.type, field?.name, field?.id, options)}
            </Form.Item>
          )
        })}
    </Modal>
  )
}

export default TaskReportsModalForm
