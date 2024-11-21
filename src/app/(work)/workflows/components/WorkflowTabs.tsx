'use client'

import { DropdownProps, Space, SpaceProps } from '@/ui'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
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

const Dropdown = dynamic(() => import('@/ui').then((ui) => ui.Dropdown), {
  ssr: false,
})

const WorkflowWrap: React.FC<
  DropdownProps & {
    hasChild?: Tab
    children?: React.ReactNode
  }
> = ({ hasChild, children, ...rest }) => {
  if (hasChild) {
    return <Dropdown {...rest}>{children}</Dropdown>
  }

  return children
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({
  items,
  activeKey,
  ...rest
}) => {
  const router = useRouter()

  return (
    <Space size="middle" {...rest}>
      {(items || [])?.map((item) => (
        <WorkflowWrap key={item.label} trigger="click" menu={item?.children}>
          <div
            className={clsx(
              'cursor-pointer border-b-[2px] pb-[5px] text-[13px] leading-[17px] transition-all duration-300 hover:text-[#111]',
              activeKey === item?.key
                ? 'border-[#111] text-[#111]'
                : 'border-transparent text-[#888]',
            )}
            onClick={() => {
              router.push(`?type=${item?.key}`)
            }}
          >
            {item?.label}
          </div>
        </WorkflowWrap>
      ))}
    </Space>
  )
}

export default WorkflowTabs
