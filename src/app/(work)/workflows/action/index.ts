'use server'

import {
  addStage,
  addTask,
  addTaskFields,
  addWorkflow,
  addWorkflowCategory,
  deleteCustomFieldById,
  deleteStageById,
  deleteTask,
  deleteWorkflowCategoryById,
  editCustomField,
  editStage,
  editTask,
  getAccount,
  getTasksByStageId,
  getWorkflowCategories,
  getWorkflowMembers,
  getWorkflows,
} from '@/libs/data'

export const addStageAction = async (data: any, query?: any) => {
  return await addStage(data, query)
}

export const editStageAction = async (id: number, data: any) => {
  return await editStage(id, data)
}

export const deleteStageByIdAction = async (id: number) => {
  return await deleteStageById(id)
}

export const getWorkflowsAction = async (query?: any) => {
  return await getWorkflows(query)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflowCategoryAction = async (data: any) => {
  const { error, success } = await addWorkflowCategory(data)

  return { error, success }
}

export const getAccountAction = async (query?: any) => {
  return await getAccount(query)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflowAction = async (data: any) => {
  const { error, success } = await addWorkflow(data)

  return { error, success }
}

export const deleteWorkflowCategoryByIdAction = async (id: number) => {
  const { error, success } = await deleteWorkflowCategoryById(id)

  return { error, success }
}

export const getWorkflowCategoriesAction = async () => {
  return await getWorkflowCategories()
    .then((data) => data)
    .catch(() => [])
}

export const getTasksByStageIdAction = async (id: number) => {
  return await getTasksByStageId(id)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembersAction = async (id: number) => {
  return await getWorkflowMembers(id)
    .then((data) => data)
    .catch(() => [])
}

export const addTaskAction = async (data: any) => {
  const { error, success } = await addTask(data)

  return { error, success }
}

export const editTaskAction = async (id: number, options?: any) => {
  const { error, success } = await editTask(id, options)

  return { error, success }
}

export const deleteTaskAction = async (id: number) => {
  const { error, success } = await deleteTask(id)

  return { error, success }
}

export const addTaskFieldsAction = async (data: any) => {
  const { error, success } = await addTaskFields(data)

  return { error, success }
}

export const deleteCustomFieldByIdAction = async (id: number) => {
  const { error, success } = await deleteCustomFieldById(id)

  return { error, success }
}

export const editCustomFieldAction = async (id: number, data: any) => {
  const { error, success } = await editCustomField(id, data)

  return { error, success }
}

