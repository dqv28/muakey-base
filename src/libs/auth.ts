import { request } from "./request";
import { getSession } from "./session";

export const isLoggedIn = async () => {
  const session = await getSession()

  return session.isLoggedIn
}

export const isFirstLoggedIn = async () => {
  const session = await getSession()

  const today = new Date().getDate()

  return session.firstLoginDate !== today
}

export const loginWidthCredentials = async (data: any) => {
  const { token: accessToken, error } = await request('login', {
    method: 'POST',
    data,
  }).then((data) => data)

  const session = await getSession()

  session.accessToken = accessToken
  session.isLoggedIn = true
  session.firstLoginDate = new Date().getDate()

  if (!error) {
    await session.save()
  }

  return { error }
} 

export const logout = async () => {
  const session = await getSession()

  session.accessToken = undefined
  session.isLoggedIn = false

  await session.save()
}
  