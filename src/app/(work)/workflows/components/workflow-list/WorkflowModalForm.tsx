'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, Input, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { addWorkflowAction, getAccountAction } from '../../action'
import SuggestInput from '../SuggestInput'

type WorkflowModalFormProps = {
  initialValues?: any
}

const WorkflowModalForm: React.FC<WorkflowModalFormProps> = ({
  initialValues,
}) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const [tagOpen, setTagOpen] = useState(false)
  const [value, setValue] = useState('')
  const [accounts, setAccounts] = useState([])
  const suggestInputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    try {
      const { error, success } = await addWorkflowAction(formData)

      if (error) {
        const nameList: string[] = Object.keys(error)

        formRef.current?.setFields(
          nameList.map((name) => ({
            name,
            errors: [error?.[name]],
          })),
        )

        return false
      }

      toast.success(success)
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setTagOpen(!!e.target.value)

    try {
      const data = await getAccountAction({
        username: e.target.value.split(' ').pop(),
      })

      setAccounts(data)
    } catch (error) {
      throw new Error('Đã xảy ra lỗi.')
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setValue('')
    }
  }, [open])

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined className="text-[16px]" />}
        onClick={() => setOpen(true)}
      >
        Tạo mới workflow
      </Button>
      <Modal
        title="Tạo luồng công việc mới"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => formRef.current?.submit()}
        width={760}
        okText="Tạo luồng công việc mới"
        cancelText="Bỏ qua"
        okButtonProps={{
          htmlType: 'submit',
        }}
        modalRender={(dom) => (
          <Form
            initialValues={initialValues}
            ref={formRef}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item name="workflow_category_id" className="hidden">
          <Input className="hidden" />
        </Form.Item>
        <Form.Item
          name="name"
          label={
            <span className="inline-block w-[160px]">Tên luồng công việc</span>
          }
          rules={[
            {
              required: true,
              message: 'Nhập tên luồng công việc',
            },
          ]}
        >
          <Input placeholder="Tên luồng công việc" />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span className="inline-block w-[160px]">Mô tả</span>}
        >
          <Input placeholder="Mô tả" />
        </Form.Item>
        <Form.Item
          name="manager"
          label={
            <span className="inline-block w-[160px]">Thành viên quản trị</span>
          }
          rules={[
            {
              required: true,
              message: 'Nhập thành viên quản trị',
            },
          ]}
        >
          <SuggestInput
            value={value}
            onChange={handleChange}
            suggestInputRef={suggestInputRef}
            suggestOpen={tagOpen}
            suggestItems={accounts}
            placeholder="Sử dụng @ để tag thành viên quản trị"
            autoComplete="off"
            onSuggestClick={(item) => {
              setValue((prev) => {
                const values = prev.split(' ')
                values.pop()
                values.push(item.username)
                return values.join(' ') + ' '
              })
              setTagOpen(false)
            }}
          />
        </Form.Item>
      </Modal>
    </>
  )
}

export default WorkflowModalForm
