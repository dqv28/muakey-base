'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { getAccountsAction } from '../workflow-extra/action'

const FormFields: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await getAccountsAction()

    setAccounts(res)
  }, [])

  return (
    <>
      <Form.Item name="workflow_category_id" className="hidden">
        <Input className="hidden" />
      </Form.Item>
      <Form.Item
        name="name"
        label={
          <span className="inline-block w-[160px]">Tên luồng công việc</span>
        }
        rules={[
          {
            required: true,
            message: 'Nhập tên luồng công việc',
          },
        ]}
      >
        <Input placeholder="Tên luồng công việc" />
      </Form.Item>
      <Form.Item
        name="description"
        label={<span className="inline-block w-[160px]">Mô tả</span>}
      >
        <Input placeholder="Mô tả" />
      </Form.Item>
      <Form.Item
        name="manager"
        label={
          <span className="inline-block w-[160px]">Thành viên quản trị</span>
        }
        rules={[
          {
            required: true,
            message: 'Nhập thành viên quản trị',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn thành viên"
          options={accounts?.map((a: any) => ({
            label: a?.full_name,
            value: a?.username,
          }))}
        />
      </Form.Item>
    </>
  )
}

export default FormFields
