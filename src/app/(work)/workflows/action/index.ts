'use server'

import {
  addReportField,
  addStage,
  addTask,
  addTaskFields,
  addTaskReport,
  addWorkflow,
  addWorkflowCategory,
  deleteCustomFieldById,
  deleteReportField,
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
  updateReportField,
} from '@/libs/data'

export const addStageAction = async (data: any, query?: any) => 
  addStage(data, query)


export const editStageAction = async (id: number, data: any) => 
  editStage(id, data)

export const deleteStageByIdAction = async (id: number) => 
  deleteStageById(id)

export const getWorkflowsAction = async (query?: any) => {
  return await getWorkflows(query)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflowCategoryAction = async (data: any) => 
  addWorkflowCategory(data)

export const getAccountAction = async (query?: any) => {
  return await getAccount(query)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflowAction = async (data: any) => 
  addWorkflow(data)

export const deleteWorkflowCategoryByIdAction = async (id: number) => 
  deleteWorkflowCategoryById(id)

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

export const addTaskAction = async (data: any) =>
  addTask(data)

export const editTaskAction = async (id: number, options?: any) => 
  editTask(id, options)

export const deleteTaskAction = async (id: number) => 
  deleteTask(id)

export const addTaskFieldsAction = async (data: any) => 
  addTaskFields(data)

export const deleteCustomFieldByIdAction = async (id: number) => 
  deleteCustomFieldById(id)

export const editCustomFieldAction = async (id: number, data: any) => 
  editCustomField(id, data)

export const addReportFieldAction = async (data: any) => 
  addReportField(data)

export const updateReportFieldAction = async (id: number, data: any) => 
  updateReportField(id, data)

export const deleteReportFieldAction = async (id: number) => 
  deleteReportField(id)

export const addTaskReportAction = async (data: any) => 
  addTaskReport(data)
