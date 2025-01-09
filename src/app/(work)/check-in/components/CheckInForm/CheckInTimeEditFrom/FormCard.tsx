import clsx from 'clsx'
import React from 'react'

type FormCardProps = {
  className?: string
  title?: React.ReactNode
  checkIn?: React.ReactNode
  checkOut?: React.ReactNode
}

const FormCard: React.FC<FormCardProps> = ({
  className,
  title,
  checkIn,
  checkOut,
}) => {
  return (
    <div
      className={clsx(
        'space-y-[24px] rounded-[16px] border border-[#D9D9D9] bg-[#f6f6f6] p-[24px]',
        className,
      )}
    >
      <div className="text-[16px]">{title}</div>
      <div className="flex min-h-[54px] items-center gap-[24px]">
        <div className="flex-1">
          <div className="leading-[22px] text-[#00000073]">Check in</div>
          <div className="text-[24px] leading-none">{checkIn}</div>
        </div>
        <div className="flex-1">
          <div className="leading-[22px] text-[#00000073]">Check out</div>
          <div className="text-[24px] leading-none">{checkOut}</div>
        </div>
      </div>
    </div>
  )
}

export default FormCard
