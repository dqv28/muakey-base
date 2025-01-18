'use server'

import {
  deleteNotification,
  getNotifications,
  updateNotification,
} from '@/libs/data'
import { getSession } from '@/libs/session'

export const getNotificationsAction = async () => {
  return await getNotifications()
}

export const updateNotificationAction = async (id: number, data: any) => {
  return await updateNotification(id, data)
}

export const deleteNotificationAction = async (id: number, query?: any) => {
  return await deleteNotification(id, query)
}

export const getSessionAction = async () => {
  return await getSession()
}
