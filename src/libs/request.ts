'use server'

import { headers } from 'next/headers'
import { getSession } from './session'

export type RequestOptions = NodeJS.RequestInit & {
  params?: Record<string, any>
  data?: string | Record<string, any>
}

export const request = async (path: string, options?: RequestOptions) => {
  const url = new URL(path, process.env.BASE_API_URL)
  const { params, headers, data, ...rest } = options || {}

  if (params) {
    for (const name in params) {
      const value = params[name]

      if (value !== null && value !== undefined) {
        url.searchParams.append(name, params[name])
      }
    }
  }

  const init: NodeJS.RequestInit = {
    headers: {
      accept: 'application/json',
      ...headers,
    },
    ...rest,
  }

  if (data && !init.body) {
    if (typeof data === 'object') {
      init.body = JSON.stringify(data)
      ;(init.headers as any)['content-type'] = 'application/json'
    } else {
      init.body = data
    }
  }

  const response = await fetch(url, init)

  if (response.status < 200 || response.status >= 500) {
    throw new Error('API Response error')
  }

  return response.json()
}

export const requestWithFile = async (
  path: string,
  options?: RequestOptions,
) => {
  const { accessToken } = await getSession()

  if (!accessToken) {
    throw new Error('Unauthorized.')
  }

  return request(path, {
    cache: 'no-store',
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
  })
}

export const requestWithAuthorized = async (
  path: string,
  options?: RequestOptions,
) => {
  const { accessToken } = await getSession()

  if (!accessToken) {
    throw new Error('Unauthorized.')
  }

  const xForwardedFor = (await headers()).get('x-forwarded-for')

  return request(path, {
    cache: 'no-store',
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-forwarded-for': xForwardedFor || '',
      ...options?.headers,
    },
  })
}
