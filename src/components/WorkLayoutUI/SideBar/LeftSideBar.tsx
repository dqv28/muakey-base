'use client'

import { logoutAction } from '@/components/action'
import { Avatar } from '@/ui'
import { BellFilled, LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { Dropdown, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export type SubSideProps = {
  user?: any
}

const SubSide: React.FC<SubSideProps> = ({ user }) => {
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
          <div className="ml-[8px] min-w-[400px] rounded-[4px] bg-[#fff] p-[16px] shadow-[0_2px_4px_0_#0000001a]">
            <div className="flex items-center gap-[16px]">
              <Avatar shape="circle" size={36}>
                {user?.full_name}
              </Avatar>
              <div>
                <div>
                  {user?.full_name} · {user?.username}
                </div>

                <div
                  className="cursor-pointer text-[12px] text-[#267cde]"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
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
