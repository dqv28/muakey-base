'use client'

import { PlusOutlined } from '@/ui/icons'
import { Button, Form, FormInstance, Input, Modal, ModalProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { addWorkflowCategoryAction, getAccountAction } from '../../action'
import SuggestInput from '../SuggestInput'

type WorkflowExtraProps = ModalProps

const WorkflowExtra: React.FC<WorkflowExtraProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [value, setValue] = useState('')
  const [accounts, setAccounts] = useState([])

  const formRef = useRef<FormInstance>(null)
  const suggestInputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const handleSubmit = async (formData: any) => {
    try {
      const { error, success } = await addWorkflowCategoryAction({
        ...formData,
        members: value,
      })

      if (error) {
        const nameList = Object.keys(error)

        formRef.current?.setFields(
          nameList.map((name: string) => ({
            name,
            errors: [error?.[name]],
          })),
        )

        return
      }

      toast.success(success)
      setOpen(false)

      if (typeof window !== undefined) {
        window.location.reload()
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        suggestInputRef.current &&
        !suggestInputRef.current.contains(e.target as Node)
      ) {
        setTagOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open) {
      setValue('')
    }
  }, [open])

  return (
    <>
      <Button
        className="!p-[10px] !text-[12px] text-[#fff]"
        icon={<PlusOutlined className="text-[16px]" />}
        type="primary"
        onClick={(e) => setOpen(true)}
      >
        Tạo mới danh mục
      </Button>
      <Modal
        title="TẠO DANH MỤC MỚI"
        open={open}
        onCancel={() => setOpen(false)}
        width={760}
        okText="Tạo danh mục mới"
        cancelText="Bỏ qua"
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            onFinish={handleSubmit}
            ref={formRef}
            clearOnDestroy
            layout="vertical"
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Tên luồng công việc"
          rules={[
            {
              required: true,
              message: 'Nhập tên luồng.',
            },
          ]}
        >
          <Input placeholder="Tên luồng công việc" />
        </Form.Item>

        <Form.Item
          name="members"
          label="Thành viên"
          rules={[
            {
              required: true,
              message: 'Chọn thành viên',
            },
          ]}
        >
          <SuggestInput
            value={value}
            test={value}
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

export default WorkflowExtra
