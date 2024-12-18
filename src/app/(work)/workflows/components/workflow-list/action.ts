'use server'

import { getDepartmentById } from '@/libs/department'

export const getDepartmentByIdAction = async (id: number) => {
  return await getDepartmentById(id)
}
