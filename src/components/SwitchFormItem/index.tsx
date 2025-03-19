'use client'

import { Switch } from 'antd'
import React, { useState } from 'react'

export type EmployeeSwitchFormItemProps = {
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
  extra?: React.ReactNode
}

const EmployeeSwitchFormItem: React.FC<EmployeeSwitchFormItemProps> = ({
  className,
  title,
  children,
  extra,
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <Switch checked={checked} onChange={setChecked} />
          <span className="text-[16px] font-[600] leading-[24px]">{title}</span>
        </div>
        {checked && extra}
      </div>
      {checked && <div className="mt-[16px]">{children}</div>}
    </div>
  )
}

export default EmployeeSwitchFormItem
