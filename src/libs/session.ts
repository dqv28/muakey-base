'use server'

import { getIronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers"

type Session = {
  accessToken?: string
  isLoggedIn: boolean
}

export const getSession = async () => {
  const options: SessionOptions = {
    cookieName: 't',
    password: 'oeoZmb9NoUBXfNtpNJta9Gom3rY45B4m',
    ttl: 1209600
  }

  return await getIronSession<Session>(await cookies(), options)
}