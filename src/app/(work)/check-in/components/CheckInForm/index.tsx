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

  return (
    <div className="space-y-[16px]">
      <CheckInSwitchForms
        params={{
          type: search,
        }}
      />

      <Link className="block" href="/check-in">
        <Button>Quay lại</Button>
      </Link>
    </div>
  )
}

export default CheckInForm
