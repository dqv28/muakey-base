import { getMe } from '@/libs/data'
import { Layout, LayoutProps } from '@/ui/layout'
import React from 'react'
import SideBar from './SideBar'

export type WorkLayoutUIProps = LayoutProps

const WorkLayoutUI: React.FC<WorkLayoutUIProps> = async ({ children }) => {
  const data = await getMe()

  return (
    <Layout className="overflow-hidden" hasSide>
      <SideBar
        className="h-[100vh] w-[280px] bg-[#1469c9] text-[#fff]"
        user={data}
      />
      <Layout.Main className="max-h-[100vh] max-w-[calc(100vw-280px)] flex-1">
        {children}
      </Layout.Main>
    </Layout>
  )
}

export default WorkLayoutUI
