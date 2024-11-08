'use server'

import { editTask, editTaskField, uploadImage } from "@/libs/data"

export const editTaskFieldAction = async (id: number, data?: any) => {
  const { error, success } = await editTaskField(id, data)

  return { error, success }
}

export const uploadImageAction = async (data: any) => {
  const { error, urlImage } = await uploadImage(data)

  return { url: urlImage, error }
}

export const editTaskAction = async (id: number, options?: any) => {
  const { error, success } = await editTask(id, options)

  return { error, success }
}