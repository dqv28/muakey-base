'use server'

import { changeLoggedInDate, logout } from '@/libs/auth'
import {
  addTask,
  assignTaskWithoutWork,
  checkIn,
  checkOut,
  editTask,
  getMe,
  getTaskHistories,
  uploadImage,
} from '@/libs/data'
import {
  addPropose,
  addProposeCategory,
  deletePropose,
  deleteProposeCategory,
  updatePropose,
  updateProposeCategory,
} from '@/libs/propose'
import {
  addTag,
  addTagToTask,
  deleteTag,
  getTags,
  updateTagById,
} from '@/libs/tag'

export const logoutAction = async () => {
  return await logout()
}

export const checkedInAction = async (query?: any) => checkIn(query)

export const checkOutAction = async () => checkOut()

export const changeLoggedInDateAction = async () => changeLoggedInDate()

export const getTaskHistoriesAction = async (query?: any) =>
  getTaskHistories(query)

export const uploadImageAction = async (file: any) => {
  return await uploadImage(file)
}

export const addProposeCategoryAction = async (data: any) => {
  return await addProposeCategory(data)
}

export const updateProposeCategoryAction = async (id: number, data: any) => {
  return await updateProposeCategory(id, data)
}

export const deleteProposeCategoryAction = async (id: number) => {
  return await deleteProposeCategory(id)
}

export const addProposeAction = async (data: any) => {
  return await addPropose(data)
}

export const updateProposeAction = async (id: number, data: any) => {
  return await updatePropose(id, data)
}

export const deleteProposeAction = async (id: number) => {
  return await deletePropose(id)
}

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
  return await updateTagById(id, data)
}

export const getMeAction = async () => {
  return await getMe()
}

export const editTaskAction = async (id: number, data: any) =>
  editTask(id, data)

export const addTaskAction = async (data: any) => addTask(data)

export const assignTaskWithoutWorkAction = async (id: number, data: any) => {
  return await assignTaskWithoutWork(id, data)
}
