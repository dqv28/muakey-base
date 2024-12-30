import React from 'react'
import CheckInForm from '../CheckInForm'
import CheckInTable from '../CheckInTable'

type CheckInContentProps = {
  options?: any
  hasForm?: boolean
}

const CheckInContent: React.FC<CheckInContentProps> = ({
  hasForm,
  options,
}) => {
  const { attendances, members, day, user, workSchedule } = options

  switch (String(hasForm)) {
    case 'true':
      return <CheckInForm />

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
          }}
          pagination={false}
          bordered
          rootClassName="!customize-scroll"
        />
      )
  }
}

export default CheckInContent
