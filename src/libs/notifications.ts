import { requestWithAuthorized } from './request'

export const seenNotifications = async () => {
  return await requestWithAuthorized('seen-notification', {
    method: 'PUT',
  })
}
