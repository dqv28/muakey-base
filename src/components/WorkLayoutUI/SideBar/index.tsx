import { getAttendances, getWorkflowCategories } from '@/libs/data'
import { getSession } from '@/libs/session'
import { getTodos } from '@/libs/todos'
import { Navigation } from '@/ui'
import { Layout, SideProps } from '@/ui/layout'
import {
  CalendarFilled,
  ContainerFilled,
  FileFilled,
  FolderOpenFilled,
  HddFilled,
  ProfileFilled,
  ProjectFilled,
  ShoppingFilled,
  SignalFilled,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import LeftSideBar from './LeftSideBar'
import Search from './Search'
import User from './User'

export type SideBarProps = SideProps & {
  items?: any[]
  user?: any
}

const SideBar: React.FC<SideBarProps> = async ({ user, ...props }) => {
  const today = new Date().getDate()
  const [workflowCategories, session, attendances, todosCount] =
    await Promise.all([
      getWorkflowCategories(),
      getSession(),
      getAttendances({
        me: 1,
      }),
      getTodos({
        include: 'number',
      }),
    ])

  const lastAttendance = attendances ? attendances[attendances?.length - 1] : {}

  const isCheckedIn = !!lastAttendance?.checkin && !lastAttendance?.checkout

  const hasCheckedIn = !!attendances && attendances?.length > 0

  const navigationItems = [
    {
      label: 'Quản lý công việc',
      icon: <FolderOpenFilled className="text-[16px]" />,
      expand: true,
      layout: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Quản lý quy trình</span>
            </div>
          ),
          href: '/workflows',
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Công việc của tôi</span>
            </div>
          ),
          href: '/department',
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Thống kê</span>
            </div>
          ),
          href: '/check-in',
        },
      ],
    },
    {
      label: 'Quản lý nhân sự',
      icon: <FolderOpenFilled className="text-[16px]" />,
      expand: true,
      layout: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Danh sách tài khoản</span>
            </div>
          ),
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Danh sách nhân sự</span>
            </div>
          ),
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Phòng ban</span>
            </div>
          ),
        },
      ],
    },
    {
      label: 'Quản lý chấm công',
      icon: <FolderOpenFilled className="text-[16px]" />,
      expand: true,
      layout: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Chấm công</span>
            </div>
          ),
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <div className='h-[16px] w-[16px]' />
              <span>Yêu cầu</span>
            </div>
          ),
        },
      ],
    },
    {
      label: 'Marketing',
      icon: <FolderOpenFilled className="text-[16px]" />,
      expand: true,
      layout: true,
      children: [],
    },
    {
      label: 'Tài nguyên',
      icon: <FolderOpenFilled className="text-[16px]" />,
      expand: true,
      layout: true,
      children: [],
    },
    {
      label: 'Danh mục 1',
      expand: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <FolderOpenFilled className="text-[16px]" />
              <span>Quy trình 1</span>
            </div>
          ),
          shouldRound: true,
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <FolderOpenFilled className="text-[16px]" />
              <span>Quy trình 2</span>
            </div>
          ),
          shouldRound: true,
        },
      ],
    },
    {
      label: 'Danh mục 2',
      expand: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <FolderOpenFilled className="text-[16px]" />
              <span>Quy trình 1</span>
            </div>
          ),
          shouldRound: true,
        },
        {
          label: (
            <div className="flex items-center gap-[8px]">
              <FolderOpenFilled className="text-[16px]" />
              <span>Quy trình 2</span>
            </div>
          ),
          shouldRound: true,
          // href: '/workflows',
        },
      ],
    },

  ]

  return (
    <Layout.Side
      subSide={
        <LeftSideBar
          user={user}
          options={{
            isCheckedIn,
            hasCheckedIn,
            isFirstLogin: session.firstLoginDate !== today,
          }}
        />
      }
      {...props}
    >
      <div className="flex-1 pr-[6px]">
        <User user={user} />
        <Search />
        <Navigation
          className="no-scroll mt-[20px] h-[calc(100vh-96px)] overflow-auto pb-[40px]"
          items={navigationItems}
        />
        {/* <Menu mode="inline" items={navigationItems} /> */}
      </div>
    </Layout.Side>
  )
}

export default SideBar
