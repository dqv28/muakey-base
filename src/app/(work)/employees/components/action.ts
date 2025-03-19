'use server'

import { getBankList } from '@/libs/data'
import { createView, getViewFields } from '@/libs/view'

export const getViewFieldsAction = async (query?: any) => {
  return await getViewFields(query)
}

export const createViewAction = async (data: any) => {
  return await createView(data)
}

export const getBankListRequest = async () => {
  return await getBankList()
}
