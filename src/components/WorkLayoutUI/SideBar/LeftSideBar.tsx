'use client'

import {
  checkedInAction,
  checkOutAction,
  logoutAction,
} from '@/components/action'
import { withApp } from '@/hoc'
import {
  BellFilled,
  ExclamationCircleFilled,
  LoadingOutlined,
  LogoutOutlined,
  MehFilled,
  MenuOutlined,
} from '@ant-design/icons'
import { App, Avatar, Badge, Drawer, Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CheckoutButton from './CheckoutButton'
import NotificationsList from './NotificationsList'

export type SubSideProps = {
  user?: any
  options?: any
}

const SubSide: React.FC<SubSideProps> = ({ user, options }) => {
  const [loading, setLoading] = useState(false)
  const [openNotice, setOpenNotice] = useState(false)
  const router = useRouter()

  const { message, modal } = App.useApp()

  const handleLogout = async () => {
    await logoutAction()
    router.push('/login')
  }

  const handleCheckedIn = async () => {
    setLoading(true)

    try {
      const { success, error } = await checkedInAction()

      if (error) {
        message.error(error)
        setLoading(false)
        return
      }

      message.success(success)
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  const handleCheckedOut = async () => {
    try {
      const { success, error } = await checkOutAction()

      if (error) {
        message.error(error)
        return
      }

      message.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (!options?.isCheckedIn) {
      modal.info({
        title: `Điểm danh`,
        content: (
          <div>
            <p>Điểm danh please!</p>
          </div>
        ),
        okText: 'Điểm danh',
        okButtonProps: {
          loading,
        },
        onOk: handleCheckedIn,
      })
    }
  }, [])

  return (
    <div className="w-[60px] text-[#fff]">
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

      <div className="flex size-[60px] cursor-pointer items-center justify-center">
        {loading ? (
          <LoadingOutlined />
        ) : options?.isCheckedIn ? (
          <CheckoutButton onCheckedOut={handleCheckedOut} />
        ) : (
          <MehFilled className="text-[16px]" onClick={handleCheckedIn} />
        )}
      </div>

      <div
        className="flex size-[60px] cursor-pointer items-center justify-center"
        onClick={() => {
          modal.confirm({
            title: 'Bạn có muốn đăng xuất khỏi hệ thống ngay bây giờ?',
            icon: <ExclamationCircleFilled />,
            onOk: handleLogout,
            width: 500,
            okText: 'Đăng xuất',
            cancelText: 'Quay lại',
          })
        }}
      >
        <LogoutOutlined className="text-[16px]" />
      </div>
    </div>
  )
}

export default withApp(SubSide)
