'use server'

import { getTaskReports } from "@/libs/data"

export const getTaskReportsAction = async (stageId: number) => 
  getTaskReports({
    stage_id: stageId
  })