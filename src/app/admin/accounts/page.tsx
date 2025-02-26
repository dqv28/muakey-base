import { getIp } from '@/libs/auth'
import { getAccounts } from '@/libs/data'
import { getRoles } from '@/libs/role'
import React from 'react'
import AccountActions from './account-actions'
import AccountTable from './account-table'

const Page: React.FC = async () => {
  const accounts = await getAccounts()
  const roles = await getRoles()

  const res = await getIp()

  console.log('IP ->', res)

  return (
    <div className="space-y-[24px]">
      <AccountActions />
      <AccountTable dataSource={accounts} options={{ roles }} />
    </div>
  )
}

export default Page
