import { request } from "./request";
import { getSession } from "./session";

export const isLoggedIn = async () => {
  const session = await getSession()

  return session.isLoggedIn
}

export const loginWidthCredentials = async (data: any) => {
  const { token: accessToken, error } = await request('login', {
    method: 'POST',
    data,
  }).then((data) => data)

  console.log({ token: accessToken, error })

  const session = await getSession()

  session.accessToken = accessToken
  session.isLoggedIn = true

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
  