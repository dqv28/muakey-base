'use client'

import { withApp } from '@/hoc'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
  App,
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
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { addProposeAction } from '../action'

type RegisterTimeOffFormProps = {
  initialValues?: any
}

const RegisterTimeOffForm: React.FC<RegisterTimeOffFormProps> = ({
  initialValues,
}) => {
  const [mode, setMode] = useState<'date' | 'time'>('date')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [timestamps, setTimestamps] = useState<any>({})
  const [timeOff, setTimeOff] = useState(0)

  const { message } = App.useApp()
  const [form] = Form.useForm()

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

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    const { timestamps, type, ...restFormData } = formData

    const holiday = timestamps?.map((t: any) => {
      const startDate = `${String(dayjs(t?.startDate).format('YYYY-MM-DD'))} ${t?.startTime ? String(dayjs(t?.startTime).format('HH:mm:ss')) : ''}`
      const endDate = `${String(dayjs(t?.endDate).format('YYYY-MM-DD'))} ${t?.endTime ? String(dayjs(t?.endTime).format('HH:mm:ss')) : ''}`

      return {
        start_date: startDate.trim(),
        end_date: endDate.trim(),
      }
    })

    try {
      const { message: msg, errors } = await addProposeAction({
        holiday,
        name: type,
        type,
        propose_category_id: 5,
        ...restFormData,
      })

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      message.success('Gửi yêu cầu thành công')
      setLoading(false)
      form.resetFields()
      router.refresh()
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  useEffect(() => {
    const { startDate, startTime, endDate, endTime } = timestamps

    if (!startDate && !startTime && !endDate && !endTime) {
      setTimeOff(0)
    }

    if (!startDate || !startTime || !endDate || !endTime) return

    const start = new Date(
      `${String(dayjs(startDate).format('YYYY-MM-DD'))} ${startTime ? String(dayjs(startTime).format('HH:mm:ss')) : ''}`,
    )
    const end = new Date(
      `${String(dayjs(endDate).format('YYYY-MM-DD'))} ${endTime ? String(dayjs(endTime).format('HH:mm:ss')) : ''}`,
    )

    const total = (+end - +start) / (1000 * 60 * 60 * 24)

    setTimeOff(Number(total.toFixed(2)))
  }, [timestamps])

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

      <div className="mt-[16px] rounded-[16px] bg-[#fff] p-[16px]">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={(_, { timestamps }) => {
            setTimestamps(timestamps[0])
          }}
          form={form}
          initialValues={{
            timestamps: [{ isDefault: true, startDate: initialValues?.date }],
            type: 'Nghỉ không hưởng lương',
          }}
        >
          <div className="flex items-start justify-between gap-[24px]">
            <div className="flex items-center gap-[24px]">
              <Form.Item label="Chọn hình thức nghỉ">
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
              <Form.Item className="w-[400px]" label="Loại nghỉ" name="type">
                <Select
                  options={[
                    {
                      label: 'Nghỉ không hưởng lương',
                      value: 'Nghỉ không hưởng lương',
                    },
                    {
                      label: 'Nghỉ có hưởng lương',
                      value: 'Nghỉ có hưởng lương',
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="text-right">
              <div className="text-[#00000073]">Tổng thời gian nghỉ</div>
              <div className="text-[24px]">{timeOff} ngày</div>
            </div>
          </div>

          <Form.List name="timestamps" initialValue={[{ isDefault: true }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    className="relative overflow-hidden rounded-[16px] border border-[#d9d9d9] bg-[#f6f6f6] p-[24px]"
                    key={key}
                  >
                    <div className="flex items-center gap-[24px]">
                      <div className="flex flex-1 items-end gap-[24px]">
                        <Form.Item
                          {...restField}
                          className="!mb-0 flex-1"
                          label="Ngày/giờ bắt đầu"
                          name={[name, 'startDate']}
                        >
                          <DatePicker
                            className="w-full"
                            locale={locale}
                            placeholder="Chọn ngày bắt đầu"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          className="!mb-0 flex-1"
                          name={[name, 'startTime']}
                        >
                          <DatePicker
                            className="w-full"
                            locale={locale}
                            picker="time"
                            placeholder="Chọn thời gian bắt đầu"
                            disabled={mode === 'date'}
                            showSecond={false}
                          />
                        </Form.Item>
                      </div>

                      <Divider type="vertical" className="h-[74px]" />

                      <div className="flex flex-1 items-end gap-[24px]">
                        <Form.Item
                          {...restField}
                          className="!mb-0 flex-1"
                          label="Ngày/giờ kết thúc"
                          name={[name, 'endDate']}
                        >
                          <DatePicker
                            className="w-full"
                            locale={locale}
                            placeholder="Chọn ngày kết thúc"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          className="!mb-0 flex-1"
                          name={[name, 'endTime']}
                        >
                          <DatePicker
                            className="w-full"
                            locale={locale}
                            picker="time"
                            placeholder="Chọn thời gian kết thúc"
                            disabled={mode === 'date'}
                            showSecond={false}
                          />
                        </Form.Item>
                      </div>
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
                      {index > 0 && (
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
                ))}
              </>
            )}
          </Form.List>

          <Form.Item
            className="mt-[24px]"
            name="description"
            label="Lý do đăng ký nghỉ"
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
    </>
  )
}

export default withApp(RegisterTimeOffForm)
