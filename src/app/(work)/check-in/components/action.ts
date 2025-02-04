'use server'

import { deletePropose, getProposes, updatePropose } from '@/libs/propose'
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

export const updateProposeAction = async (id: number, data: any) => {
  return await updatePropose(id, data)
}

export const deleteProposeAction = async (id: number) => {
  return await deletePropose(id)
}
