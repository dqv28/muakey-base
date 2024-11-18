import { Form, FormInstance, Input, Modal, ModalProps, Select } from 'antd'
import React, { useRef } from 'react'

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

  const initFormData =
    reports?.length >= 0
      ? reports?.map((field: any) => [[field?.id], field?.value])
      : []

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
          initialValues={Object.fromEntries(initFormData)}
        >
          {dom}
        </Form>
      )}
      destroyOnClose
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
              {field?.type === 'list' ? (
                <Select
                  placeholder={`Báo cáo ${field?.name}`}
                  options={options}
                />
              ) : (
                <Input placeholder={`Báo cáo ${field?.name}`} />
              )}
            </Form.Item>
          )
        })}
    </Modal>
  )
}

export default TaskReportsModalForm
