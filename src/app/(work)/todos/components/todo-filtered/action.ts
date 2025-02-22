'use server'

import { getAccounts, getWorkflows } from '@/libs/data'

export const getWorkflowsRequest = async (query?: any) => {
  return await getWorkflows(query)
}

export const getAccountsRequest = async (query?: any) => {
  return await getAccounts(query)
}
