import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import React from 'react'

type RegisterOTFormProps = {}

const RegisterOTForm: React.FC<RegisterOTFormProps> = (props) => {
  return (
    <div className="rounded-[16px] bg-[#fff] p-[16px]">
      <Form layout="vertical">
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
              <Row gutter={[24, 24]}>
                {[...initFields, ...fields].map(
                  ({ key, name, ...restField }) => (
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
                    </Col>
                  ),
                )}
              </Row>
            )
          }}
        </Form.List>

        <Form.Item className="mt-[24px]" name="reason" label="Lý do đăng ký OT">
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
  )
}

export default RegisterOTForm
