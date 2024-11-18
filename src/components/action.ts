'use server'

import { logout } from "@/libs/auth"
import { checkIn, checkOut } from "@/libs/data"

export const logoutAction = async () => {
  return await logout()
}

export const checkedInAction = async () => {
  await checkIn()
}

export const checkOutAction = async () => {
  await checkOut()
}