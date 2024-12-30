'use server'

import { addWorkSchedule, updateWorkSchedule } from '@/libs/schedule'

export const updateWorkScheduleAction = async (data: any) => {
  return await updateWorkSchedule(data)
}

export const addWorkScheduleAction = async () => {
  return await addWorkSchedule()
}
