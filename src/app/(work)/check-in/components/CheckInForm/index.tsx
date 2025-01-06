'use client'

import { Button } from 'antd'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CheckInSwitchForms from './CheckInSwitchForms'

type CheckInFormProps = {}

const CheckInForm: React.FC<CheckInFormProps> = (props) => {
  const searchParams = useSearchParams()

  const search = searchParams.get('form')

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
    <div className="space-y-[16px]">
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
        <CheckInSwitchForms
          params={{
            type: search,
          }}
        />
      </div>

      <Link className="block" href="/check-in">
        <Button>Quay lại</Button>
      </Link>
    </div>
  )
}

export default CheckInForm
