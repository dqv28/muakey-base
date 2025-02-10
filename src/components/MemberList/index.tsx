'use client'

import { randomColor } from '@/libs/utils'
import { Avatar } from 'antd'
import React from 'react'

type MemberListProps = {
  members?: any[]
  onItemCLick?: (userId: number) => void
}

const MemberList: React.FC<MemberListProps> = ({ members, onItemCLick }) => {
  return (
    members &&
    members.map((mem: any) => (
      <div
        className="flex cursor-pointer items-center gap-[12px] px-[20px] py-[16px] leading-[20px] hover:bg-[#f6f6f6]"
        key={mem?.id}
        onClick={() => onItemCLick?.(mem?.id)}
      >
        <Avatar
          src={mem?.avatar}
          size={32}
          shape="circle"
          style={{ backgroundColor: randomColor(mem?.full_name) }}
        >
          {String(mem?.full_name).charAt(0).toLocaleUpperCase()}
        </Avatar>
        <div>
          <div className="text-[14px] text-[#111]">{mem?.full_name}</div>
          <div className="text-[13px]">
            {mem?.username} {mem?.position ? `· ${mem?.position}` : ''}
          </div>
        </div>
      </div>
    ))
  )
}

export default MemberList
