'use server'

import { addComment, deleteComment } from '@/libs/data'

export const addCommentAction = async (data: any) => addComment(data)

export const deleteCommentAction = async (id: number) => deleteComment(id)
