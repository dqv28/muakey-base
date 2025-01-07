import React from 'react'
import CheckInForm from '../CheckInForm'
import CheckInHistoryTable from '../CheckInHistoryTable'
import CheckInTable from '../CheckInTable'

type CheckInContentProps = {
  options?: any
  query?: any
}

const CheckInContent: React.FC<CheckInContentProps> = ({ query, options }) => {
  const { attendances, members, day, user, workSchedule } = options

  const { type } = query

  switch (type) {
    case 'form-request':
      return <CheckInForm />

    case 'table-history':
      return <CheckInHistoryTable />

    default:
      return (
        <CheckInTable
          options={{
            attendances,
            members: members?.filter((mem: any) => mem?.type !== 'department'),
            day: Number(day || 0),
            user,
            workSchedule,
          }}
          scroll={{
            x: 'max-content',
            y: 'calc(100vh - 218px)',
          }}
          pagination={false}
          bordered
        />
      )
  }
}

export default CheckInContent
