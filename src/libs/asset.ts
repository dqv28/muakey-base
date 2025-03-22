import { requestWithAuthorized } from './request'

export const getAssetCategories = async () => {
  return await requestWithAuthorized('asset-categories')
    .then(({ data }) => data)
    .catch(() => [])
}

export const getAssets = async () => {
  return await requestWithAuthorized('assets')
    .then(({ data }) => data)
    .catch(() => [])
}

export const addAsset = async (data: any) => {
  return await requestWithAuthorized('assets', {
    method: 'POST',
    data,
  })
}
