import { WorkLayoutUI } from '@/components'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Muakey - Wework',
}

const layout: React.FC<
  Readonly<{
    children: React.ReactNode
  }>
> = ({ children }) => {
  return <WorkLayoutUI>{children}</WorkLayoutUI>
}

export default layout
