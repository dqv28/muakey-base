'use client'

import { ClockCircleOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'

type TextType = {
  content?: string
}

type AccountType = {
  name?: string
  password?: string
  note?: string
}

type ResourceBodyType = {
  text?: TextType
  account?: AccountType
}

export type ResourcesCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  body?: ResourceBodyType
  footer?: React.ReactNode
}

const ResourcesCard: React.FC<ResourcesCardProps> = ({
  title,
  extra,
  body,
  footer,
}) => {
  const { text, account } = body || {}

  return (
    <div className="flex size-full flex-col rounded-[8px] bg-[#fff] py-[16px]">
      <div className="flex h-[48px] items-center justify-between border-b px-[24px] pb-[16px]">
        <div className="line-clamp-1">{title}</div>
        {extra}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-[8px]">
        {account && (
          <div className="flex flex-col gap-[8px] px-[24px] py-[12px]">
            <div className="flex items-start gap-[8px]">
              <span className="text-nowrap">Tài khoản:</span>
              <Typography.Text className="font-[700]" copyable>
                {account.name}
              </Typography.Text>
            </div>
            <div className="flex items-start gap-[8px]">
              <span className="text-nowrap">Mật khẩu:</span>
              <Typography.Text className="font-[700]" copyable>
                {account.password}
              </Typography.Text>
            </div>
            <div className="flex items-start gap-[8px]">
              <span className="text-nowrap">Ghi chú:</span>
              <span
                className="line-clamp-3 font-[700]"
                dangerouslySetInnerHTML={{ __html: account.note || '' }}
              />
            </div>
          </div>
        )}

        {text && (
          <div
            className="line-clamp-4 h-[100px] overflow-hidden px-[24px] py-[12px] text-[14px] leading-[22px]"
            dangerouslySetInnerHTML={{ __html: text.content || '' }}
          />
        )}

        <div className="flex items-center gap-[8px] px-[24px] text-[#F5222D]">
          <ClockCircleOutlined />
          <span>Còn 23 ngày</span>
        </div>
      </div>
    </div>
  )
}

export default ResourcesCard
