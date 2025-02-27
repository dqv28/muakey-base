'use server'

import { deleteResource, deleteResourceCategory } from '@/libs/resources'

export const deleteResourceCategoryAction = async (rId: number) => {
  return await deleteResourceCategory(rId)
}

export const deleteResourceAction = async (rId: number) => {
  return await deleteResource(rId)
}
