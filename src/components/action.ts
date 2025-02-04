'use server'

import { changeLoggedInDate, logout } from '@/libs/auth'
import { checkIn, checkOut, getTaskHistories, uploadImage } from '@/libs/data'

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
