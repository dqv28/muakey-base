'use client'

import { useAsyncEffect } from '@/libs/hook'
import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  DrawerProps,
  Form,
  Select,
  SelectProps,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React, { useEffect, useState } from 'react'
import { getAccountsRequest, getWorkflowsRequest } from './action'

type TodoFilteredDrawerProps = DrawerProps & {
  onFilter?: (values: any) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const TodoFilteredDrawer: React.FC<TodoFilteredDrawerProps> = ({
  onFilter,
  open: externalOpen,
  onOpenChange,
  ...rest
}) => {
  const [open, setOpen] = useState(externalOpen || false)
  const [loading, setLoading] = useState(false)
  const [workflows, setWorkflows] = useState<any[]>([])
  const [accounts, setAccounts] = useState<any[]>([])
  const [form] = Form.useForm()

  useAsyncEffect(async () => {
    onOpenChange?.(open)

    if (!open) return

    const wf = await getWorkflowsRequest()
    const acc = await getAccountsRequest()

    setWorkflows(wf)
    setAccounts(acc)
  }, [open])

  useEffect(() => {
    setOpen(externalOpen || false)
  }, [externalOpen])

  const workflowOptions: SelectProps['options'] = [
    {
      label: 'Tất cả quy trình',
      value: 'all',
    },
    ...workflows.map((wf) => ({
      label: wf.name,
      value: wf.id,
    })),
  ]

  const userOptions: SelectProps['options'] = [
    ...accounts.map((acc) => ({
      label: acc.full_name,
      value: acc.id,
    })),
  ]

  const typeOptions: SelectProps['options'] = [
    {
      label: 'Thời gian tạo',
      value: 'created_at',
    },
    {
      label: 'Thời gian cập nhật gần nhất',
      value: 'updated_at',
    },
    {
      label: 'Thời hạn',
      value: 'expired_at',
    },
    {
      label: 'Thời gian kết thúc thực tế',
      value: 'finished_at',
    },
  ]

  const handleSubmit = (values: any) => {
    setLoading(true)
    onFilter?.(values)
    setLoading(false)
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Bộ lọc</Button>
      <Drawer
        classNames={{
          header: 'pb-[16px]! pt-[20px]! border-b-0!',
          body: 'pt-0! pb-[20px]!',
        }}
        title="Bộ lọc"
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        drawerRender={(dom) => (
          <Form
            layout="vertical"
            initialValues={{
              sort: 'created_at',
            }}
            onFinish={handleSubmit}
            form={form}
          >
            {dom}
          </Form>
        )}
        width={484}
        closable={false}
        extra={
          <Button
            type="text"
            onClick={() => setOpen(false)}
            icon={<CloseOutlined className="text-[#00000073]" />}
            size="small"
          />
        }
        {...rest}
      >
        <Form.Item className="mb-[16px]!" label="Sắp xếp theo" name="sort">
          <Select options={typeOptions} />
        </Form.Item>
        <Form.Item className="mb-[16px]!" label="Quy trình" name="workflow_id">
          <Select
            options={workflowOptions}
            mode="multiple"
            placeholder="Chọn quy trình"
          />
        </Form.Item>
        <Form.Item className="mb-[16px]!" label="Người tạo" name="created_by">
          <Select
            options={userOptions}
            placeholder="Chọn người tạo"
            allowClear
          />
        </Form.Item>
        <Divider />
        <Form.Item
          className="mb-[16px]!"
          label="Hoàn thành từ ngày"
          name="start_completed_at"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item
          className="mb-[16px]!"
          label="Hoàn thành đến ngày"
          name="end_completed_at"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Divider />
        <Form.Item
          className="mb-[16px]!"
          label="Thời hạn từ ngày"
          name="start_expired"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item
          className="mb-[16px]!"
          label="Thời hạn đến ngày"
          name="end_expired"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Divider />
        <Form.Item
          className="mb-[16px]!"
          label="Tạo từ ngày"
          name="start_created_at"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item
          className="mb-[16px]!"
          label="Tạo đến ngày"
          name="end_created_at"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>

        <Form.Item className="mb-[16px]!">
          <div className="flex justify-end gap-[8px]">
            <Button onClick={handleReset}>Reset</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lọc
            </Button>
          </div>
        </Form.Item>
      </Drawer>
    </>
  )
}

export default TodoFilteredDrawer
