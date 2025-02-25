'use server'

import { deleteResourceCategory } from '@/libs/resources'

export const deleteResourceCategoryAction = async (rId: number) => {
  return deleteResourceCategory(rId)
}
