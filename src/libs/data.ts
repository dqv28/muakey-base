import { request, requestWithFile } from './request'

export const getWorkflows = async (query?: any) => {
  return request('workflows?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowById = async (id: number) => {
  return request(`workflows/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembersById = async (id: number) => {
  return request(`workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getStagesByWorkflowId = async (id: number) => {
  return request(`stages/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowCategories = async () => {
  return request('workflow-categories')
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembers = async (id: number) => {
  return request(`workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflow = async (data: any) =>
  request('workflows', {
    method: 'POST',
    data,
  }).then((data) => data)

export const addStage = async (data: any, query?: any) =>
  request('stages?' + new URLSearchParams(query), {
    method: 'POST',
    data,
  }).then((data) => data)

export const editStage = async (id: number, data: any) =>
  request(`stages/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const addWorkflowCategory = (data: any) =>
  request('workflow-categories', {
    method: 'POST',
    data,
  }).then((data) => data)

export const deleteWorkflowCategoryById = (id: number) =>
  request(`workflow-categories/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const deleteStageById = (id: number) =>
  request(`stages/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const getAccount = async (query?: any) => {
  return request('accounts-search?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getTasksByStageId = async (id: number) =>
  request(`tasks/${id}/stage`)
    .then((data) => data)
    .catch(() => [])

export const addTask = async (data: any) =>
  request('tasks', {
    method: 'POST',
    data,
  }).then((data) => data)

export const editTask = async (id: number, data: any) => {
  return await request(`tasks/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)
}

export const moveStage = async (id: number, stageId: number) => {
  return await request(`tasks/${id}?stage_id=${stageId}`, {
    method: 'PUT'
  })
}

export const getTaskById = async (id: number) =>
  request(`tasks/${id}`)
    .then((data) => data)
    .catch(() => null)

export const deleteTask = async (id: number) =>
  request(`tasks/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskFields = (data: any) =>
  request('fields', {
    method: 'POST',
    data,
  }).then((data) => data)

export const getCustomFieldsByWorkflowId = async (id: number) => {
  return request(`fields/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const deleteCustomFieldById = async (id: number) =>
  request(`fields/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const editCustomField = async (id: number, data: any) =>
  request(`fields/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const getTaskFieldsByTaskId = async (id: number, query?: any) => {
  return request(
    `task-fields/${id}/workflow?` + new URLSearchParams(query),
  )
    .then((data) => data)
    .catch(() => [])
}

export const editTaskField = async (id: number, data?: any) =>
  request(`task-fields/${id}`, {
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
  request('task-histories?' + new URLSearchParams(query))
  .then((data) => data)
  .catch(() => [])

export const getTimeStagesByTaskId = async (id: number) => 
  request(`time-stage/${id}`)
  .then((data) => data)
  .catch(() => [])

export const getReportFieldsByWorkflowId = async (wid: number) => 
  request(`report-fields/${wid}/workflow`)
  .then((data) => data)
  .catch(() => [])

export const addReportField = async (data: any) => 
  request('report-fields', {
    method: 'POST',
    data
  }).then((data) => data)

export const updateReportField = async (id: number, data: any) => 
  request(`report-fields/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)

export const deleteReportField = async (id: number) => 
  request(`report-fields/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskReport = async (data: any) => 
  request('task-reports', {
    method: 'POST',
    data
  }).then((data) => data)