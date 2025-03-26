'use client'

import { cn } from '@/lib/utils'
import { Switch } from 'antd'
import React, { useState } from 'react'

type ClassNamesType = {
  header?: string
  body?: string
}

export type EmployeeSwitchFormItemProps = {
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
  extra?: React.ReactNode
  classNames?: ClassNamesType
}

const EmployeeSwitchFormItem: React.FC<EmployeeSwitchFormItemProps> = ({
  className,
  title,
  children,
  extra,
  classNames,
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className={className}>
      <div
        className={cn('flex items-center justify-between', classNames?.header)}
      >
        <div className="flex items-center gap-[16px]">
          <Switch checked={checked} onChange={setChecked} />
          <span className="text-[16px] leading-[24px] font-[600]">{title}</span>
        </div>
        {checked && extra}
      </div>
      {checked && (
        <div className={cn('mt-[16px]', classNames?.body)}>{children}</div>
      )}
    </div>
  )
}

export default EmployeeSwitchFormItem
