import { Avatar } from '@/ui'
import React from 'react'

const User: React.FC = (props) => {
  return (
    <div className="flex w-full items-center gap-[12px] py-[16px]">
      <Avatar size={32} shape="circle">
        Đ
      </Avatar>{' '}
      <div>
        <div className="text-[15px] font-[400] leading-[20px]">
          Đỗ Quốc Vương
        </div>
        <div className="text-[11px] leading-[15px] text-[#ffffff4d]">IT</div>
      </div>
    </div>
  )
}

export default User
