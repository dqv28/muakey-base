'use client'

import { Button, Form, FormInstance, Input, Modal, toast } from '@/ui'
import { PlusOutlined } from '@/ui/icons'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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

  const handleSubmit = async (formData: any) => {
    try {
      const { error, success } = await addWorkflowAction(formData)

      if (error) {
        for (const key in error) {
          formRef.current?.setError(key, {
            message: error[key],
          })
        }

        return false
      }

      toast.success(success)
      setOpen(false)
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
      formRef.current?.reset()
      setValue('')
    }
  }, [open])

  return (
    <>
      <Button
        className="z-10 !p-[10px] !text-[12px]"
        icon={<PlusOutlined className="text-[16px]" />}
        variant="outline"
        shape="pill"
        onClick={() => setOpen(true)}
      >
        Tạo mới workflow
      </Button>
      <Modal
        title="Tạo luồng công việc mới"
        open={open}
        onOpenChange={setOpen}
        width={760}
        okButtonProps={{
          children: 'Tạo luồng công việc mới',
          size: 'large',
          onClick: () => formRef.current?.submit(),
        }}
        cancelButtonProps={{
          children: 'Bỏ qua',
          size: 'large',
          onClick: () => setOpen(false),
        }}
      >
        <Form values={initialValues} formRef={formRef} onSubmit={handleSubmit}>
          <Form.Item name="workflow_category_id" className="hidden">
            <Input className="hidden" />
          </Form.Item>
          <Form.Item
            name="name"
            type="horizontal"
            label={
              <span className="inline-block w-[160px]">
                Tên luồng công việc
              </span>
            }
            rules={{
              required: {
                value: true,
                message: 'Nhập tên luồng công việc',
              },
            }}
          >
            <Input placeholder="Tên luồng công việc" />
          </Form.Item>
          <Form.Item
            name="description"
            type="horizontal"
            label={<span className="inline-block w-[160px]">Mô tả</span>}
          >
            <Input placeholder="Mô tả" />
          </Form.Item>
          <Form.Item
            name="manager"
            type="horizontal"
            label={
              <span className="inline-block w-[160px]">
                Thành viên quản trị
              </span>
            }
            rules={{
              required: 'Nhập thành viên quản trị',
            }}
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
        </Form>
      </Modal>
    </>
  )
}

export default WorkflowModalForm
