'use server'

import { editTask, getMe } from '@/libs/data'
import {
  addTag,
  addTagToTask,
  deleteTag,
  getTags,
  updateTagToTask,
} from '@/libs/tag'

export const addTagAction = async (data: any) => {
  return await addTag(data)
}

export const getTagsAction = async (query?: any) => {
  return await getTags(query)
}

export const deleteTagAction = async (id: number) => {
  return await deleteTag(id)
}

export const addTagToTaskAction = async (data: any) => {
  return await addTagToTask(data)
}

export const updateTagAction = async (id: number, data: any) => {
  return await updateTagToTask(id, data)
}

export const getMeAction = async () => {
  return await getMe()
}

export const editTaskAction = async (id: number, data: any) =>
  editTask(id, data)
