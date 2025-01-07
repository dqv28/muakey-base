import React from 'react'
import CheckInTimeEditForm from './CheckInTimeEditFrom'
import RegisterOTForm from './RegisterOTForm'
import RegisterTimeOffForm from './RegisterTimeOffForm'

type CheckInSwitchFormsProps = {
  params?: any
}

const CheckInSwitchForms: React.FC<CheckInSwitchFormsProps> = ({ params }) => {
  switch (params?.type) {
    case 'dang-ky-nghi':
      return <RegisterTimeOffForm />

    case 'sua-gio-vao-ra':
      return <CheckInTimeEditForm />

    case 'dang-ky-ot':
      return <RegisterOTForm />

    default:
      return <></>
  }
}

export default CheckInSwitchForms
