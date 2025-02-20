'use client'

import { CheckInSwitchForms } from '@/components'
import { Button } from 'antd'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type CheckInFormProps = {
  initialValues?: any
}

const CheckInForm: React.FC<CheckInFormProps> = ({ initialValues }) => {
  const searchParams = useSearchParams()

  const search = searchParams.get('form')

  return (
    <div className="space-y-[16px]">
      <CheckInSwitchForms
        params={{
          type: search,
          initialValues,
        }}
      />

      <Link className="block" href="/check-in">
        <Button>Quay lại</Button>
      </Link>
    </div>
  )
}

export default CheckInForm
