'use server'

import { getAccounts, getWorkflowCategoryById } from '@/libs/data'
import { getDepartments } from '@/libs/department'

export const getAccountsAction = async () => {
  return await getAccounts()
}

export const getDepartmentsAction = async () => {
  return await getDepartments()
}

export const getWorkflowCategoryByIdAction = async (id: number) => {
  return await getWorkflowCategoryById(id)
}
