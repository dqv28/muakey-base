import { requestWithAuthorized } from './request'

export const disableAccount = async (id: number) => {
  return await requestWithAuthorized(`disable-account/${id}`, {
    method: 'PUT',
  })
}

export const getAccountById = async (id: number) => {
  return await requestWithAuthorized(`accounts/${id}`)
    .then((data) => data)
    .catch(() => null)
}

export const updateAccount = async (
  id: number,
  data: any,
  formData?: FormData,
) => {
  return await requestWithAuthorized(`accounts/${id}`, {
    method: 'PUT',
    data,
    body: formData,
  })
}
