'use client'

import { Button, Space, TabsProps } from 'antd'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import CheckInFiltered from './CheckInFiltered'

type CheckInHeaderProps = {
  params?: any
}

const CheckInHeader: React.FC<CheckInHeaderProps> = ({ params }) => {
  const { searchParams } = params
  const router = useRouter()

  const items: TabsProps['items'] = [
    {
      label: 'Đăng ký nghỉ',
      key: 'register-time-off',
    },
    {
      label: 'Sửa giờ vào ra',
      key: 'change-check-in',
    },
    {
      label: 'Đăng ký OT',
      key: 'register-ot',
    },
  ]

  return (
    <div className="bg-[#fff] px-[16px] pt-[16px]">
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">
          {!!searchParams?.form ? 'Yêu cầu' : 'Chấm công'}
        </span>
        {!!searchParams?.form ? (
          <Button type="primary">Lịch sử yêu cầu</Button>
        ) : (
          <CheckInFiltered />
        )}
      </div>
      {!!searchParams?.form && (
        <Space className="mt-[12px]" size="middle">
          {items.map((item) => (
            <div
              key={item.key}
              className={clsx(
                'cursor-pointer border-b-[2px] pb-[5px] text-[13px] leading-[17px] transition-all duration-300 hover:text-[#1677ff]',
                searchParams?.form === item?.key
                  ? 'border-[#1677ff] text-[#1677ff]'
                  : 'border-transparent text-[#888]',
              )}
              onClick={() => {
                router.push(`?form=${item?.key}`)
              }}
            >
              {item?.label}
            </div>
          ))}
        </Space>
      )}
    </div>
  )
}

export default CheckInHeader
