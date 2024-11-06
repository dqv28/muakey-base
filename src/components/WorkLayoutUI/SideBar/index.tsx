import { getWorkflowCategories } from '@/libs/data'
import { Navigation } from '@/ui'
import { Layout, SideProps } from '@/ui/layout'
import { FolderOpenFilled, ProjectFilled } from '@ant-design/icons'
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
