'use server'

import { getReportFieldsByWorkflowId } from "@/libs/data"

export const getReportFieldsByWorkflowIdAction = async (workflowId: number, query?: any) => 
  getReportFieldsByWorkflowId(workflowId, query)