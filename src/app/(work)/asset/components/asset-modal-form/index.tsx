'use client'

import { TiptapEditor } from '@/components'
import { withApp } from '@/hoc'
import { useUpdateStore } from '@/stores/updateStore'
import {
  App,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Select,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAssetForm } from '../../hooks/useAssetForm'
import { addAssetAction, updateAssetAction } from './action'

export type AssetModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  title?: string
  formProps?: FormProps<any>
  onSuccess?: () => void
  action?: 'add' | 'edit'
}

const AssetModalForm: React.FC<AssetModalFormProps> = ({
  children,
  initialValues,
  title,
  formProps,
  onSuccess,
  action,
  ...modalProps
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { message } = App.useApp()
  const { updateResult, setUpdateResult } = useUpdateStore()

  const { statusOptions, categoryOptions, userOptions, brandOptions } =
    useAssetForm()

  // Xử lý các giá trị ngày trong initialValues
  const processedInitialValues = {
    ...initialValues,
    // Xử lý các trường ngày tháng
    buy_date: initialValues?.buy_date
      ? dayjs(initialValues.buy_date)
      : undefined,
    warranty_date: initialValues?.warranty_date
      ? dayjs(initialValues.warranty_date)
      : undefined,
    start_date: initialValues?.start_date
      ? dayjs(initialValues.start_date)
      : undefined,
    sell_date: initialValues?.sell_date
      ? dayjs(initialValues.sell_date)
      : undefined,
    // Xử lý các trường số
    price: initialValues?.price ? Number(initialValues.price) : undefined,
    sell_price: initialValues?.sell_price
      ? Number(initialValues.sell_price)
      : undefined,
    // Xử lý các trường select
    status: initialValues?.status || 'unused',
    asset_category_id: initialValues?.asset_category_id,
    account_id: initialValues?.account_id,
    brand_id: initialValues?.brand_id,
    // Xử lý các trường text
    name: initialValues?.name || '',
    code: initialValues?.code || '',
    serial_number: initialValues?.serial_number || '',
    note: initialValues?.note || '',
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      // Validate form

      const value = {
        ...values,
        id: initialValues.id,
      }

      // Chuẩn hóa ngày tháng
      const formatDate = (date: any) => date?.format('YYYY-MM-DD') || null
      console.log('value', value)
      const formData = {
        ...value,
        buy_date: formatDate(value.buy_date),
        warranty_date: formatDate(value.warranty_date),
        start_date: formatDate(value.start_date),
        sell_date: formatDate(value.sell_date),
      }

      // Xác định action (add / update)
      const actionFn = action === 'add' ? addAssetAction : updateAssetAction
      const successMessage =
        action === 'add'
          ? 'Thêm tài sản thành công'
          : 'Cập nhật tài sản thành công'

      // Gọi API
      const res = await actionFn(formData)
      setUpdateResult(res.data)

      if (!res.success) throw new Error(res.error || 'Có lỗi xảy ra')

      // Xử lý thành công
      message.success(successMessage)
      setOpen(false)
      form.resetFields()
      router.refresh()
      onSuccess?.()
    } catch (error: any) {
      // Xử lý lỗi
      console.error('Error:', error)
      message.error(
        error?.errorFields
          ? 'Vui lòng điền đầy đủ thông tin bắt buộc'
          : error.message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        title={title}
        open={open}
        afterClose={() => form.resetFields()}
        okText="Lưu"
        cancelText="Hủy"
        width={846}
        destroyOnClose
        okButtonProps={{
          htmlType: 'submit',
          className: 'w-[120px]',
          loading,
        }}
        cancelButtonProps={{
          className: 'w-[120px]',
        }}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            {...formProps}
            initialValues={processedInitialValues}
          >
            {dom}
          </Form>
        )}
        {...modalProps}
      >
        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="name"
            className="mb-[16px]! flex-1"
            name="name"
            label="Tên tài sản"
            rules={[
              { required: true, message: 'Tên tài sản là bắt buộc' },
              { max: 255, message: 'Tên tài sản không được quá 255 ký tự' },
            ]}
          >
            <Input placeholder="Nhập tên tài sản" />
          </Form.Item>
          <Form.Item
            key="code"
            className="mb-[16px]! flex-1"
            name="code"
            label="Mã tài sản"
            rules={[
              { required: true, message: 'Mã tài sản là bắt buộc' },
              { max: 50, message: 'Mã tài sản không được quá 50 ký tự' },
            ]}
          >
            <Input placeholder="Nhập mã tài sản" />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="status"
            className="mb-[16px]! flex-1"
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Trạng thái là bắt buộc' }]}
          >
            <Select options={statusOptions} placeholder="Chọn trạng thái" />
          </Form.Item>
          <Form.Item
            key="asset_category_id"
            className="mb-[16px]! flex-1"
            name="asset_category_id"
            label="Loại tài sản"
            rules={[{ required: true, message: 'Loại tài sản là bắt buộc' }]}
          >
            <Select options={categoryOptions} placeholder="Chọn loại tài sản" />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="serial_number"
            className="mb-[16px]! flex-1"
            name="serial_number"
            label="Số Serial"
          >
            <Input placeholder="Nhập số Serial" />
          </Form.Item>
          <Form.Item
            key="account_id"
            className="mb-[16px]! flex-1"
            name="account_id"
            label="Người sử dụng"
          >
            <Select placeholder="Chọn người sử dụng" options={userOptions} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="start_date"
            className="mb-[16px]! flex-1"
            name="start_date"
            label="Ngày bắt đầu sử dụng"
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
          <Form.Item
            key="time_used"
            className="mb-[16px]! flex-1"
            name="time_used"
            label="Thời gian sử dụng"
          >
            <Input placeholder="Tự động tính từ lúc đổi trạng thái" disabled />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="brand_id"
            className="mb-[16px]! flex-1"
            name="brand_id"
            label="Tên nhà cung cấp"
          >
            <Select options={brandOptions} placeholder="Chọn nhà cung cấp" />
          </Form.Item>
          <Form.Item
            key="brand_link"
            className="mb-[16px]! flex-1"
            name="brand_link"
            label="Link nhà cung cấp"
          >
            <Input placeholder="Nhập link nhà cung cấp" />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="price"
            className="mb-[16px]! flex-1"
            name="price"
            label="Giá mua"
          >
            <Input placeholder="Nhập giá mua" />
          </Form.Item>
          <Form.Item
            key="buy_date"
            className="mb-[16px]! flex-1"
            name="buy_date"
            label="Ngày mua"
            rules={[{ required: true, message: 'Ngày mua là bắt buộc' }]}
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="warranty_date"
            className="mb-[16px]! flex-1"
            name="warranty_date"
            label="Hạn bảo hành"
            rules={[{ required: true, message: 'Hạn bảo hành là bắt buộc' }]}
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
          <Form.Item
            key="buyer_id"
            className="mb-[16px]! flex-1"
            name="buyer_id"
            label="Người mua"
            rules={[{ required: true, message: 'Người mua là bắt buộc' }]}
          >
            <Select placeholder="Chọn người mua" options={userOptions} />
          </Form.Item>
        </div>

        <div className="flex items-center gap-[16px]">
          <Form.Item
            key="sell_date"
            className="mb-[16px]! flex-1"
            name="sell_date"
            label="Ngày thanh lý"
          >
            <DatePicker className="w-full" locale={locale} disabled />
          </Form.Item>
          <Form.Item
            key="sell_price"
            className="mb-[16px]! flex-1"
            name="sell_price"
            label="Giá thanh lý"
          >
            <Input placeholder="Nhập giá thanh lý" disabled />
          </Form.Item>
        </div>

        <Form.Item
          key="seller_id"
          className="mb-[16px]! flex-1"
          name="seller_id"
          label="Người thanh lý"
        >
          <Select
            placeholder="Chọn người thanh lý"
            options={userOptions}
            disabled
          />
        </Form.Item>

        <Form.Item
          key="description"
          className="mb-0! flex-1"
          name="description"
          label="Ghi chú"
        >
          <TiptapEditor />
        </Form.Item>
      </Modal>
    </>
  )
}

export default withApp(AssetModalForm)
