'use client'

import { useAsyncEffect } from '@/libs/hook'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
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
        label="Tên danh mục"
        rules={[
          {
            required: true,
            message: 'Nhập tên luồng.',
          },
        ]}
      >
        <Input placeholder="Tên danh mục" />
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

      <Form.Item label="Giai đoạn">
        <Form.List name="rules">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className='flex items-center gap-[8px] mb-[16px]'>
                  <div className="flex flex-1 items-start gap-[8px]">
                    <Form.Item {...restField} className='flex-1 !mb-0' name={[name, 'stage_name']}>
                      <Input placeholder="Giai đoạn" />
                    </Form.Item>
                      <div className='flex-1'>
                        <Form.List {...restField} name={[name, 'reports']}>
                          {(fields, { add: addReport, remove: removeReport }) => (
                            <>
                              {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className='flex items-center gap-[8px] mb-[16px]'>
                                  <Form.Item {...restField} className='flex-1 !mb-0' name={[name, 'name']}>
                                    <Input placeholder="Tên trường báo cáo" />
                                  </Form.Item>
                                  <Form.Item {...restField} className='flex-1 !mb-0' name={[name, 'type']} initialValue='number'>
                                    <Select
                                      className="w-full"
                                      options={[
                                        { value: 'number', label: 'Số nguyên' },
                                        { value: 'paragraph', label: 'Văn bản' },
                                        { value: 'date', label: 'Ngày' },
                                        { value: 'list', label: 'Danh sách' },
                                      ]}
                                      placeholder='Chọn kiểu dữ liệu'
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    className="text-[16px]"
                                    onClick={() => removeReport(name)}
                                  />
                                </div>
                              ))}
                              <Form.Item className='!mb-0'>
                                <Button
                                  type="dashed"
                                  onClick={() => addReport()}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Thêm trường báo cáo
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                  </div>
                  <CloseOutlined
                    className="text-[16px]"
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm giai đoạn
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </>
  )
}

export default FormFields
