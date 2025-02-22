'use server'

import { getTodos, markTodoCompleted } from '@/libs/todos'

export const markTodoCompletedAction = async (id: number) => {
  return await markTodoCompleted(id)
}

export const getTodosRequest = async (query?: any) => {
  return await getTodos(query)
}
