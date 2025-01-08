import { UserOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import React from 'react'
import MainLogo from './MainLogo'

type SidebarProps = {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className="h-[calc(100vh-48px)] rounded-[16px] border-[4px] border-[#d6dde1] bg-[#f0f3f4] p-[24px] shadow-lg">
      <div className="px-[16px]">
        <MainLogo className="aspect-[140/28]" color="#04091c" />
      </div>

      <Divider className="border-t-[#c2ccd3]" />

      {/* bg-[#f0f3f4] text-[#323949] */}
      <div>
        <div className="flex cursor-pointer items-center gap-[16px] rounded-full bg-[#1677ff] px-[20px] py-[16px] text-[#fff] transition-all duration-300">
          <UserOutlined className="text-[20px]" />
          <span className="text-[16px]">Quản lý tài khoản</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
