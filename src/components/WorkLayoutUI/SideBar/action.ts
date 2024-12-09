'use server'

import { getNotifications } from "@/libs/data"
import { getSession } from "@/libs/session"

export const getNotificationsAction = async () => {
  return await getNotifications()
}

export const getSessionAction = async () => {
  return await getSession()
}