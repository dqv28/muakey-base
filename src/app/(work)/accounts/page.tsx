import { getAccounts } from '@/libs/data'
import React from 'react'
import AccountPageHeader from './components/AccountPageHeader'
import AccountPageProvider from './components/AccountPageProvider'
import AccountTable from './components/account-table'
import { getRolesRequest } from './components/action'

const AccountsPage: React.FC<any> = async () => {
  const accounts = await getAccounts({
    include: 'list',
  })

  const roles = await getRolesRequest()

  return (
    <AccountPageProvider>
      <div className="h-[100vh] bg-[#f5f5f5]">
        <AccountPageHeader options={{ accounts, roles }} />

        <div className="p-[16px]">
          <AccountTable dataSource={accounts} />
        </div>
      </div>
    </AccountPageProvider>
  )
}

export default AccountsPage
