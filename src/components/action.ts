'use server'

import { changeLoggedInDate, logout } from '@/libs/auth'
import { checkIn, checkOut, getTaskHistories, uploadImage } from '@/libs/data'
import {
  addPropose,
  addProposeCategory,
  deletePropose,
  deleteProposeCategory,
  updatePropose,
  updateProposeCategory,
} from '@/libs/propose'

export const logoutAction = async () => {
  return await logout()
}

export const checkedInAction = async () => checkIn()

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
