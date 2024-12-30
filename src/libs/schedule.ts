import { requestWithAuthorized } from './request'

export const getWorkSchedule = async (query?: any) =>
  requestWithAuthorized('day-off?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])

export const updateWorkSchedule = async (data: any) =>
  requestWithAuthorized('day-off', {
    method: 'PUT',
    data,
  }).then((data) => data)

export const addWorkSchedule = async () =>
  requestWithAuthorized('day-off', {
    method: 'POST',
  }).then((data) => data)
