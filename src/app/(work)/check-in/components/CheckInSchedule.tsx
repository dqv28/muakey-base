'use client'

import { Calendar } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

import locale from 'antd/es/date-picker/locale/vi_VN'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

type CheckInScheduleProps = {
  schedule?: any[]
}

const CheckInSchedule: React.FC<CheckInScheduleProps> = ({ schedule }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlSearchParams = new URLSearchParams()
  const today = String(dayjs(new Date()).format('YYYY-MM-DD'))

  const date = searchParams?.get('date')

  return (
    <Calendar
      locale={locale}
      rootClassName="border border-[#D9D9D9]"
      headerRender={() => <></>}
      fullCellRender={(current) => {
        const currentDate = String(dayjs(current).format('YYYY-MM-DD'))

        const day = schedule?.find((s: any) => s?.day_of_week === currentDate)

        const isCurrentMonth =
          String(dayjs(current).format('YYYY-MM')) !==
          (date || dayjs(new Date()).format('YYYY-MM'))

        return (
          <div
            className={clsx(
              'flex aspect-[220/160] size-full flex-col justify-between border-t px-[8px] pb-[8px] pt-[6px]',
              isCurrentMonth && 'opacity-80',
              day?.go_to_work === 0 && 'bg-[#F5F5F5]',
              currentDate === today
                ? 'border-[#096DD9] bg-[#E6F7FF]'
                : 'border-[#D9D9D9]',
            )}
            onClick={() => {
              urlSearchParams?.set(
                'date',
                current ? String(dayjs(current).format('YYYY-MM')) : '',
              )

              router.push(`?${urlSearchParams.toString()}`)
            }}
          >
            <span
              className={clsx(
                'flex h-[28px] items-center justify-center rounded py-[8px]',
                currentDate === today
                  ? 'text-[#1677ff]'
                  : isCurrentMonth
                    ? 'text-[#00000040]'
                    : 'text-[#333]',
              )}
            >
              {String(dayjs(current).format('DD/MM'))}
            </span>
            <div className="flex-1 py-[8px]">
              {day?.go_to_work !== undefined ? (
                day?.go_to_work === 0 ? (
                  <span className="flex size-full items-center justify-center font-[500]">
                    OFF
                  </span>
                ) : (
                  <div className="w-full rounded-full bg-[#1890FF] py-[3px] text-center text-[#fff]">
                    09:00 - 18:30
                  </div>
                )
              ) : (
                ''
              )}
            </div>
          </div>
        )
      }}
      value={date ? dayjs(date) : undefined}
    />
  )
}

export default CheckInSchedule
