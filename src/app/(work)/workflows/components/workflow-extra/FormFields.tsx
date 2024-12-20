'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Form, Input, Select } from 'antd'
import { useState } from 'react'
import { getAccountsAction, getDepartmentsAction } from './action'

const FormFields: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([])

  useAsyncEffect(async () => {
    const accountList = await getAccountsAction()
    const departments = await getDepartmentsAction()
    setAccounts([...departments, ...accountList])
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
            label: a?.full_name || a?.name,
            value: a?.username || a?.id,
          }))}
        />
      </Form.Item>

      {/* <Form.Item label="Giai đoạn">
        <Form.List name="rules">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="mb-[16px] flex items-center gap-[8px]"
                >
                  <div className="flex flex-1 items-start gap-[8px]">
                    <Form.Item
                      {...restField}
                      className="!mb-0 flex-1"
                      name={[name, 'stage_name']}
                    >
                      <Input placeholder="Giai đoạn" />
                    </Form.Item>
                    <div className="flex-1">
                      <Form.List {...restField} name={[name, 'report']}>
                        {(fields, { add: addReport, remove: removeReport }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <div
                                key={key}
                                className="mb-[16px] flex items-center gap-[8px]"
                              >
                                <Form.Item
                                  {...restField}
                                  className="!mb-0 flex-1"
                                  name={[name, 'name']}
                                >
                                  <Input placeholder="Tên trường báo cáo" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  className="!mb-0 flex-1"
                                  name={[name, 'type']}
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
                                    placeholder="Chọn kiểu dữ liệu"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  className="text-[16px]"
                                  onClick={() => removeReport(name)}
                                />
                              </div>
                            ))}
                            <Form.Item className="!mb-0">
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
      </Form.Item> */}
    </>
  )
}

export default FormFields
