'use server'

import { addTag, addTagToTask, deleteTag, getTags, updateTagToTask } from "@/libs/tag"

export const addTagAction = async (data: any) => {
  return await addTag(data)
}

export const getTagsAction = async (query?: any) => {
  return await getTags(query)
}

export const deleteTagAction = async (id: number) => {
  return await deleteTag(id)
}

export const  addTagToTaskAction = async (data: any) => {
  return await addTagToTask(data)
}

export const  updateTagToTaskAction = async (id: number, data: any) => {
  return await updateTagToTask(id, data)
}