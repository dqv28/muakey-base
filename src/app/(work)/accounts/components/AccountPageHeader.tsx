'use client'

import { AccountModalForm, PageHeader } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, TabsProps } from 'antd'
import React, { useContext } from 'react'
import { AccountPageContext } from './AccountPageProvider'
import Search from './Search'

export type AccountPageHeaderProps = {
  options: any
}

const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({ options }) => {
  const { accounts, roles } = options

  const { setRoleId } = useContext(AccountPageContext)

  const tabItems: TabsProps['items'] = [
    ...[
      {
        name: 'Tất cả',
        id: 'all',
      },
      ...roles,
      { name: 'Vô hiệu hoá', id: 'disabled' },
    ].map((role: any) => ({
      label: `${role.name} (${role.id === 'all' ? accounts.length : accounts.filter((acc: any) => acc.role === role.name).length})`,
      key: role.id,
    })),
  ]

  return (
    <PageHeader
      title="Danh sách tài khoản"
      extra={
        <div className="flex flex-col items-end gap-[12px]">
          <AccountModalForm>
            <Button type="primary" icon={<PlusOutlined />}>
              Tạo tài khoản
            </Button>
          </AccountModalForm>
          <Search />
        </div>
      }
      tab={{
        items: tabItems,
        className: 'pt-[8px]',
        onChangeTab: setRoleId,
      }}
    />
  )
}

export default AccountPageHeader
