'use server'

import { editTaskField } from "@/libs/data"

export const editTaskFieldAction = async (id: number, data?: any) => {
  const { error, success } = await editTaskField(id, data)

  return { error, success }
}