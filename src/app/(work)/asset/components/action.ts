'use server'

import { addAsset } from '@/libs/asset'

export const addAssetAction = async (values: any) => {
  return await addAsset(values)
}
