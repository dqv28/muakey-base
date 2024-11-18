'use server'

import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

type Session = {
  accessToken?: string
  isLoggedIn: boolean
  firstLoginDate?: number
  isCheckedIn: boolean
}

export const getSession = async () => {
  const options: SessionOptions = {
    cookieName: 't',
    password: 'oeoZmb9NoUBXfNtpNJta9Gom3rY45B4m',
  }

  return await getIronSession<Session>(await cookies(), options)
}
