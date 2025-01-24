import { ClockCircleOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { calculateCheckInTime } from '../ultils'

type CalendarDropdownProps = {
  currentDate?: any
  day?: any
  options?: any
  onDateClick?: (date: any) => void
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  currentDate: current,
  day,
  options,
  onDateClick,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const urlSearchParams = new URLSearchParams()

  const today = String(dayjs(new Date()).format('YYYY-MM-DD'))
  const currentDate = String(dayjs(current).format('YYYY-MM-DD'))

  const { isCurrentMonth, info } = options

  const isYesterday =
    isCurrentMonth && new Date().getDate() > new Date(current).getDate()
  const isNextDay =
    isCurrentMonth && new Date().getDate() < new Date(current).getDate()

  const dropdownRender = () => {
    return (
      <div className="overflow-hidden rounded-[6px] bg-[#fff] p-[2px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
        {isYesterday || (
          <div
            className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
            onClick={() => {
              onDateClick?.(current)
              router.push('?form=dang-ky-nghi')
            }}
          >
            Đăng Ký Nghỉ
          </div>
        )}
        {isNextDay || (
          <div
            className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
            onClick={() => {
              onDateClick?.(
                info?.checkInValue
                  ? dayjs(
                      `${String(dayjs(current).format('YYYY-MM-DD'))} ${info?.checkInValue?.pop()?.[0]}`,
                    )
                  : null,
              )
              router.push('?form=sua-gio-vao-ra')
            }}
          >
            Sửa Giờ Vào Ra
          </div>
        )}
        {isYesterday || (
          <div
            className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
            onClick={() => {
              onDateClick?.(current)
              router.push('?form=dang-ky-ot')
            }}
          >
            Đăng Ký OT
          </div>
        )}
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

  const total = info?.checkInValue?.reduce(
    (initValue: number, current: [string, string]) => {
      return initValue + +(current?.[1] ? calculateCheckInTime(current) : 0)
    },
    0,
  )

  const totalTime = Number((total / 7.5).toFixed(2))

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
            <div className="flex h-full flex-col justify-between">
              <div className="flex-1 space-y-[4px] py-[4px]">
                <div className="w-full rounded-full bg-[#1890FF] py-[3px] text-center text-[#fff]">
                  09:00 - 18:30
                </div>
                {info?.checkInValue?.[0] &&
                  info?.checkInValue?.map((c: any, index: number) => (
                    <div
                      className={clsx(
                        'flex w-full items-center justify-center rounded-full px-[4px] py-[3px] text-[#fff]',
                        {
                          'bg-[#237804]': !!c?.[1],
                          'bg-[#F5222D]': !c?.[1],
                        },
                      )}
                      key={index}
                    >
                      {c?.[0]} - {c?.[1] || '--:--'}
                    </div>
                  ))}

                {info?.ot &&
                  info?.ot?.map(
                    (o: any, index: number) =>
                      o && (
                        <div
                          className="w-full rounded-full bg-[#722ED1] py-[3px] text-center text-[#fff]"
                          key={index}
                        >
                          {o[0]} - {o[1] ? o[1] : '--:--'}
                        </div>
                      ),
                  )}

                {info?.timeOff &&
                  info?.timeOff?.map(
                    (o: any, index: number) =>
                      o && (
                        <div
                          className="w-full rounded-full bg-[#FFA940] py-[3px] text-center text-[#fff]"
                          key={index}
                        >
                          {o[0]} - {o[1] ? o[1] : '--:--'}
                        </div>
                      ),
                  )}
              </div>
              {info?.checkInValue?.[0] && (
                <div className="flex items-center justify-between gap-[8px] px-[4px]">
                  <div className="flex items-center gap-[4px]">
                    <ClockCircleOutlined /> <span>{total}h</span>
                  </div>
                  <div>
                    {total > 0 ? totalTime : total}
                    /1 NC
                  </div>
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
