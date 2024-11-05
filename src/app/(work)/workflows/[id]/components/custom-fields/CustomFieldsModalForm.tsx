'use client'

import { Button, Form, Input, Modal, Select } from 'antd'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addTaskFieldsAction, editCustomFieldAction } from '../../../action'

type CustomFieldsModalFormProps = {
  children?: React.ReactNode
  options?: any
  action?: 'create' | 'edit'
}

const CustomFieldsModalForm: React.FC<CustomFieldsModalFormProps> = ({
  children,
  options,
  action = 'create',
}) => {
  const [open, setOpen] = useState(false)
  const { stages, initialValues, fieldId } = options
  const params = useParams()

  const handleSubmit = async (formData: any) => {
    try {
      if (action === 'create') {
        var { error, success } = await addTaskFieldsAction({
          ...formData,
          workflow_id: Number(params?.id),
        })
      } else {
        var { error, success } = await editCustomFieldAction(fieldId, {
          ...formData,
          workflow_id: Number(params?.id),
        })
      }

      if (error) {
        toast.error(error)
        setOpen(false)
        return
      }

      toast.success(success)
      setOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={
          action === 'create'
            ? 'THÊM TRƯỜNG DỮ LIỆU TÙY CHỈNH'
            : 'CHỈNH SỬA TRƯỜNG DỮ LIỆU TÙY CHỈNH'
        }
        open={open}
        width={520}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form
          onFinish={handleSubmit}
          labelCol={{ flex: '24px' }}
          wrapperCol={{ flex: 1 }}
          initialValues={initialValues}
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
          >
            <Select
              className="w-full"
              defaultValue="number"
              options={[
                { value: 'number', label: 'Số nguyên' },
                { value: 'paragraph', label: 'Văn bản' },
                { value: 'date', label: 'Ngày' },
                { value: 'file', label: 'Tập tin' },
                { value: 'list', label: 'Danh sách' },
              ]}
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
          <Form.Item label="Trường bắt buộc" name="require" layout="vertical">
            <Select
              className="w-full"
              defaultValue={false}
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
          >
            <Select
              className="w-full"
              defaultValue={initialValues?.stage_id ?? stages?.[0]?.id}
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

export default CustomFieldsModalForm
