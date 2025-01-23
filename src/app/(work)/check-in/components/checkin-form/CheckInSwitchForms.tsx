import React from 'react'
import CheckInTimeEditForm from './CheckInTimeEditFrom'
import RegisterOTForm from './RegisterOTForm'
import RegisterTimeOffForm from './RegisterTimeOffForm'

type CheckInSwitchFormsProps = {
  params?: any
}

const CheckInSwitchForms: React.FC<CheckInSwitchFormsProps> = ({ params }) => {
  const { initialValues, ...rest } = params

  switch (rest?.type) {
    case 'dang-ky-nghi':
      return <RegisterTimeOffForm initialValues={initialValues} />

    case 'sua-gio-vao-ra':
      return <CheckInTimeEditForm initialValues={initialValues} />

    case 'dang-ky-ot':
      return <RegisterOTForm initialValues={initialValues} />

    default:
      return <></>
  }
}

export default CheckInSwitchForms
