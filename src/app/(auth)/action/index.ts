'use server'

import { loginWidthCredentials } from "@/libs/auth"

export const loginWidthCredentialsAction = async (data:any) => {
  const { error } = await loginWidthCredentials(data)

  return { error }
}