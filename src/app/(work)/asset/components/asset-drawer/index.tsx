'use client'

import { useFilterStore } from '@/stores/filterStore'
import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  ModalProps,
  Select,
} from 'antd'
import { useState } from 'react'
import { useAssetForm } from '../../hooks/useAssetForm'
import { filterAssetsAction } from './action'

export type AssetDrawerProps = ModalProps & {
  children: React.ReactNode
  formProps?: FormProps<any>
}

const AssetDrawer: React.FC<AssetDrawerProps> = ({
  children,
  formProps,
  ...modalProps
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { statusOptions, categoryOptions, userOptions, brandOptions } =
    useAssetForm()
  const { setFilterResults } = useFilterStore()

  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
  }

  const handleFilter = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      // Bỏ giá trị null, undefined, chuỗi rỗng
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== undefined && value !== null && value !== '',
        ),
      )

      const queryString = new URLSearchParams(
        Object.entries(filteredValues).flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => [key, v])
            : [[key, value?.toString()]],
        ),
      ).toString()
    

      const response = await filterAssetsAction(queryString)

      setFilterResults(response.data)
      setLoading(false)
      setOpen(false)
    } catch (error) {
      console.error('Error filtering assets:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Drawer open={open} closable={false} width={484} onClose={handleCancel}>
        <div className="flex items-center justify-between">
          <p className="font-weight-[600] text-[16px] font-medium">Bộ lọc</p>
          <CloseOutlined className="cursor-pointer" onClick={handleCancel} />
        </div>
        <Form form={form} layout="vertical" {...formProps}>
          <div className="flex flex-col items-center gap-[16px]">
            <Form.Item
              key="account_id"
              className="mb-[0px]! w-full"
              name="account_id"
              label="Người sử dụng"
            >
              <Select placeholder="Chọn người sử dụng" options={userOptions} />
            </Form.Item>
            <Form.Item
              key="category_id"
              className="mb-[0px]! w-full"
              name="category_id"
              label="Loại tài sản"
            >
              <Select
                placeholder="Chọn loại tài sản"
                options={categoryOptions}
              />
            </Form.Item>
            <Form.Item
              key="brand_id"
              className="mb-[0px]! w-full"
              name="brand_id"
              label="Nhà cung cấp"
            >
              <Select placeholder="Chọn nhà cung cấp" options={brandOptions} />
            </Form.Item>
            <Form.Item
              key="status"
              className="mb-[0px]! w-full"
              name="status"
              label="Trạng thái"
            >
              <Select options={statusOptions} placeholder="Chọn trạng thái" />
            </Form.Item>
            <div className="flex w-full gap-[8px]">
              <Form.Item
                key="start_price"
                className="mb-[0px]! flex w-full flex-col"
                name="start_price"
                label="Giá mua"
              >
                <Input placeholder="Từ" name="price_from" className="w-1/2" />
              </Form.Item>
              <div className="flex items-end justify-center text-[16px]">
                <span className="h-[31px]">-</span>
              </div>
              <Form.Item
                key="end_price"
                className="mb-[0px]! w-full"
                name="end_price"
                label=" "
              >
                <Input placeholder="Đến" name="price_to" className="w-1/2" />
              </Form.Item>
            </div>
            <div className="flex w-full gap-[8px] pt-[8px]">
              <Button
                type="default"
                className="flex-1"
                onClick={() => {
                  form.resetFields()
                }}
              >
                Reset
              </Button>
              <Button type="primary" className="flex-1" onClick={handleFilter}>
                Lọc
              </Button>
            </div>
          </div>
        </Form>
      </Drawer>
    </>
  )
}

export default AssetDrawer
