import { Card, CardProps } from 'antd'
import React from 'react'
import ScheduleHolidayCalendar from './ScheduleHolidayCalendar'
import ScheduleHolidayCalendarFilter from './ScheduleHolidayCalendarFilter'
import ScheduleHolidayCalendarGuide from './ScheduleHolidayCalendarGuide'

export type ScheduleHolidayCalendarCardProps = CardProps & {
  data?: any
}

const ScheduleHolidayCalendarCard: React.FC<
  ScheduleHolidayCalendarCardProps
> = ({ data, ...props }) => {
  console.log('SCHEDULE ->', data)

  return (
    <Card
      classNames={{
        body: '!space-y-[16px] !p-0',
      }}
      {...props}
    >
      <div className="!mb-0 flex items-center justify-between gap-[24px] px-[24px] py-[16px]">
        <ScheduleHolidayCalendarFilter />
        <ScheduleHolidayCalendarGuide />
      </div>

      <ScheduleHolidayCalendar />
    </Card>
  )
}

export default ScheduleHolidayCalendarCard
