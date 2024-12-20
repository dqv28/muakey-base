'use server'

import {
  addPropose,
  addProposeCategory,
  deletePropose,
  deleteProposeCategory,
  updatePropose,
  updateProposeCategory,
} from '@/libs/propose'

export const addProposeCategoryAction = async (data: any) => {
  return await addProposeCategory(data)
}

export const updateProposeCategoryAction = async (id: number, data: any) => {
  return await updateProposeCategory(id, data)
}

export const deleteProposeCategoryAction = async (id: number) => {
  return await deleteProposeCategory(id)
}

export const addProposeAction = async (data: any) => {
  return await addPropose(data)
}

export const updateProposeAction = async (id: number, data: any) => {
  return await updatePropose(id, data)
}

export const deleteProposeAction = async (id: number) => {
  return await deletePropose(id)
}
