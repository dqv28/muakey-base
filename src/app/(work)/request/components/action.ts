'use server'

import {
  addPropose,
  addProposeCategory,
  deleteProposeCategory,
} from '@/libs/propose'

export const addProposeCategoryAction = async (data: any) => {
  return await addProposeCategory(data)
}

export const deleteProposeCategoryAction = async (id: number) => {
  return await deleteProposeCategory(id)
}

export const addProposeAction = async (data: any) => {
  return await addPropose(data)
}
