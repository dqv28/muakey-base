import { getAccounts } from '@/libs/data'
import React from 'react'
import DepartmentList from './components/department-list'
import PageHeader from './components/PageHeader'

const Page: React.FC = async () => {
  const accounts = await getAccounts()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader options={{ accounts }} />

      <div className="h-[(100vh-69px)] overflow-auto p-[16px]">
        <DepartmentList options={{ accounts }} suspense />
      </div>
    </div>
  )
}

export default Page
