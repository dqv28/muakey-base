'use client'

import { PlusOutlined } from '@ant-design/icons'
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
import React from 'react'

type RegisterTimeOffFormProps = {}

const RegisterTimeOffForm: React.FC<RegisterTimeOffFormProps> = (props) => {
  return (
    <Form layout="vertical">
      <div className="flex items-center justify-between gap-[24px]">
        <div className="flex items-center gap-[24px]">
          <Form.Item label="Chọn hình thức nghỉ" name="mode">
            <Space>
              <Radio.Group defaultValue={'date'}>
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

      <div className="relative overflow-hidden rounded-[16px] border border-[#d9d9d9] bg-[#f6f6f6] p-[24px]">
        <div className="flex items-center gap-[24px]">
          <Form.Item
            className="!mb-0 flex-1"
            label="Ngày/giờ bắt đầu"
            name="startDate"
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
                placeholder="Chọn thời bắt đầu"
                disabled
              />
            </div>
          </Form.Item>

          <Divider type="vertical" className="h-[74px]" />

          <Form.Item
            className="!mb-0 flex-1"
            label="Ngày/giờ kết thúc"
            name="endDate"
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
                disabled
              />
            </div>
          </Form.Item>
        </div>

        <Button
          className="absolute right-0 top-0 rounded-none !rounded-bl-[8px] bg-[#52C41A]"
          type="primary"
          icon={<PlusOutlined />}
        >
          Thêm
        </Button>
      </div>

      <Form.Item className="mt-[24px]" name="reason" label="Lý do đăng ký nghỉ">
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
  )
}

export default RegisterTimeOffForm
