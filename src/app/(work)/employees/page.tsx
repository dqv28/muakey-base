import { getViews } from '@/libs/view'
import React from 'react'
import EmployeePageHeader from './components/EmployeePageHeader'

const EmployeesPage: React.FC = async () => {
  const views = await getViews()

  return (
    <>
      <EmployeePageHeader tabs={views} />
    </>
  )
}

export default EmployeesPage
