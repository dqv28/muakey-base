import { requestWithAuthorized } from './request'

export const getBrand = async () => {
  return await requestWithAuthorized('asset-brands')
    .then((data) => data)
    .catch(() => [])
}
export const getAssetCategories = async () => {
  return await requestWithAuthorized('asset-categories')
    .then((data) => data)
    .catch(() => [])
}

export const getAssets = async () => {
  return await requestWithAuthorized('assets')
    .then(({ data }) => data)
    .catch(() => [])
}

export const getAssetsByStatus = async (status: string) => {
  return await requestWithAuthorized(`assets?status=${status}`)
    .then(({ data }) => data)
    .catch(() => [])
}

export const getAssetById = async (id: number) => {
  return await requestWithAuthorized(`assets/${id}`)
    .then(({ data }) => data)
    .catch(() => [])
}

export const updateAsset = async (id: number, data: any) => {
  return await requestWithAuthorized(`assets/${id}`, {
    method: 'PUT',
    data,
  })
}

export const addAsset = async (data: any) => {
  return await requestWithAuthorized('assets', {
    method: 'POST',
    data,
  })
}
