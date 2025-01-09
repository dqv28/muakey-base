'use client'

import { withApp } from '@/hoc'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { App, Button, Col, DatePicker, Form, Input, Row } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { addProposeAction } from '../action'

type RegisterOTFormProps = {}

const RegisterOTForm: React.FC<RegisterOTFormProps> = (props) => {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    const { date, timestamps, ...restFormData } = formData

    const day = String(dayjs(date).format('YYYY-MM-DD'))

    const holiday = timestamps?.map((t: any) => ({
      start_date:
        `${day} ${t?.from ? String(dayjs(t?.from).format('HH:mm:ss')) : ''}`.trim(),
      end_date:
        `${day} ${t?.from ? String(dayjs(t?.to).format('HH:mm:ss')) : ''}`.trim(),
    }))

    try {
      const { message: msg, errors } = await addProposeAction({
        ...restFormData,
        name: 'Đăng ký OT',
        propose_category_id: 4,
        holiday,
      })

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      setLoading(false)
      message.success('Đã gửi yêu cầu')
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  return (
    <div className="rounded-[16px] bg-[#fff] p-[16px]">
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="flex items-start justify-between gap-[24px]">
          <Form.Item name="date" label="Ngày">
            <DatePicker className="w-[229px]" locale={locale} />
          </Form.Item>

          <div className="text-right">
            <div className="text-[14px] text-[#00000073]">
              Tổng thời gian OT
            </div>
            <div className="text-[24px]">0 ngày</div>
          </div>
        </div>

        <Form.List name="timestamps" initialValue={[{}]}>
          {(fields, { add, remove }) => {
            return (
              <>
                <Row gutter={[24, 24]}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col key={key} span={12}>
                      <div className="gutter-row relative overflow-hidden rounded-[16px] border border-[#D9D9D9] bg-[#F6F6F6] !px-[24px] py-[16px]">
                        <div className="mb-[24px]">Thời gian đăng ký OT</div>
                        <div className="flex items-center gap-[24px]">
                          <Form.Item
                            {...restField}
                            className="!mb-0 flex-1"
                            name={[name, 'from']}
                            label="Từ giờ"
                          >
                            <DatePicker
                              className="w-full"
                              locale={locale}
                              picker="time"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            className="!mb-0 flex-1"
                            name={[name, 'to']}
                            label="Đến giờ"
                          >
                            <DatePicker
                              className="w-full"
                              locale={locale}
                              picker="time"
                            />
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
                          <Button
                            type="primary"
                            className="rounded-none"
                            danger
                            onClick={() => remove(name)}
                            icon={<DeleteOutlined />}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Form.Item className="mt-[24px]">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>

        <Form.Item
          className="mt-[24px]"
          name="description"
          label="Lý do đăng ký OT"
        >
          <Input.TextArea
            autoSize={{
              minRows: 3,
            }}
          />
        </Form.Item>

        <Form.Item className="!mb-0 mt-[24px]">
          <Button htmlType="submit" type="primary" loading={loading}>
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withApp(RegisterOTForm)
