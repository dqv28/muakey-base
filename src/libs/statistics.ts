import { requestWithAuthorized } from './request'

export const getReportStatistics = async (query?: any) =>
  requestWithAuthorized('general-report?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])

export const getSchedule = async (query?: any) =>
  requestWithAuthorized('schedule?' + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
