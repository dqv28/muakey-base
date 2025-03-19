import { Card } from 'antd'
import React from 'react'

export type ProfileUserSidebarProps = {}

const ProfileUserSidebar: React.FC<ProfileUserSidebarProps> = () => {
  return (
    <Card
      classNames={{
        body: '!p-[24px] !space-y-[16px]',
      }}
    >
      <div className="text-[20px] leading-[28px] font-[500]">Bảo mật</div>
    </Card>
  )
}

export default ProfileUserSidebar
