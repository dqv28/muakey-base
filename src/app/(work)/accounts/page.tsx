import { PageHeader } from '@/components'
import { getAccounts } from '@/libs/data'
import { PlusOutlined } from '@ant-design/icons'
import { Button, TabsProps } from 'antd'
import React from 'react'
import Search from './components/Search'
import AccountTable from './components/account-table'

const AccountsPage: React.FC = async () => {
  const accounts = await getAccounts({
    include: 'list',
  })

  const tabItems: TabsProps['items'] = [
    {
      label: 'Tất cả (20)',
      key: 'all',
    },
    {
      label: 'Quản trị cấp cao (10)',
      key: 'admin',
    },
    {
      label: 'Quản trị (10)',
      key: 'manager',
    },
    {
      label: 'Thành viên thông thường (10)',
      key: 'member',
    },
    {
      label: 'Vô hiệu hóa (10)',
      key: 'disabled',
    },
  ]

  return (
    <div className="h-[100vh] bg-[#f5f5f5]">
      <PageHeader
        title="Danh sách tài khoản"
        extra={
          <div className="flex flex-col items-end gap-[12px]">
            <Button type="primary" icon={<PlusOutlined />}>
              Tạo tài khoản
            </Button>
            <Search />
          </div>
        }
        tab={{
          items: tabItems,
          className: 'pt-[8px]',
        }}
      />
      <div className="p-[16px]">
        <AccountTable dataSource={accounts} />
      </div>
    </div>
  )
}

export default AccountsPage
