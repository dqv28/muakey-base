'use server'

import { getReportFieldsByWorkflowId, refreshData } from "@/libs/data"

export const getReportFieldsByWorkflowIdAction = async (workflowId: number, query?: any) => 
  getReportFieldsByWorkflowId(workflowId, query)

export const refreshDataAction = async () => 
  refreshData()