import { getAccounts } from '@/libs/data'
import { getDepartments } from '@/libs/department'
import React from 'react'
import DepartmentList from './components/DepartmentList'
import PageHeader from './components/PageHeader'

const Page: React.FC = async () => {
  const departments = await getDepartments()
  const accounts = await getAccounts()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader options={{ accounts }} />

      <div className="h-[(100vh-69px)] overflow-auto p-[16px]">
        <DepartmentList dataSource={departments} options={{ accounts }} />
      </div>
    </div>
  )
}

export default Page
