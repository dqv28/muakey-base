import { requestWithAuthorized } from './request'

export const getStageById = async (id: number) => {
  return requestWithAuthorized(`stages/${id}`)
}
