import { Divider, Tabs, TabsProps } from 'antd'
import clsx from 'clsx'
import React from 'react'

type Tab = {
  items: TabsProps['items']
  className?: TabsProps['className']
  onChangeTab?: (key: string) => void
  extra?: React.ReactNode
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
        'border-b bg-[#fff] px-[24px] pt-[12px]',
        tab?.items ? 'pb-0' : 'pb-[12px]',
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[20px] font-[500]">{title}</span>
          <div className="flex items-center">
            {tab?.items && (
              <Tabs
                className={tab?.className}
                tabBarStyle={{ marginBottom: 0 }}
                items={tab?.items}
                onChange={tab?.onChangeTab}
              />
            )}
            {tab?.extra && (
              <>
                <Divider
                  type="vertical"
                  className="mx-[32px]! h-[20px] border-r-[#e5e7eb]!"
                />
                {tab?.extra}
              </>
            )}
          </div>
        </div>
        {extra}
      </div>
    </div>
  )
}

export default PageHeader
