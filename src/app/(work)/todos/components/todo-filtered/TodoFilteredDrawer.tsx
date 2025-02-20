'use client'

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
import React, { useState } from 'react'

type TodoFilteredDrawerProps = DrawerProps & {}

const TodoFilteredDrawer: React.FC<TodoFilteredDrawerProps> = ({ ...rest }) => {
  const [open, setOpen] = useState(false)

  const workflowOptions: SelectProps['options'] = [
    {
      label: 'Tất cả quy trình',
      value: 'all',
    },
  ]

  const userOptions: SelectProps['options'] = [
    {
      label: 'Tất cả quy trình',
      value: 'all',
    },
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

  return (
    <>
      <Button onClick={() => setOpen(true)}>Bộ lọc</Button>
      <Drawer
        classNames={{
          header: '!pb-[16px] !pt-[20px] !border-b-0',
          body: '!pt-0 !pb-[20px]',
        }}
        title="Bộ lọc"
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        drawerRender={(dom) => (
          <Form
            layout="vertical"
            initialValues={{
              type: 'created_at',
              workflow_name: 'all',
            }}
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
        <Form.Item className="!mb-[16px]" label="Sắp xếp theo" name="type">
          <Select options={typeOptions} />
        </Form.Item>
        <Form.Item
          className="!mb-[16px]"
          label="Quy trình"
          name="workflow_name"
        >
          <Select options={workflowOptions} />
        </Form.Item>
        <Form.Item className="!mb-[16px]" label="Người tạo" name="user">
          <Select options={userOptions} placeholder="Chọn người tạo" />
        </Form.Item>
        <Divider />
        <Form.Item
          className="!mb-[16px]"
          label="Hoàn thành từ ngày"
          name="from"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item className="!mb-[16px]" label="Hoàn thành đến ngày" name="to">
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Divider />
        <Form.Item
          className="!mb-[16px]"
          label="Thời hạn từ ngày"
          name="expired_from"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item
          className="!mb-[16px]"
          label="Thời hạn đến ngày"
          name="expired_to"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Divider />
        <Form.Item
          className="!mb-[16px]"
          label="Tạo từ ngày"
          name="created_from"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>
        <Form.Item
          className="!mb-[16px]"
          label="Tạo đến ngày"
          name="created_to"
        >
          <DatePicker className="w-full" locale={locale} />
        </Form.Item>

        <Form.Item className="!mb-[16px]">
          <div className="flex justify-end gap-[8px]">
            <Button>Reset</Button>
            <Button type="primary" htmlType="submit">
              Lọc
            </Button>
          </div>
        </Form.Item>
      </Drawer>
    </>
  )
}

export default TodoFilteredDrawer
