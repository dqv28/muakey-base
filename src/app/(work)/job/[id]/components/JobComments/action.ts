'use server'

import { addComment } from "@/libs/data"

export const addCommentAction = async (data: any) => 
  addComment(data)