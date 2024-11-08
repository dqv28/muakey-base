import { request, requestWithFile } from './request'

export const getWorkflows = async (query?: any) => {
  return request('api/workflows?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowById = async (id: number) => {
  return request(`api/workflows/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembersById = async (id: number) => {
  return request(`api/workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getStagesByWorkflowId = async (id: number) => {
  return request(`api/stages/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowCategories = async () => {
  return request('api/workflow-categories')
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembers = async (id: number) => {
  return request(`api/workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const addWorkflow = async (data: any) =>
  request('api/workflows', {
    method: 'POST',
    data,
  }).then((data) => data)

export const addStage = async (data: any, query?: any) =>
  request('api/stages?' + new URLSearchParams(query), {
    method: 'POST',
    data,
  }).then((data) => data)

export const editStage = async (id: number, data: any) =>
  request(`api/stages/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const addWorkflowCategory = (data: any) =>
  request('api/workflow-categories', {
    method: 'POST',
    data,
  }).then((data) => data)

export const deleteWorkflowCategoryById = (id: number) =>
  request(`api/workflow-categories/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const deleteStageById = (id: number) =>
  request(`api/stages/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const getAccount = async (query?: any) => {
  return request('api/accounts-search?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getTasksByStageId = async (id: number) =>
  request(`api/tasks/${id}/stage`)
    .then((data) => data)
    .catch(() => [])

export const addTask = async (data: any) =>
  request('api/tasks', {
    method: 'POST',
    data,
  }).then((data) => data)

type Options = {
  stageId?: any
  data?: any
}

export const editTask = async (id: number, options?: Options) => {
  const { stageId, data } = options as Options

  return await request(`api/tasks/${id}?stage_id=${stageId}`, {
    method: 'PUT',
    ...(data ? { data } : {}),
  })
    .then((data) => data)
    .catch((err) => console.log(err))
}

export const getTaskById = async (id: number) =>
  request(`api/tasks/${id}`)
    .then((data) => data)
    .catch(() => null)

export const deleteTask = async (id: number) =>
  request(`api/tasks/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskFields = (data: any) =>
  request('api/fields', {
    method: 'POST',
    data,
  }).then((data) => data)

export const getCustomFieldsByWorkflowId = async (id: number) => {
  return request(`api/fields/${id}/workflow`)
    .then((data) => data)
    .catch(() => [])
}

export const deleteCustomFieldById = async (id: number) =>
  request(`api/fields/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const editCustomField = async (id: number, data: any) =>
  request(`api/fields/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const getTaskFieldsByTaskId = async (id: number, query?: any) => {
  return request(
    `api/task-fields/${id}/workflow?` + new URLSearchParams(query),
  )
    .then((data) => data)
    .catch(() => [])
}

export const editTaskField = async (id: number, data?: any) =>
  request(`api/task-fields/${id}`, {
    method: 'PUT',
    data,
  }).then((data) => data)

export const uploadImage = async (data: any) => {
  return await requestWithFile('api/upload-image', {
    method: 'POST',
    body: data
  }).then((data) => data)
}

export const getTaskHistories = async (query?: any) => 
  request('api/task-histories?' + new URLSearchParams(query))
  .then((data) => data)
  .catch(() => [])
