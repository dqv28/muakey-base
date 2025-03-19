import { requestWithAuthorized } from './request'

export const getViews = async (query?: any) => {
  return await requestWithAuthorized(`views?` + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])
}

export const createView = async (data: any) => {
  return await requestWithAuthorized('views', {
    method: 'POST',
    data,
  })
}

export const getViewFields = async (query?: any) => {
  return await requestWithAuthorized(
    `account-fields?` + new URLSearchParams(query),
  )
    .then((data) => data)
    .catch(() => [])
}
