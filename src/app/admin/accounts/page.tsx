import { getAccounts } from '@/libs/data'
import React from 'react'
import AccountActions from './account-actions'
import AccountTable from './account-table'

const Page: React.FC = async () => {
  const accounts = await getAccounts()

  return (
    <div className="space-y-[24px]">
      <AccountActions />
      <AccountTable dataSource={accounts} />
    </div>
  )
}

export default Page
