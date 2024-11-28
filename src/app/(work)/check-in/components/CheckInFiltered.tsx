import { Select } from 'antd'
import React from 'react'

type CheckInFilteredProps = {}

const CheckInFiltered: React.FC<CheckInFilteredProps> = () => {
  const checkInOptions = [
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
  ]

  return (
    <div>
      <Select
        style={{ width: 160 }}
        placeholder="Chọn tháng"
        options={checkInOptions}
      />
    </div>
  )
}

export default CheckInFiltered
