'use server'

import { addPropose } from '@/libs/propose'

export const addProposeAction = async (data: any) => {
  return await addPropose(data)
}
