import { request, RequestOptions, requestWithAuthorized, requestWithFile } from './request'
import { getSession } from './session'

export const getWorkflows = async (query?: any) => {
  return requestWithAuthorized('workflows?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowById = async (id: number, options?: RequestOptions) => {
  return requestWithAuthorized(`workflows/${id}`, { ...options })
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowMembersById = async (id: number) => {
  return requestWithAuthorized(`workflows-members/${id}`)
    .then((data) => data)
    .catch(() => [])
}

export const getStagesByWorkflowId = async (id: number, options?: RequestOptions) => {
  return requestWithAuthorized(`stages/${id}/workflow`, {...options})
    .then((data) => data)
    .catch(() => [])
}

export const getWorkflowCategories = async () => {
  return await requestWithAuthorized('workflow-categories')
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

export const addWorkflowCategory = async (data: any) =>
  requestWithAuthorized('workflow-categories', {
    method: 'POST',
    data,
  }).then((data) => data)

export const deleteWorkflowCategoryById = async (id: number) =>
  requestWithAuthorized(`workflow-categories/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const deleteStageById = async (id: number) =>
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

export const moveStage = async (id: number, stageId: number, data?: any) => {
  return await requestWithAuthorized(`tasks/${id}?stage_id=${stageId}`, {
    method: 'PUT',
    data
  }).then((data) => data)
}

export const getTaskById = async (id: number) =>
  requestWithAuthorized(`tasks/${id}`)
    .then((data) => data)
    .catch(() => null)

export const deleteTask = async (id: number) =>
  requestWithAuthorized(`tasks/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTaskFields = async (data: any) =>
  requestWithAuthorized('fields', {
    method: 'POST',
    data,
  }).then((data) => data)

export const getCustomFieldsByWorkflowId = async (id: number, options?: RequestOptions) => {
  return requestWithAuthorized(`fields/${id}/workflow`, {...options})
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
  })
}

export const getTaskHistories = async (query?: any, options?: RequestOptions) => 
  requestWithAuthorized('task-histories?' + new URLSearchParams(query), { ...options })
  .then((data) => data)
  .catch(() => [])

export const getTimeStagesByTaskId = async (id: number) => 
  requestWithAuthorized(`time-stage/${id}`)
  .then((data) => data)
  .catch(() => [])

export const getReportFieldsByWorkflowId = async (wid: number, query?: any, options?: RequestOptions) => 
  requestWithAuthorized(`report-fields/${wid}/workflow?` + new URLSearchParams(query), { ...options })
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

export const getMe = async (options?: RequestOptions) => 
  requestWithAuthorized(`me`, {...options})
  .then((data) => data)
  .catch(() => [])

export const getNotifications = async () => 
  requestWithAuthorized('notifications')
  .then((data) => data)
  .catch(() => [])

export const getMeWithCheckedIn = async () => 
  requestWithAuthorized('attendances?me=1')
  .then((data) => data)
  .catch(() => null)

export const getCommentsByTaskId = async (taskId: number) => 
  requestWithAuthorized(`comments/${taskId}/task`)
  .then((data) => data)
  .catch((err) => console.log(err))

export const addComment = async (data: any) => 
  requestWithAuthorized('comments', {
    method: "POST",
    data
  }).then((data) => data)

export const checkIn = async () => 
  requestWithAuthorized('check-in', {
      method: 'POST'
    })
    .then( async (data) => {
      const { success, error } = data

      const session = await getSession()
      session.isCheckedIn = true

      if (error) {
        return { error }
      }
    
      await session.save()
      return { success }
    })

export const checkOut = async () => 
  requestWithAuthorized('check-out', {
    method: 'POST'
  })
  .then(async (data) => {
    const { success, error } = data

    const session = await getSession()
    session.isCheckedIn = false

    if (error) {
      return { error }
    }
  
    await session.save()
    return { success }
  })

export const refreshData = async () => 
  requestWithAuthorized('load-youtube', {
    method: 'PUT'
  }).then((data) => data)

export const getKpi = async (query?: any) => 
  requestWithAuthorized('kpi?' + new URLSearchParams(query))
  .then((data) => data)
  