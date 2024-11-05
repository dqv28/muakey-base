import { Divider } from 'antd'
import clsx from 'clsx'
import React from 'react'

type StageHeaderProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  borderless?: boolean
  className?: string
  children?: React.ReactNode
}

const StageHeader: React.FC<StageHeaderProps> = ({
  title,
  extra,
  borderless,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'w-full border-b px-[16px] py-[12px]',
        borderless ? 'border-transparent' : 'border-[#0000001a]',
        className,
      )}
    >
      <div className="flex items-center justify-between leading-none">
        <span className="text-[16px] font-[500]">{title}</span>
        <span>{extra}</span>
      </div>
      <Divider className="!my-[10px] border-t-[4px] border-[#0003]" />
      {children}
    </div>
  )
}

export default StageHeader
