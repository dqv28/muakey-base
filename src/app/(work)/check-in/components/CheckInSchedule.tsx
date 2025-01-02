import { Calendar } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

import { Player } from '@lottiefiles/react-lottie-player'
import locale from 'antd/es/date-picker/locale/vi_VN'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import offlineAnimation from '../lotties/off-animation.json'
import onlineAnimation from '../lotties/on-animation.json'

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
              'mx-[2px] flex aspect-[220/160] size-full flex-col justify-between border-t px-[8px] pb-[8px] pt-[6px]',
              isCurrentMonth && 'opacity-80',
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
                'flex h-[28px] items-center justify-center rounded py-[8px] font-semibold',
                currentDate === today
                  ? 'bg-[#e6f4ff] text-[#1677ff]'
                  : 'bg-[#f9f9f9] text-[#333]',
                isCurrentMonth && 'text-[#00000040]',
              )}
            >
              {String(dayjs(current).format('DD/MM'))}
            </span>
            <div className="flex flex-1 items-center justify-center">
              {day?.go_to_work !== undefined ? (
                day?.go_to_work === 0 ? (
                  <Player
                    src={offlineAnimation}
                    loop
                    autoplay
                    style={{ width: 60, height: 60 }}
                  />
                ) : (
                  <Player
                    src={onlineAnimation}
                    loop
                    autoplay
                    style={{ width: 60, height: 60 }}
                  />
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
