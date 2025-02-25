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

  console.log(account)

  return (
    <div className="rounded-[8px] bg-[#fff] py-[16px]">
      <div className="flex items-center justify-between border-b px-[24px] pb-[16px]">
        {title}
        {extra}
      </div>

      {account && (
        <div className="flex flex-col gap-[8px] px-[24px] py-[12px]">
          <div className="flex items-center gap-[8px]">
            <span>Tài khoản:</span>
            <Typography.Text className="font-[700]" copyable>
              {account.name}
            </Typography.Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <span>Mật khẩu:</span>
            <Typography.Text className="font-[700]" copyable>
              {account.password}
            </Typography.Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <span>Ghi chú:</span>
            <Typography.Text className="font-[700]" copyable>
              {account.note}
            </Typography.Text>
          </div>
        </div>
      )}

      {text && (
        <div
          className="px-[24px] py-[12px]"
          dangerouslySetInnerHTML={{ __html: text.content || '' }}
        />
      )}

      <div className="flex items-center gap-[8px] px-[24px] text-[#F5222D]">
        <ClockCircleOutlined />
        <span>Còn 23 ngày</span>
      </div>
    </div>
  )
}

export default ResourcesCard
