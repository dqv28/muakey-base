'use client'

import { TiptapEditor } from '@/components'
import { withApp } from '@/hoc'
import { useAsyncEffect } from '@/libs/hook'
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
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import {
  getAccountsAsAttendanceAction,
  getAssetCategoriesAction,
  getBrandAction,
} from '../action'
import { addAssetAction } from './action'

export type AssetModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  formProps?: FormProps<any>
  onSuccess?: () => void
}

const AssetModalForm: React.FC<AssetModalFormProps> = ({
  children,
  initialValues,
  formProps,
  onSuccess,
  ...modalProps
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Array<any>>([])
  const [brands, setBrands] = useState<Array<any>>([])
  const [categories, setCategories] = useState<Array<any>>([])

  const router = useRouter()
  const { message } = App.useApp()

  useAsyncEffect(async () => {
    try {
      const res = await getAccountsAsAttendanceAction()
      const validUsers = Array.isArray(res)
        ? res.filter((user) => user && user.id)
        : []
      setUsers(validUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    }
  }, [])

  useAsyncEffect(async () => {
    try {
      const res = await getBrandAction()
      console.log('res', res)
      const validBrands = Array.isArray(res)
        ? res.filter((brand) => brand && brand.id)
        : []
      setBrands(validBrands)
    } catch (error) {
      console.error('Error fetching brands:', error)
      setBrands([])
    }
  }, [])
  useAsyncEffect(async () => {
    try {
      const res = await getAssetCategoriesAction()
      setCategories(res)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }, [])

  const statusOptions = useMemo(
    () => [
      { label: 'Đang sử dụng', value: 'using', key: 'using' },
      { label: 'Chưa sử dụng', value: 'unused', key: 'unused' },
      { label: 'Đã thanh lý', value: 'liquidated', key: 'liquidated' },
      { label: 'Đang bảo hành', value: 'warranty', key: 'warranty' },
      { label: 'Hỏng', value: 'broken', key: 'broken' },
    ],
    [],
  )

  const categoryOptions = useMemo(() => {
    return (categories || []).map((category: any) => ({
      label: category?.name || '',
      value: category?.id || '',
      key: category?.id || '',
    }))
  }, [categories])

  const userOptions = useMemo(() => {
    return (users || []).map((user: any) => ({
      label: user?.full_name || '',
      value: user?.id || '',
      key: user?.id || '',
    }))
  }, [users])

  const brandOptions = useMemo(() => {
    return (brands || []).map((brand: any) => ({
      label: brand?.name || '',
      value: brand?.id || '',
      key: brand?.id || '',
    }))
  }, [brands])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('values', values)

      const formData = {
        ...values,
        start_date: values.start_date?.format('YYYY-MM-DD'),
        buy_date: values.buy_date?.format('YYYY-MM-DD'),
        warranty_date: values.warranty_date?.format('YYYY-MM-DD'),
        sell_date: values.sell_date?.format('YYYY-MM-DD'),
        price: values.price ? Number(values.price) : null,
        sell_price: values.sell_price ? Number(values.sell_price) : null,
        account_id: values.account_id || null,
        buyer_id: values.buyer_id || null,
        seller_id: values.seller_id || null,
        description: values.description || null,
        brand_link: values.brand_link || null,
        serial_number: values.serial_number || null,
      }

      setLoading(true)
      const response = await addAssetAction(formData)

      if (!response.success) {
        throw new Error(response.error)
      }

      message.success('Thêm tài sản thành công')
      setOpen(false)
      form.resetFields()
      router.refresh()
      onSuccess?.()
    } catch (error: any) {
      if (error.errorFields) {
        message.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      } else {
        console.error('Error:', error)
        message.error(error.message || 'Có lỗi xảy ra khi thêm tài sản')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        title="Thêm mới tài sản"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
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
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          {...formProps}
        >
          <div className="flex items-center gap-[16px]">
            <Form.Item
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
              className="mb-[16px]! flex-1"
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Trạng thái là bắt buộc' }]}
            >
              <Select options={statusOptions} placeholder="Chọn trạng thái" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="asset_category_id"
              label="Loại tài sản"
              rules={[{ required: true, message: 'Loại tài sản là bắt buộc' }]}
            >
              <Select
                options={categoryOptions}
                placeholder="Chọn loại tài sản"
              />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="serial_number"
              label="Số Serial"
            >
              <Input placeholder="Nhập số Serial" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="account_id"
              label="Người sử dụng"
            >
              <Select placeholder="Chọn người sử dụng" options={userOptions} />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="start_date"
              label="Ngày bắt đầu sử dụng"
            >
              <DatePicker className="w-full" locale={locale} />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="time_used"
              label="Thời gian sử dụng"
            >
              <Input
                placeholder="Tự động tính từ lúc đổi trạng thái"
                disabled
              />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="brand_id"
              label="Tên nhà cung cấp"
            >
              <Select options={brandOptions} placeholder="Chọn nhà cung cấp" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="brand_link"
              label="Link nhà cung cấp"
            >
              <Input placeholder="Nhập link nhà cung cấp" />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="price"
              label="Giá mua"
            >
              <Input placeholder="Nhập giá mua" />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="buy_date"
              label="Ngày mua"
            >
              <DatePicker className="w-full" locale={locale} />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="warranty_date"
              label="Hạn bảo hành"
            >
              <DatePicker className="w-full" locale={locale} />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="buyer_id"
              label="Người mua"
            >
              <Select placeholder="Chọn người mua" options={userOptions} />
            </Form.Item>
          </div>

          <div className="flex items-center gap-[16px]">
            <Form.Item
              className="mb-[16px]! flex-1"
              name="sell_date"
              label="Ngày thanh lý"
            >
              <DatePicker className="w-full" locale={locale} disabled />
            </Form.Item>
            <Form.Item
              className="mb-[16px]! flex-1"
              name="sell_price"
              label="Giá thanh lý"
            >
              <Input placeholder="Nhập giá thanh lý" disabled />
            </Form.Item>
          </div>

          <Form.Item
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
            className="mb-0! flex-1"
            name="description"
            label="Ghi chú"
          >
            <TiptapEditor />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default withApp(AssetModalForm)
