'use server'

import { editAccount, getBankList } from '@/libs/data'
import { getDepartments } from '@/libs/department'

export const getBankListRequest = async () => {
  return await getBankList()
}

export const updateProfileAction = async (id: number, data: any) => {
  return await editAccount(id, data)
}

export const getDepartmentListRequest = async () => {
  return await getDepartments()
}
