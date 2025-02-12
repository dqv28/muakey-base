'use server'

import { moveStage } from "@/libs/data"

export const moveStageAction = async (id: number, stageId: number, data?: any) => 
  moveStage(id, stageId, data)