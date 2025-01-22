'use server'

import { moveStage } from '@/libs/data'

export const moveStageAction = async (id: number, stageId: number) =>
  moveStage(id, stageId)
