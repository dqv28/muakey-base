import { Avatar } from '@/ui'
import { uniqueId } from 'lodash'
import React from 'react'

export type AvatarsProps = {
  avatars?: string[]
}

const Avatars: React.FC<AvatarsProps> = ({ avatars }) => {
  return (
    <div className="flex min-h-[20px] items-center -space-x-[8px]">
      {(avatars || []).map((avatar) => (
        <Avatar
          className="border-[2px] border-[#fff]"
          key={uniqueId()}
          shape="circle"
          size={28}
        >
          {avatar}
        </Avatar>
      ))}
    </div>
  )
}

export default Avatars
