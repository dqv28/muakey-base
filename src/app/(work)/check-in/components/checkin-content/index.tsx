import React from 'react'
import CheckInForm from '../checkin-form'
import CheckInHistoryTable from '../checkin-history-table'
import CheckInTable from '../CheckInTable'

type CheckInContentProps = {
  options?: any
  query?: any
}

const CheckInContent: React.FC<CheckInContentProps> = ({ query, options }) => {
  const { members, day } = options

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
            ...options,
            members: members?.filter((mem: any) => mem?.type !== 'department'),
            day: Number(day || 0),
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
