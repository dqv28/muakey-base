'use server'

import { getProposes } from '@/libs/propose'
import { addWorkSchedule, updateWorkSchedule } from '@/libs/schedule'

export const updateWorkScheduleAction = async (data: any) => {
  return await updateWorkSchedule(data)
}

export const addWorkScheduleAction = async () => {
  return await addWorkSchedule()
}

export const getProposesRequest = async () => {
  return await getProposes()
}
