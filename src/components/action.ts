'use server'

import { logout } from "@/libs/auth"

export const logoutAction = async () => {
  return await logout()
}