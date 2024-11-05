import { getWorkflowCategories } from '@/libs/data'
import { Navigation } from '@/ui'
import { CircleUserFilled } from '@/ui/icons'
import { Layout, SideProps } from '@/ui/layout'
import {
  CheckSquareFilled,
  ClockCircleFilled,
  FolderOpenFilled,
  PlusSquareOutlined,
  ProjectFilled,
} from '@ant-design/icons'
import React from 'react'
import LeftSideBar from './LeftSideBar'
import Search from './Search'
import User from './User'

export type SideBarProps = SideProps & {
  items?: any[]
}

const SideBar: React.FC<SideBarProps> = async (props) => {
  const workflows = await getWorkflowCategories()

  return (
    <Layout.Side subSide={<LeftSideBar />} {...props}>
      <div className="flex-1 px-[12px]">
        <User />
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
                      <CheckSquareFilled className="text-[16px]" />
                      <span>Nhiệm vụ của tôi</span>
                    </div>
                  ),
                  href: '/jobs',
                },
                {
                  label: (
                    <div className="flex items-center gap-[12px]">
                      <ClockCircleFilled className="text-[16px]" />
                      <span>Công việc của tôi</span>
                    </div>
                  ),
                  href: '/todos',
                },
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
                      <CircleUserFilled className="text-[16px]" />
                      <span>Tất cả nhiệm vụ</span>
                    </div>
                  ),
                },
                {
                  label: (
                    <div className="flex items-center gap-[12px]">
                      <CircleUserFilled className="text-[20px]" />
                      <span>Báo cáo hệ thống</span>
                    </div>
                  ),
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
            {
              label: 'QUẢN LÝ',
              expand: true,
              children: [
                {
                  label: (
                    <div className="flex items-center gap-[12px]">
                      <PlusSquareOutlined className="text-[16px]" />
                      <span>Tạo mới workflow</span>
                    </div>
                  ),
                },
              ],
            },
          ]}
        />
      </div>
    </Layout.Side>
  )
}

export default SideBar
