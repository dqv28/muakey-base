'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()

  return <div onClick={() => router.back()}>{children}</div>
}

export default BackButton
