'use client'

import {
  changeLoggedInDateAction,
  checkedInAction,
  checkOutAction,
  logoutAction,
} from '@/components/action'
import {
  BellFilled,
  LogoutOutlined,
  MehFilled,
  MenuOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Drawer, Dropdown, Modal, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutButton from './CheckoutButton'
import NotificationsList from './NotificationsList'

export type SubSideProps = {
  user?: any
  options?: any
}

const SubSide: React.FC<SubSideProps> = ({ user, options }) => {
  const [open, setOpen] = useState(false)
  const [openNotice, setOpenNotice] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    setOpen(false)
    router.refresh()
  }

  const handleCheckedIn = async () => {
    try {
      const { success, error } = await checkedInAction()

      if (error) {
        toast.error(error)
        return
      }

      toast.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleCheckedOut = async () => {
    try {
      const { success, error } = await checkOutAction()

      if (error) {
        toast.error(error)
        return
      }

      toast.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (options?.isFirstLogin) {
      var timer = setTimeout(async () => {
        await changeLoggedInDateAction()
      }, 5000)
    }

    return () => clearTimeout(timer)
  }, [options?.isFirstLogin])

  return (
    <div className="w-[60px]">
      <Dropdown
        dropdownRender={() => (
          <div className="ml-[8px] min-w-[400px] rounded-[4px] bg-[#fff] p-[16px] shadow-[0_2px_4px_0_#0000001a]">
            <div className="flex items-center gap-[16px]">
              <Avatar className="!text-[16px]" shape="circle" size={36}>
                {String(user?.full_name).charAt(0).toLocaleUpperCase()}
              </Avatar>
              <div>
                <div>
                  {user?.full_name} · {user?.username}
                </div>
              </div>
            </div>
          </div>
        )}
        trigger={['click']}
        placement="bottomLeft"
        arrow
      >
        <div className="flex size-[60px] cursor-pointer items-center justify-center">
          <MenuOutlined className="text-[16px]" />
        </div>
      </Dropdown>

      <div
        className="flex size-[60px] cursor-pointer items-center justify-center"
        onClick={() => setOpenNotice(true)}
      >
        <Badge
          size="small"
          overflowCount={99}
          dot
          classNames={{
            indicator: '!shadow-[0_0_0_1px_#1469c9]',
          }}
        >
          <BellFilled className="text-[16px] text-[#fff]" />
        </Badge>
      </div>
      <Drawer
        classNames={{
          body: '!p-0',
        }}
        title="Thông báo"
        onClose={() => setOpenNotice(false)}
        open={openNotice}
        placement="left"
        width={600}
      >
        <NotificationsList />
      </Drawer>

      <Tooltip
        title="Check-in tại đây"
        open={options?.isFirstLogin}
        placement="right"
        color="green"
      >
        <div className="flex size-[60px] cursor-pointer items-center justify-center">
          {options?.isCheckedIn ? (
            <CheckoutButton onCheckedOut={handleCheckedOut} />
          ) : (
            <MehFilled className="text-[16px]" onClick={handleCheckedIn} />
          )}
        </div>
      </Tooltip>

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
