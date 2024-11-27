'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Form, Input, Select } from 'antd'
import { useState } from 'react'
import { getAccountsAction } from './action'

const FormFields: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await getAccountsAction()

    setAccounts(res)
  }, [])

  return (
    <>
      <Form.Item
        name="name"
        label="Tên luồng công việc"
        rules={[
          {
            required: true,
            message: 'Nhập tên luồng.',
          },
        ]}
      >
        <Input placeholder="Tên luồng công việc" />
      </Form.Item>

      <Form.Item
        name="members"
        label="Thành viên"
        rules={[
          {
            required: true,
            message: 'Chọn thành viên',
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
