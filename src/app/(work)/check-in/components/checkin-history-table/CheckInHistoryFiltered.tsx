'use client'

import { SearchOutlined } from '@ant-design/icons'
import { DatePicker, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import clsx from 'clsx'
import React from 'react'

type CheckInHistoryFilteredProps = {
  className?: string
}

const CheckInHistoryFiltered: React.FC<CheckInHistoryFilteredProps> = ({
  className,
}) => {
  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <div className="flex w-[371px] items-center gap-[12px] overflow-hidden rounded-[8px] border border-[#D9D9D9] bg-[#fff] pr-[8px]">
        <Input
          className="border-none"
          placeholder="Tìm kiếm người yêu cầu, mã yêu cầu"
        />
        <SearchOutlined />
      </div>

      <DatePicker.RangePicker
        className="w-[256px] rounded-[8px]"
        locale={locale}
      />
    </div>
  )
}

export default CheckInHistoryFiltered
