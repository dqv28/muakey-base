'use client'

import {
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'
import { Avatar, Badge, Card, Progress } from 'antd'
import React from 'react'
import animation from './lotties/gold-coin-animation.json'

export type ProfileOverviewProps = {
  user?: any
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user }) => {
  const items = [
    {
      icon: <HeartFilled className="!text-[#F5222D]" />,
      label: '3 năm 2 tháng 10 ngày',
    },
    {
      icon: <MailOutlined />,
      label: user?.email || '--',
    },
    {
      icon: <PhoneOutlined />,
      label: user?.phone || '--',
    },
    {
      icon: (
        <Player
          src={animation}
          loop
          autoplay
          style={{ height: 16, width: 16, transform: 'scale(2.6)' }}
        />
      ),
      label: user?.now_salary
        ? `${Number(user?.now_salary).toLocaleString()}đ`
        : '--',
    },
  ]

  return (
    <Card
      classNames={{
        body: '!p-[24px] !space-y-[16px]',
      }}
    >
      <div className="flex justify-center">
        <Avatar icon={<UserOutlined />} size={98} />
      </div>

      <div className="text-center">
        <div className="text-[20px] leading-[28px] font-[500]">
          Đỗ Minh Nguyệt
        </div>
        <div className="text-[14px] leading-[22px] font-[400] text-[#00000073]">
          Chuyên viên nhân sự
        </div>
      </div>

      <div className="flex items-center justify-center gap-[8px]">
        <span className="text-[14px] leading-[22px] font-[600]">Fulltime</span>
        <Badge
          status="success"
          text={
            <span className="text-[14px] leading-[22px] font-[600]">
              {user?.status}
            </span>
          }
        />
      </div>

      <Progress percent={20} showInfo={false} />

      {items.map((item, index) => (
        <div className="flex items-center gap-[8px]" key={index}>
          {item.icon}
          <span className="text-[14px] leading-[22px] font-[600]">
            {item.label}
          </span>
        </div>
      ))}
    </Card>
  )
}

export default ProfileOverview
