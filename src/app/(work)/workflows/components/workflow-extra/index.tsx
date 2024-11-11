'use client'

import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  ModalProps,
  toast,
} from '@/ui'
import { PlusOutlined } from '@/ui/icons'
import { useRouter } from 'next/navigation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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
        for (const key in error) {
          formRef.current?.setError(key, {
            message: error[key],
          })
        }

        return false
      }

      toast.success(success)
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    formRef.current?.reset()
    setValue('')
  }, [open])

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

  return (
    <>
      <Button
        className="!p-[10px] !text-[12px] text-[#fff]"
        icon={<PlusOutlined className="text-[16px]" />}
        color="primary"
        onClick={(e) => setOpen(true)}
      >
        Tạo mới danh mục
      </Button>
      <Modal
        title="TẠO DANH MỤC MỚI"
        open={open}
        onOpenChange={(o) => setOpen(o)}
        width={760}
        okButtonProps={{
          children: 'Tạo danh mục mới',
          size: 'large',
          onClick: () => {
            formRef.current?.submit()
          },
        }}
        cancelButtonProps={{
          children: 'Bỏ qua',
          size: 'large',
          onClick: () => setOpen(false),
        }}
      >
        <Form onSubmit={handleSubmit} formRef={formRef}>
          <Form.Item
            name="name"
            label={
              <span className="inline-block w-[130px]">
                Tên luồng công việc
              </span>
            }
            type="horizontal"
            rules={{
              required: 'Nhập hộ cái tên luồng.',
            }}
          >
            <Input placeholder="Tên luồng công việc" />
          </Form.Item>

          <Form.Item
            name="members"
            label={<span className="inline-block w-[130px]">Thành viên</span>}
            type="horizontal"
            rules={{
              required: 'Nhập thành viên.',
            }}
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
        </Form>
      </Modal>
    </>
  )
}

export default WorkflowExtra
