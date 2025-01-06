import clsx from 'clsx'
import React from 'react'

type ItemType = {
  label?: React.ReactNode
  className?: string
}

type CheckInTableExplanationProps = {
  items?: ItemType[]
}

const CheckInTableExplanation: React.FC<CheckInTableExplanationProps> = ({
  items,
}) => {
  return (
    <div className="flex items-center gap-[24px] text-[14px]">
      {items &&
        items?.map((item, index) => (
          <div className="flex items-center gap-[8px]" key={index}>
            <span
              className={clsx(
                'inline-block h-[10px] w-[32px]',
                item?.className,
              )}
            ></span>
            <span>{item?.label}</span>
          </div>
        ))}
    </div>
  )
}

export default CheckInTableExplanation
