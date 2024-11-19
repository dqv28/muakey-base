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

export const changeLoggedInDate = async () => {
  const session = await getSession()

  const today = new Date().getDate()

  session.firstLoginDate = today
  await session.save()
}

export const loginWidthCredentials = async (data: any) => 
  request('login', {
    method: 'POST',
    data,
  }).then(async (data) => {
    const { token: accessToken, error } = data

    const session = await getSession()

    session.accessToken = accessToken
    session.isLoggedIn = true
    await session.save()

    return { token: accessToken, error }
  })

export const logout = async () => {
  const session = await getSession()

  session.accessToken = undefined
  session.isLoggedIn = false

  await session.save()
}
  