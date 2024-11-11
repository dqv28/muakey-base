'use client'

import { logoutAction } from '@/components/action'
import { BellFilled, LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export type SubSideProps = {}

const SubSide: React.FC = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    setOpen(false)
    router.refresh()
  }

  return (
    <div className="w-[60px]">
      <Dropdown
        dropdownRender={() => (
          <div className="flex items-center gap-[16px] rounded-[4px] bg-[#fff] p-[16px] shadow-[0_2px_4px_0_#0000001a]">
            <Avatar shape="circle" size={36}>
              V
            </Avatar>
            <span>Đỗ Quốc Vương · @Alibaba</span>
          </div>
        )}
        trigger={['click']}
        placement="bottomLeft"
        arrow
      >
        <div className="flex size-[60px] items-center justify-center">
          <MenuOutlined className="text-[16px]" />
        </div>
      </Dropdown>
      <div className="flex size-[60px] items-center justify-center">
        <BellFilled className="text-[16px]" />
      </div>
      <div
        className="flex size-[60px] cursor-pointer items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <LogoutOutlined className="text-[16px]" />
      </div>

      <Modal open={open} onOk={handleLogout} onCancel={() => setOpen(false)}>
        <div>Bạn có muốn đăng xuất khỏi hệ thống ngay bây giờ?</div>
      </Modal>
    </div>
  )
}

export default SubSide
