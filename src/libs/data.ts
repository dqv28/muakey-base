import { requestWithAuthorized, requestWithFile } from './request'

export const getWorkflows = async (query?: any) => {
  return requestWithAuthorized('workflows?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowById = async (id: number) => {
  return requestWithAuthorized(`workflows/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembersById = async (id: number) => {
  return requestWithAuthorized(`workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getStagesByWorkflowId = async (id: number) => {
  return requestWithAuthorized(`stages/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowCategories = async () => {
  return requestWithAuthorized('workflow-categories')
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembers = async (id: number) => {
  return requestWithAuthorized(`workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflow = async (data: any) =>
  requestWithAuthorized('workflows', {
    method: 'POST',
    data,
  }).then((data) => data)

export const addStage = async (data: any, query?: any) =>
  requestWithAuthorized('stages?' + new URLSearchParams(query), {
    method: 'POST',
    data,
  }).then((data) => data)

export const editStage = async (id: number, data: any) =>
  requestWithAuthorized(`stages/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const addWorkflowCategory = (data: any) =>
  requestWithAuthorized('workflow-categories', {
    method: 'POST',
    data,
  }).then((data) => data)

export const deleteWorkflowCategoryById = (id: number) =>
  requestWithAuthorized(`workflow-categories/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const deleteStageById = (id: number) =>
  requestWithAuthorized(`stages/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const getAccount = async (query?: any) => {
  return requestWithAuthorized('accounts-search?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getTasksByStageId = async (id: number) =>
  requestWithAuthorized(`tasks/${id}/stage`)
    .then((data) => data)
    .catch(() => [])

export const addTask = async (data: any) =>
  requestWithAuthorized('tasks', {
    method: 'POST',
    data,
  }).then((data) => data)

export const editTask = async (id: number, data: any) => {
  return await requestWithAuthorized(`tasks/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)
}

export const moveStage = async (id: number, stageId: number) => {
  return await requestWithAuthorized(`tasks/${id}?stage_id=${stageId}`, {
    method: 'PUT'
  })
}

export const getTaskById = async (id: number) =>
  requestWithAuthorized(`tasks/${id}`)
    .then((data) => data)
    .catch(() => null)

export const deleteTask = async (id: number) =>
  requestWithAuthorized(`tasks/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskFields = (data: any) =>
  requestWithAuthorized('fields', {
    method: 'POST',
    data,
  }).then((data) => data)

export const getCustomFieldsByWorkflowId = async (id: number) => {
  return requestWithAuthorized(`fields/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const deleteCustomFieldById = async (id: number) =>
  requestWithAuthorized(`fields/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const editCustomField = async (id: number, data: any) =>
  requestWithAuthorized(`fields/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const getTaskFieldsByTaskId = async (id: number, query?: any) => {
  return requestWithAuthorized(
    `task-fields/${id}/workflow?` + new URLSearchParams(query),
  )
    .then((data) => data)
    .catch(() => [])
}

export const editTaskField = async (id: number, data?: any) =>
  requestWithAuthorized(`task-fields/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const uploadImage = async (data: any) => {
  return await requestWithFile('upload-image', {
    method: 'POST',
    body: data
  }).then((data) => data)
}

export const getTaskHistories = async (query?: any) => 
  requestWithAuthorized('task-histories?' + new URLSearchParams(query))
  .then((data) => data)
  .catch(() => [])

export const getTimeStagesByTaskId = async (id: number) => 
  requestWithAuthorized(`time-stage/${id}`)
  .then((data) => data)
  .catch(() => [])

export const getReportFieldsByWorkflowId = async (wid: number, query?: any) => 
  requestWithAuthorized(`report-fields/${wid}/workflow?` + new URLSearchParams(query))
  .then((data) => data)
  .catch(() => [])

export const addReportField = async (data: any) => 
  requestWithAuthorized('report-fields', {
    method: 'POST',
    data
  }).then((data) => data)

export const updateReportField = async (id: number, data: any) => 
  requestWithAuthorized(`report-fields/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)

export const deleteReportField = async (id: number) => 
  requestWithAuthorized(`report-fields/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskReport = async (taskId: number, data: any) => 
  requestWithAuthorized(`task-reports/${taskId}`, {
    method: 'POST',
    data
  }).then((data) => data)

export const updateTaskReports = async (id: number, data: any) => 
  requestWithAuthorized(`task-reports/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)

export const getTaskReports = async (stageId: number) => 
  requestWithAuthorized(`task-reports/${stageId}/stage`)
  .then((data) => data)
  .catch(() => [])