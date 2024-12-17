'use client'

import { Button } from 'antd'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Error: React.FC<any> = ({ error }: { error: Error }) => {
  useEffect(() => console.error(error), [error])

  return (
    <div className="flex size-full flex-col items-center justify-center gap-[12px]">
      <h2 className="text-[20px] text-red-500">Đã xảy ra lỗi!</h2>
      <Link href="/workflows">
        <Button type="primary">Quay lại</Button>
      </Link>
    </div>
  )
}

export default Error
