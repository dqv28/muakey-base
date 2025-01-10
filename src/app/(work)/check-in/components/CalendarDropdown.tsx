import { Dropdown } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

type CalendarDropdownProps = {
  currentDate?: any
  day?: any
  options?: any
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  currentDate: current,
  day,
  options,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const urlSearchParams = new URLSearchParams()

  const today = String(dayjs(new Date()).format('YYYY-MM-DD'))
  const currentDate = String(dayjs(current).format('YYYY-MM-DD'))

  const { isCurrentMonth, info } = options

  const query = (p: string) => {
    const url = new URLSearchParams(searchParams.toString())

    url.set('form', String(p))

    router.push(`?${url.toString()}`)
  }

  const dropdownRender = () => {
    return (
      <div className="overflow-hidden rounded-[6px] bg-[#fff] p-[2px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('dang-ky-nghi')}
        >
          Đăng Ký Nghỉ
        </div>
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('sua-gio-vao-ra')}
        >
          Sửa Giờ Vào Ra
        </div>
        <div
          className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
          onClick={() => query('dang-ky-ot')}
        >
          Đăng Ký OT
        </div>
      </div>
    )
  }

  const handleClick = (currentDate: any, isCurrentMonth?: boolean) => {
    if (!!isCurrentMonth) return

    urlSearchParams?.set(
      'date',
      currentDate ? String(dayjs(currentDate).format('YYYY-MM')) : '',
    )

    router.push(`?${urlSearchParams.toString()}`)
  }

  console.log(info)

  return (
    <Dropdown
      trigger={['click']}
      dropdownRender={dropdownRender}
      open={open}
      onOpenChange={(o) => {
        if (!isCurrentMonth) return

        setOpen(o)
      }}
      arrow
      placement="bottom"
    >
      <div
        className={clsx(
          'flex aspect-[220/160] min-h-[160px] w-full flex-col border-x border-t border-x-[#fff] px-[8px] pb-[8px] pt-[6px]',
          day?.go_to_work !== undefined &&
            day?.go_to_work === 0 &&
            'bg-[#f5f5f5]',
          currentDate === today
            ? 'border-t-[#096DD9] bg-[#E6F7FF]'
            : 'border-t-[#0505050f]',
        )}
        onClick={() => handleClick(current, isCurrentMonth)}
      >
        <div className="w-full text-center">
          {String(dayjs(current).format('DD/MM'))}
        </div>
        {day?.go_to_work !== undefined ? (
          day?.go_to_work === 0 ? (
            <span className="flex size-full items-center justify-center font-[500]">
              OFF
            </span>
          ) : (
            <div className="flex-1 space-y-[4px] py-[4px]">
              <div className="w-full rounded-full bg-[#1890FF] py-[3px] text-center text-[#fff]">
                09:00 - 18:30
              </div>
              {info?.checkInValue?.[0] &&
                (info?.checkInValue?.[1] ? (
                  <>
                    {info?.checkInValue?.map((c: any) => (
                      <div
                        className="flex w-full items-center justify-center rounded-full bg-[#237804] px-[4px] py-[3px] text-[#fff]"
                        key={c[0]}
                      >
                        {c?.[0]} - {c?.[1] || '--:--'}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="w-full rounded-full bg-[#F5222D] py-[3px] text-center text-[#fff]">
                    {info?.checkInValue?.[0]} -{' '}
                    {info?.checkInValue?.[1] || '--:--'}
                  </div>
                ))}
              {info?.start_ot && (
                <div className="w-full rounded-full bg-[#722ED1] py-[3px] text-center text-[#fff]">
                  {String(dayjs(info?.start_ot).format('HH:mm'))} -{' '}
                  {info?.end_ot
                    ? String(dayjs(info?.end_ot).format('HH:mm'))
                    : '--:--'}
                </div>
              )}
            </div>
          )
        ) : (
          ''
        )}
      </div>
    </Dropdown>
  )
}

export default CalendarDropdown
