'use client'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React, { useState } from 'react'

type RegisterTimeOffFormProps = {}

const RegisterTimeOffForm: React.FC<RegisterTimeOffFormProps> = (props) => {
  const [mode, setMode] = useState<'date' | 'time'>('date')

  const list = [
    {
      label: 'Ngày phép chưa sử dụng',
      value: 0.5,
    },
    {
      label: 'Ngày phép đã sử dụng',
      value: 2.5,
    },
    {
      label: 'Tổng số ngày phép',
      value: 3,
    },
  ]

  return (
    <>
      <div className="flex items-center rounded-[16px] bg-[#fff] p-[24px]">
        {list.map((l: any, index) => (
          <div key={index} className="flex-1 text-center">
            <div className="mb-[4px] text-[14px] leading-[22px] text-[#00000073]">
              {l.label}
            </div>
            <div className="text-[24px] leading-[38px]">{l.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[16px] bg-[#fff] p-[16px]">
        <Form layout="vertical">
          <div className="flex items-start justify-between gap-[24px]">
            <div className="flex items-center gap-[24px]">
              <Form.Item label="Chọn hình thức nghỉ" name="mode">
                <Space>
                  <Radio.Group
                    defaultValue={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <Radio.Button value="date">Nghỉ cả ngày</Radio.Button>
                    <Radio.Button value="time">Nghỉ theo giờ</Radio.Button>
                  </Radio.Group>
                </Space>
              </Form.Item>
              <Form.Item
                className="w-[400px]"
                label="Loại nghỉ"
                name="type"
                initialValue="unpaid"
              >
                <Select
                  options={[
                    {
                      label: 'Nghỉ không hưởng lương',
                      value: 'unpaid',
                    },
                    {
                      label: 'Nghỉ có hưởng lương',
                      value: 'paid',
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="text-right">
              <div className="text-[#00000073]">Tổng thời gian nghỉ</div>
              <div className="text-[24px]">0 ngày</div>
            </div>
          </div>

          <Form.List name="timestamp">
            {(fields, { add, remove }) => {
              const initFields: any[] = [
                {
                  key: 0,
                  name: 0,
                  isDefault: true,
                },
              ]

              return (
                <div className="space-y-[24px]">
                  {[...initFields, ...fields].map(
                    ({ key, name, ...restField }) => (
                      <div
                        className="relative overflow-hidden rounded-[16px] border border-[#d9d9d9] bg-[#f6f6f6] p-[24px]"
                        key={key}
                      >
                        <div className="flex items-center gap-[24px]">
                          <Form.Item
                            {...restField}
                            className="!mb-0 flex-1"
                            label="Ngày/giờ bắt đầu"
                            name={[name, 'startDate']}
                          >
                            <div className="flex items-center gap-[24px]">
                              <DatePicker
                                className="flex-1"
                                locale={locale}
                                placeholder="Chọn ngày bắt đầu"
                              />
                              <DatePicker
                                className="flex-1"
                                locale={locale}
                                picker="time"
                                placeholder="Chọn thời gian bắt đầu"
                                disabled={mode === 'date'}
                              />
                            </div>
                          </Form.Item>

                          <Divider type="vertical" className="h-[74px]" />

                          <Form.Item
                            {...restField}
                            className="!mb-0 flex-1"
                            label="Ngày/giờ kết thúc"
                            name={[name, 'endDate']}
                          >
                            <div className="flex items-center gap-[24px]">
                              <DatePicker
                                className="flex-1"
                                locale={locale}
                                placeholder="Chọn ngày kết thúc"
                              />
                              <DatePicker
                                className="flex-1"
                                locale={locale}
                                picker="time"
                                placeholder="Chọn thời kết thúc"
                                disabled={mode === 'date'}
                              />
                            </div>
                          </Form.Item>
                        </div>

                        <div className="absolute right-0 top-0 flex items-center">
                          <Button
                            type="primary"
                            className="rounded-none rounded-bl-lg bg-[#52C41A]"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            Thêm
                          </Button>
                          {restField?.isDefault || (
                            <Button
                              type="primary"
                              className="rounded-none"
                              danger
                              onClick={() => remove(name)}
                              icon={<DeleteOutlined />}
                            >
                              Xóa
                            </Button>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )
            }}
          </Form.List>

          <Form.Item
            className="mt-[24px]"
            name="reason"
            label="Lý do đăng ký nghỉ"
          >
            <Input.TextArea
              autoSize={{
                minRows: 3,
              }}
            />
          </Form.Item>

          <Form.Item className="!mb-0 mt-[24px]">
            <Button htmlType="submit" type="primary">
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default RegisterTimeOffForm
