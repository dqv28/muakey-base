'use client'

import { CheckInSwitchForms } from '@/components'
import { withApp } from '@/hoc'
import { convertToSlug } from '@/libs/utils'
import { App, Form, FormInstance, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { addProposeAction } from './action'
import RequestSelectModal from './RequestSelectModal'

type RequestModalFormProps = {
  children?: React.ReactNode
  groups?: any[]
  options?: any
  initialGroupId?: number
}

const RequestModalForm: React.FC<RequestModalFormProps> = ({
  children,
  groups,
  options,
  initialGroupId,
}) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [group, setGroup] = useState<any>()

  const formRef = useRef<FormInstance>(null)
  const { message } = App.useApp()
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    const { check_in, check_out, timestamps, type, date, ...restFormData } =
      formData

    const holiday = timestamps?.map((t: any) => {
      if (date) {
        const day = String(dayjs(date).format('YYYY-MM-DD'))

        return {
          start_date:
            `${day} ${t?.from ? String(dayjs(t?.from).format('HH:mm:ss')) : ''}`.trim(),
          end_date:
            `${day} ${t?.from ? String(dayjs(t?.to).format('HH:mm:ss')) : ''}`.trim(),
        }
      }

      return {
        start_date:
          `${String(dayjs(t?.startDate).format('YYYY-MM-DD'))} ${t?.startTime ? String(dayjs(t?.startTime).format('HH:mm:ss')) : ''}`.trim(),
        end_date:
          `${String(dayjs(t?.endDate).format('YYYY-MM-DD'))} ${t?.endTime ? String(dayjs(t?.endTime).format('HH:mm:ss')) : ''}`.trim(),
      }
    })

    try {
      const { message: msg, errors } = await addProposeAction(
        check_in && check_out
          ? {
              name: 'Sửa giờ vào ra',
              start_time:
                `${String(dayjs(date).format('YYYY-MM-DD'))} ${check_in ? String(dayjs(check_in).format('HH:mm:ss')) : ''}`.trim(),
              end_time:
                `${String(dayjs(date).format('YYYY-MM-DD'))} ${check_out ? String(dayjs(check_out).format('HH:mm:ss')) : ''}`.trim(),
              propose_category_id: 6,
            }
          : {
              ...restFormData,
              name: type || 'Đăng ký OT',
              propose_category_id: type ? 5 : 4,
              holiday,
            },
      )

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
    formRef.current?.resetFields()

    setFormOpen(group !== undefined)
  }, [group])

  useEffect(() => {
    if (initialGroupId) {
      const gr = groups?.find((g: any) => g?.id === initialGroupId)

      setGroup({
        name: gr?.name,
        id: +gr?.id,
      })
    }
  }, [])

  return (
    <>
      <div
        onClick={() => {
          if (group) {
            setOpen(true)
          } else {
            setFormOpen(true)
          }
        }}
      >
        {children}
      </div>
      <Modal
        open={formOpen}
        onCancel={() => {
          setFormOpen(false)
          setGroup(undefined)
          // setOpen(true)
        }}
        title={initialGroupId ? 'SỬA ĐỀ XUẤT' : 'TẠO ĐỀ XUẤT MỚI'}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            initialValues={{
              propose_category_id:
                group?.name === 'Khác'
                  ? undefined
                  : initialGroupId || group?.id,
              type: 'Nghỉ không hưởng lương',
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
        width={1000}
      >
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
                if (!Array.isArray(option)) {
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

        <CheckInSwitchForms
          params={{
            type: convertToSlug(group?.name || ''),
            initialValues: {
              mode: 'modal',
            },
          }}
        />
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
