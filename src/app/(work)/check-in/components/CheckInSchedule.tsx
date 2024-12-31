import { Calendar, ConfigProvider } from 'antd'
import locale from 'antd/es/locale/vi_VN'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'

import { Player } from '@lottiefiles/react-lottie-player'
import offlineAnimation from '../lotties/off-animation.json'
import onlineAnimation from '../lotties/on-animation.json'

type CheckInScheduleProps = {
  schedule?: any[]
}

const CheckInSchedule: React.FC<CheckInScheduleProps> = ({ schedule }) => {
  return (
    <ConfigProvider locale={locale}>
      <Calendar
        headerRender={() => <></>}
        fullCellRender={(current) => {
          const date = String(dayjs(current).format('YYYY-MM-DD'))

          const day = schedule?.find((s: any) => s?.day_of_week === date)

          return (
            <div
              className={clsx(
                'mx-[2px] mt-[4px] flex aspect-[220/160] size-full flex-col justify-between border-x border-t border-x-[#fff] border-t-[#eee] px-[8px] pb-[8px] pt-[6px]',
                // {
                //   'bg-[#eee]': day?.go_to_work === 0,
                //   'bg-[#fff]': day?.go_to_work === 1,
                // },
              )}
            >
              <span className="block h-[22px]">
                {String(dayjs(current).format('DD/MM'))}
              </span>
              {day?.go_to_work !== undefined ? (
                day?.go_to_work === 0 ? (
                  <Player
                    src={offlineAnimation}
                    loop
                    autoplay
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Player
                    src={onlineAnimation}
                    loop
                    autoplay
                    style={{ width: 100, height: 100 }}
                  />
                )
              ) : (
                ''
              )}
            </div>
          )
        }}
      />
    </ConfigProvider>
  )
}

export default CheckInSchedule
