'use server'

import { deleteTask, moveStage } from '@/libs/data'

export const moveStageAction = async (id: number, stageId: number) =>
  moveStage(id, stageId)

export const deleteTaskAction = async (id: number) => deleteTask(id)
