'use server'

import { markTodoCompleted } from '@/libs/todos'

export const markTodoCompletedAction = async (id: number) => {
  return await markTodoCompleted(id)
}
