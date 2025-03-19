'use client'

import { Calendar, CalendarProps } from 'antd'
import { createStyles } from 'antd-style'
import locale from 'antd/es/date-picker/locale/vi_VN'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'

export type ScheduleHolidayCalendarProps = CalendarProps<any> & {}

const useStyle = createStyles(({ css, prefixCls }) => {
  return {
    customCalendar: css`
      .${prefixCls}-picker-panel {
        border: 0 !important;
      }
      .${prefixCls}-picker-body {
        padding: 0 !important;
        .${prefixCls}-picker-content {
          tbody {
            tr {
              td {
                padding: 0 !important;
              }
              & > :first-child {
                border-left: solid 1px #0505050f;
              }
            }
          }
          thead {
            tr {
              th {
                padding: 12px 0;
                font-weight: 600;
                text-align: center;
                border-top: solid 1px #0505050f;
                padding: 12px 8px !important;
              }
              & > :not(:last-child) {
                border-right: solid 1px #0505050f;
              }
              & > :first-child {
                border-left: solid 1px #0505050f;
              }
            }
          }
        }
      }
    `,
  }
})

const ScheduleHolidayCalendar: React.FC<ScheduleHolidayCalendarProps> = (
  props,
) => {
  const { styles } = useStyle()
  const today = String(dayjs(new Date()).format('DD/MM'))

  return (
    <Calendar
      className={styles.customCalendar}
      headerRender={() => <></>}
      fullCellRender={(date) => {
        return (
          <div
            className={clsx(
              'aspect-172/130 w-full max-w-[172px] border-t border-r px-[8px] py-[16px] text-center',
              {
                '!border-t-[#096DD9] bg-[#E6F7FF]':
                  String(date.format('DD/MM')) === today,
              },
            )}
          >
            {date.format('DD/MM')}
          </div>
        )
      }}
      locale={locale}
      {...props}
    />
  )
}

export default ScheduleHolidayCalendar
