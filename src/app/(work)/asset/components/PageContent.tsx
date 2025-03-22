import { cn } from '@/lib/utils'
import React from 'react'

export type PageContentProps = {
  children: React.ReactNode
  className?: string
}

const PageContent: React.FC<PageContentProps> = ({ children, className }) => {
  return (
    <div
      className={cn('h-[calc(100vh-55px)] bg-[#f6f6f6] p-[16px]', className)}
    >
      {children}
    </div>
  )
}

export default PageContent
