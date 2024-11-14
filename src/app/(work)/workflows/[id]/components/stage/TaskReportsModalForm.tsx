import { useAsyncEffect } from '@/libs/hook'
import { Form, FormInstance, Input, Modal, ModalProps, Select } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { getReportFieldsByWorkflowIdAction } from './action'

type TaskReportsModalFormProps = Pick<
  ModalProps,
  'open' | 'onCancel' | 'onOk'
> & {
  onSubmit?: (values: any) => void
  query?: any
}

const TaskReportsModalForm: React.FC<TaskReportsModalFormProps> = ({
  onSubmit,
  onOk,
  query,
  ...rest
}) => {
  const formRef = useRef<FormInstance>(null)
  const [fields, setFields] = useState([])
  const params = useParams()

  useAsyncEffect(async () => {
    const data = await getReportFieldsByWorkflowIdAction(
      Number(params?.id),
      query,
    )

    setFields(data)
  }, [query])

  useEffect(() => console.log(fields), [fields])

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
          initialValues={Object.entries(
            fields?.map((field: any) => ([
                field?.id, field?.value || null,
              ]
            )),
          )}
        >
          {dom}
        </Form>
      )}
      destroyOnClose
      {...rest}
    >
      {fields?.map((field: any) => {
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
              <Select placeholder={`Báo cáo ${field?.name}`} options={options} />
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
