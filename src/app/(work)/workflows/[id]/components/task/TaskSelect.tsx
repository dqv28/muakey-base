'use client'

import { Avatar } from '@/ui'
import { ArrowDownOutlined } from '@/ui/icons'
import { Input, InputProps } from 'antd'
import clsx from 'clsx'
import { uniqueId } from 'lodash'
import React from 'react'

type TaskSelectProps = Omit<InputProps, 'onClick'> & {
  open?: boolean
  options?: any
  onClick?: () => void
  onItemSelect?: (value: string) => void
  text?: string
}

const TaskSelect: React.FC<TaskSelectProps> = ({
  open,
  options,
  value,
  onClick,
  onItemSelect,
  text,
  ...rest
}) => {
  return (
    <div className="relative border border-[#d3d3d3]" onClick={onClick}>
      <div className="flex items-center justify-between pr-[12px]">
        <div className="flex-1">
          <Input
            placeholder="-- Lựa chọn một người dưới đây --"
            value={text || value}
            {...rest}
          />
        </div>
        <ArrowDownOutlined className="w-[16px] text-[#555]" />
      </div>
      {open && (
        <div className="absolute top-[100%] right-0 left-0 h-max bg-[#fff] p-[6px] shadow-[0_2px_10px_0_rgba(0,0,0,0.2)]">
          {(options || []).map((option: any) => {
            const active = (text || (value as string))
              .split(' ')
              .includes(option.username)
            return (
              <div
                className={clsx(
                  'group flex cursor-pointer items-center space-x-[8px] p-[8px] text-[13px]',
                  active ? 'bg-[#f3f3f3]' : 'bg-[#fff]',
                )}
                key={uniqueId()}
                onClick={() =>
                  onItemSelect?.(
                    `${`${option.full_name} ·`} ${option.username} ${!!option.position && `· ${option.position}`}`,
                  )
                }
              >
                <Avatar size={24}>{option.full_name}</Avatar>
                <span className={clsx(active ? 'text-[#000]' : 'text-[#888]')}>
                  {option.full_name} · {option.username}{' '}
                  {!!option.position && `· ${option.position}`}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TaskSelect
