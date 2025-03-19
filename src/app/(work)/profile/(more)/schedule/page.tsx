import React from 'react'
import ScheduleHolidayCalendarCard from './components/schedule-holiday-calendar-card'
import ScheduleHolidayCard from './components/schedule-holiday-card'

const SchedulePage: React.FC = () => {
  return (
    <div className="no-scroll h-[calc(100vh-87px)] !space-y-[16px] overflow-y-auto">
      <ScheduleHolidayCard title="Thông tin ngày nghỉ" />
      <ScheduleHolidayCalendarCard />
    </div>
  )
}

export default SchedulePage
