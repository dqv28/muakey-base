import { Avatar } from '@/ui'
import React from 'react'

const User: React.FC<{
  user?: any
}> = ({ user }) => {
  return (
    <div className="flex w-full items-center gap-[12px] py-[16px]">
      <Avatar size={32} shape="circle">
        {user?.full_name}
      </Avatar>{' '}
      <div>
        <div className="text-[15px] font-[400] leading-[20px]">
          {user?.full_name}
        </div>
        {user?.position && (
          <div className="text-[11px] leading-[15px] text-[#ffffff4d]">
            {user?.position}
          </div>
        )}
      </div>
    </div>
  )
}

export default User
