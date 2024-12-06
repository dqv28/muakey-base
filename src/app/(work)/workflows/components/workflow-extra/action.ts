'use server'

import { getAccount, getWorkflowCategoryById } from "@/libs/data"

export const getAccountsAction = async () => {
  return await getAccount()
}

export const getWorkflowCategoryByIdAction = async (id: number) => {
  return await getWorkflowCategoryById(id)
}