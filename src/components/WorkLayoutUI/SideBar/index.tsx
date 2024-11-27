import { getMeWithCheckedIn, getWorkflowCategories } from '@/libs/data'
import { getSession } from '@/libs/session'
import { Navigation } from '@/ui'
import { Layout, SideProps } from '@/ui/layout'
import { FolderOpenFilled, ProjectFilled } from '@ant-design/icons'
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
  const [workflows, session, attendances] = await Promise.all([
    getWorkflowCategories(),
    getSession(),
    getMeWithCheckedIn(),
  ])

  return (
    <Layout.Side
      subSide={
        <LeftSideBar
          user={user}
          options={{
            isCheckedIn:
              session.isCheckedIn ||
              (!!attendances?.checkin && !attendances?.checkout),
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
          className="mt-[20px]"
          items={[
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
              ],
            },
            ...(workflows && workflows.length > 0
              ? workflows?.map((w: any) => ({
                  label: w?.name,
                  children:
                    w?.workflows.map((i: any) => ({
                      label: (
                        <div className="flex items-center gap-[12px]">
                          <ProjectFilled className="text-[16px]" />
                          <span>{i?.name}</span>
                        </div>
                      ),
                      href: `/workflows/${i?.id}`,
                    })) || [],
                  expand: true,
                }))
              : []),
          ]}
        />
      </div>
    </Layout.Side>
  )
}

export default SideBar
