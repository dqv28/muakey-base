import { requestWithAuthorized } from './request'

export const getRoles = async () =>
  requestWithAuthorized('roles')
    .then((data) => data)
    .catch(() => [])
