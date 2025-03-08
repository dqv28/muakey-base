'use client'

import { Tooltip, Typography } from 'antd'
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
              <div className="w-[70px] text-nowrap">Tài khoản:</div>
              <Typography.Text className="flex-1 font-[500]" copyable>
                {account.name}
              </Typography.Text>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="w-[70px] text-nowrap">Mật khẩu:</div>
              <Typography.Text className="flex-1 font-[500]" copyable>
                {account.password}
              </Typography.Text>
            </div>
            <div className="flex items-start gap-[8px]">
              <div className="w-[70px] text-nowrap">Ghi chú:</div>
              <Tooltip
                title={
                  <span
                    dangerouslySetInnerHTML={{ __html: account.note || '' }}
                  />
                }
              >
                <div
                  className="line-clamp-3 flex-1 font-[500]"
                  dangerouslySetInnerHTML={{ __html: account.note || '' }}
                  style={{
                    overflowWrap: 'anywhere',
                  }}
                />
              </Tooltip>
            </div>
          </div>
        )}

        {text && (
          <div
            className="line-clamp-4 h-[100px] overflow-hidden px-[24px] py-[12px] text-[14px] leading-[22px]"
            style={{
              overflowWrap: 'anywhere',
            }}
            dangerouslySetInnerHTML={{ __html: text.content || '' }}
          />
        )}

        {footer}
      </div>
    </div>
  )
}

export default ResourcesCard
