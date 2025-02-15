import { Tabs, TabsProps } from 'antd'
import clsx from 'clsx'
import React from 'react'

type Tab = {
  items: TabsProps['items']
}

export type PageHeaderProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  tab?: Tab
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, extra, tab }) => {
  return (
    <div
      className={clsx(
        'border-b bg-[#fff] px-[16px] pt-[16px]',
        tab?.items ? 'pb-0' : 'pb-[16px]',
      )}
    >
      <div className="flex items-center justify-between text-[24px]">
        <span className="font-[500]">{title}</span>
        {extra}
      </div>

      {tab?.items && (
        <Tabs tabBarStyle={{ marginBottom: 0 }} items={tab?.items} />
      )}
    </div>
  )
}

export default PageHeader
