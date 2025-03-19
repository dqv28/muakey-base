'use server'

import { editAccount, getBankList } from '@/libs/data'

export const getBankListRequest = async () => {
  return await getBankList()
}

export const updateProfileAction = async (id: number, data: any) => {
  return await editAccount(id, data)
}
