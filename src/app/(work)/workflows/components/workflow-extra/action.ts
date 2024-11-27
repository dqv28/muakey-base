'use server'

import { getAccount } from "@/libs/data"

export const getAccountsAction = async () => {
  return await getAccount()
}