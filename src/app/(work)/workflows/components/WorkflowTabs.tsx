'use client'

import { Space, SpaceProps } from '@/ui'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'

type Tab = {
  key?: string
  label?: string
  children?: Tab[]
}

export type WorkflowTabsProps = SpaceProps & {
  items?: Tab[]
  activeKey?: string
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({
  items,
  activeKey,
  ...rest
}) => {
  const router = useRouter()

  return (
    <Space size="middle" {...rest}>
      {items?.map((item) => (
        <div
          key={item.label}
          className={clsx(
            'cursor-pointer border-b-[2px] pb-[8px] text-[13px] leading-[17px] transition-all duration-300 hover:text-[#111]',
            activeKey === item?.key
              ? '!border-[#111] text-[#111]'
              : '!border-transparent text-[#888]',
          )}
          onClick={() => {
            router.push(`?type=${item?.key}`)
          }}
        >
          {item?.label}
        </div>
      ))}
    </Space>
  )
}

export default WorkflowTabs
