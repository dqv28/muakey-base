'use client'

import { Button } from 'antd'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CheckInFormOptions, {
  CheckInFormOptionsProps,
} from './CheckInFormOptions'
import CheckInSwitchForms from './CheckInSwitchForms'

type CheckInFormProps = {}

const CheckInForm: React.FC<CheckInFormProps> = (props) => {
  const searchParams = useSearchParams()

  const search = searchParams.get('form')

  const options: CheckInFormOptionsProps['items'] = [
    {
      label: 'Đăng ký nghỉ',
      value: 'register-time-off',
    },
    {
      label: 'Thay đổi phân ca',
      value: 'change-shift',
    },
    {
      label: 'Sửa giờ vào ra',
      value: 'change-check-in',
    },
    {
      label: 'Đăng ký OT',
      value: 'register-ot',
    },
  ]

  return (
    <div className="space-y-[16px]">
      <CheckInFormOptions
        items={options}
        params={{
          search,
        }}
      />

      <div className="bg-[#fff] p-[16px]">
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
