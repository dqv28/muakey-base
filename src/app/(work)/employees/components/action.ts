'use server'

import {
  editAccount,
  getAccountsAsAttendance,
  getBankList,
  uploadFiles,
} from '@/libs/data'
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

export const getAccountsAsAttendanceAction = async () => {
  return await getAccountsAsAttendance()
}

export const uploadFilesAction = async (data: any) => {
  return await uploadFiles(data)
}

export const updateAccountAction = async (
  id: number,
  data: any,
  body?: FormData,
) => {
  return await editAccount(id, data, body)
}
