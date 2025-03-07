import { requestWithAuthorized } from './request'

export const disableAccount = async (id: number) => {
  return await requestWithAuthorized(`disable-account/${id}`, {
    method: 'PUT',
  })
}
