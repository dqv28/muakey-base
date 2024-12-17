'use server'

import {
  addDepartment,
  deleteDepartment,
  updateDepartment,
} from '@/libs/department'

export const addDepartmentAction = async (data: any) => {
  return await addDepartment(data)
}

export const updateDepartmentAction = async (id: number, data: any) => {
  return await updateDepartment(id, data)
}

export const deleteDepartmentAction = async (id: number) => {
  return await deleteDepartment(id)
}
