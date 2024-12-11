import { requestWithAuthorized } from './request'

export const getTodos = async (query?: any) =>
  requestWithAuthorized(`my-tasks?` + new URLSearchParams(query))
    .then((data) => data)
    .catch(() => [])

export const addTodo = async (data: any) =>
  requestWithAuthorized('my-tasks', {
    method: 'POST',
    data,
  }).then((data) => data)
