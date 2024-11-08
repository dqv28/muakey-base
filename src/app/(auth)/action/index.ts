'use server'

import { loginWidthCredentials } from "@/libs/auth"

export const loginWidthCredentialsAction = async (data:any) => {
  const { token, error } = await loginWidthCredentials(data)

  return { token, error }
}