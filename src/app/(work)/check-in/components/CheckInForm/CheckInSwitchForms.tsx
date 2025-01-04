import React from 'react'
import CheckInTimeEditForm from './CheckInTimeEditFrom'
import RegisterTimeOffForm from './RegisterTimeOffForm'

type CheckInSwitchFormsProps = {
  params?: any
}

const CheckInSwitchForms: React.FC<CheckInSwitchFormsProps> = ({ params }) => {
  switch (params?.type) {
    case 'register-time-off':
      return <RegisterTimeOffForm />

    case 'change-shift':
      return <>Thay đổi phân ca</>

    case 'change-check-in':
      return <CheckInTimeEditForm />

    case 'register-ot':
      return <>Đăng ký OT</>

    default:
      return <></>
  }
}

export default CheckInSwitchForms
