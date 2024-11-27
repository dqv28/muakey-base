'use server'

import { getNotifications } from "@/libs/data"

export const getNotificationsAction = async () => {
  return await getNotifications()
}