'use client'

import { Button, Form, FormInstance, Input, Modal, Select } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addReportFieldAction, updateReportFieldAction } from '../../../action'

type ReportFieldsModalFormProps = {
  children?: React.ReactNode
  options?: any
  action?: 'create' | 'edit'
}

const ReportFieldsModalForm: React.FC<ReportFieldsModalFormProps> = ({
  children,
  options,
  action = 'create',
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const { stages, initialValues, fieldId } = options
  const params = useParams()
  const formRef = useRef<FormInstance>(null)
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      if (action === 'create') {
        var { errors } = await addReportFieldAction({
          ...formData,
          workflow_id: Number(params?.id),
          stage_id: +String(formData?.stage_id).split('_')[1],
        })
      } else {
        var { errors } = await updateReportFieldAction(fieldId, {
          ...formData,
          workflow_id: Number(params?.id),
          stage_id: +String(formData?.stage_id).split('_')[1],
        })
      }

      if (errors) {
        if (typeof errors === 'string') {
          toast.error(errors)
        } else {
          formRef.current?.setFields(
            Object.keys(errors).map((k: any) => ({
              name: k,
              errors: errors[k],
            })),
          )
        }

        setLoading(false)
        return
      }

      toast.success(
        action === 'create' ? 'Thêm thành công' : 'Cập nhật thành công',
      )
      setOpen(false)
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  const initStageId = initialValues?.stage_id
    ? `stage_${initialValues?.stage_id}`
    : stages?.[0]?.id

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={
          action === 'create'
            ? 'THÊM TRƯỜNG DỮ LIỆU BÁO CÁO'
            : 'CHỈNH SỬA TRƯỜNG DỮ LIỆU BÁO CÁO'
        }
        open={open}
        width={520}
        footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <Form
          onFinish={handleSubmit}
          labelCol={{ flex: '24px' }}
          wrapperCol={{ flex: 1 }}
          initialValues={{
            ...initialValues,
            stage_id: initStageId,
          }}
          ref={formRef}
        >
          <Form.Item
            label="Loại dữ liệu"
            name="type"
            rules={[
              {
                required: true,
                message: 'Chọn 1 loại dữ liệu.',
              },
            ]}
            layout="vertical"
            initialValue="number"
          >
            <Select
              className="w-full"
              options={[
                { value: 'number', label: 'Số nguyên' },
                { value: 'paragraph', label: 'Văn bản' },
                { value: 'date', label: 'Ngày' },
                { value: 'list', label: 'Danh sách' },
              ]}
              onChange={(value) => setType(value)}
            />
          </Form.Item>
          <Form.Item
            label="Tên trường dữ liệu"
            name="name"
            rules={[
              {
                required: true,
                message: 'Nhập tên trường dữ liệu.',
              },
            ]}
            layout="vertical"
          >
            <Input placeholder="Tên trường dữ liệu" />
          </Form.Item>
          <Form.Item
            label="Giải thích trường dữ liệu"
            name="description"
            layout="vertical"
          >
            <Input placeholder="Một số ký tự đặc biệt không hỗ trợ, ví dụ: < > ;" />
          </Form.Item>
          {type === 'list' && (
            <Form.Item
              label="Các lựa chọn cách nhau bởi dấu phẩy"
              name="options"
              rules={[
                {
                  required: true,
                  message: 'Nhập lựa chọn.',
                },
              ]}
              layout="vertical"
            >
              <Input placeholder="Một số ký tự đặc biệt không hỗ trợ, ví dụ: < > ;" />
            </Form.Item>
          )}
          <Form.Item
            label="Trường bắt buộc"
            name="require"
            layout="vertical"
            initialValue={false}
          >
            <Select
              className="w-full"
              options={[
                { value: false, label: 'Không bắt buộc' },
                { value: true, label: 'Bắt buộc trả lời' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Liên kết"
            name="stage_id"
            rules={[
              {
                required: true,
                message: 'Chọn 1 loại dữ liệu.',
              },
            ]}
            layout="vertical"
            initialValue={initStageId}
          >
            <Select
              className="w-full"
              options={stages?.map((stage: any) => ({
                value: stage?.id,
                label: stage?.name,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center gap-[16px]">
              <Button className="flex-1" onClick={() => setOpen(false)}>
                Bỏ qua
              </Button>
              <Button
                className="flex-1"
                color="primary"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                {action === 'create' ? 'Thêm trường mới' : 'Cập nhật'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ReportFieldsModalForm
