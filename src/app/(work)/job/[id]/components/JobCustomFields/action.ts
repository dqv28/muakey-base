'use server'

import { getTaskFieldsByTaskId } from "@/libs/data"

export const getTaskFieldsByTaskIdAction = async (params?: any) => {
  return await getTaskFieldsByTaskId(params)
}