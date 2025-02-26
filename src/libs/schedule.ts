import { requestWithAuthorized } from './request'

export const getWorkSchedule = async (query?: any) =>
  requestWithAuthorized('day-off?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])

export const updateWorkSchedule = async (data: any) =>
  requestWithAuthorized('day-off/1', {
    method: 'PUT',
    data,
  }).then((data) => data)

export const addWorkSchedule = async () =>
  requestWithAuthorized('day-off', {
    method: 'POST',
  }).then((data) => data)

export const getWorkScheduleAsMembers = async (query?: any) =>
  requestWithAuthorized('schedule-accounts?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])

export const getScheduleAsWorkflows = async () =>
  requestWithAuthorized('schedule-workflows')
    .then((data) => data)
    .catch(() => [])
