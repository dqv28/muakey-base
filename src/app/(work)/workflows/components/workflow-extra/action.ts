'use server'

import { getAccounts, getWorkflowCategoryById } from '@/libs/data'

export const getAccountssAction = async () => {
  return await getAccounts()
}

export const getWorkflowCategoryByIdAction = async (id: number) => {
  return await getWorkflowCategoryById(id)
}
