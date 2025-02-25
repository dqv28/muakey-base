'use server'

import { getAccounts } from '@/libs/data'
import { getDepartmentById } from '@/libs/department'

export const getDepartmentByIdAction = async (id: number) => {
  return await getDepartmentById(id)
}

export const getAccountsRequest = async () => {
  return await getAccounts()
}
