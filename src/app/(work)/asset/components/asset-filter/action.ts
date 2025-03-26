"use server"

import { searchAsset } from "@/libs/asset"

export const searchAssetAction = async (query: string) => {
  return await searchAsset(query)
}

