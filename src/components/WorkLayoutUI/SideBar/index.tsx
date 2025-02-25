import { getAttendances, getWorkflowCategories } from '@/libs/data'
import { getSession } from '@/libs/session'
import { getTodos } from '@/libs/todos'
import { Navigation } from '@/ui'
import { Layout, SideProps } from '@/ui/layout'
import {
  CalendarFilled,
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
      label: 'QUAN TRỌNG',
      expand: true,
      children: [
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <FolderOpenFilled className="text-[16px]" />
              <span>Quản lý quy trình</span>
            </div>
          ),
          href: '/workflows',
        },
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <HddFilled className="text-[16px]" />
              <span>Quản lý phòng ban</span>
            </div>
          ),
          href: '/department',
        },
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <CalendarFilled className="text-[16px]" />
              <span>Chấm công</span>
            </div>
          ),
          href: '/check-in',
        },
        {
          label: (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <ShoppingFilled className="text-[16px]" />
                <span>Công việc của tôi</span>
              </div>
              {todosCount > 0 && (
                <div className="rounded-[4px] bg-[#ff5555] px-[6px] pb-[4px] pt-[2px] text-[12px] font-[500]">
                  <span className="leading-[12px]">{todosCount}</span>
                </div>
              )}
            </div>
          ),
          href: '/todos',
        },
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <SignalFilled className="text-[16px]" />
              <span>Thống kê</span>
            </div>
          ),
          href: '/statistics',
        },
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <ProfileFilled className="text-[16px]" />
              <span>Yêu cầu</span>
            </div>
          ),
          href: '/request',
        },
        {
          label: (
            <div className="flex items-center gap-[12px]">
              <FileFilled className="text-[16px]" />
              <span>Tài nguyên</span>
            </div>
          ),
          href: '/resources',
        },
      ],
    },
    ...(workflowCategories && workflowCategories.length > 0
      ? workflowCategories?.map((w: any) => ({
          label: w?.name,
          children: w?.workflows
            ? w?.workflows.map((i: any) => ({
                label: (
                  <Tooltip title={i?.name}>
                    <div className="flex items-center gap-[12px]">
                      <ProjectFilled className="text-[16px]" />
                      <span className="line-clamp-1">{i?.name}</span>
                    </div>
                  </Tooltip>
                ),
                href: `/workflows/${i?.id}`,
              }))
            : [],
          expand: true,
        }))
      : []),
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
      <div className="flex-1 px-[12px]">
        <User user={user} />
        <Search />
        <Navigation
          className="no-scroll mt-[20px] h-[calc(100vh-96px)] overflow-auto pb-[40px]"
          items={navigationItems}
        />
      </div>
    </Layout.Side>
  )
}

export default SideBar
