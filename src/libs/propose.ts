import { requestWithAuthorized } from './request'

export const getProposes = async () =>
  requestWithAuthorized('proposes')
    .then((data) => data)
    .catch(() => [])
