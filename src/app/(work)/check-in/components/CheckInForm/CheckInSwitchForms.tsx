import React from 'react'

type CheckInSwitchFormsProps = {
  params?: any
}

const CheckInSwitchForms: React.FC<CheckInSwitchFormsProps> = ({ params }) => {
  switch (params?.type) {
    case 'register-time-off':
      return <>Đăng ký nghỉ</>

    case 'change-shift':
      return <>Thay đổi phân ca</>

    case 'change-check-in':
      return <>Sửa giờ vào ra</>

    case 'register-ot':
      return <>Đăng ký OT</>

    default:
      return <></>
  }
}

export default CheckInSwitchForms
