'use server'

import { getReportFieldsByWorkflowId, refreshData } from "@/libs/data"

export const getReportFieldsByWorkflowIdAction = async (query?: any) => 
  getReportFieldsByWorkflowId(query)

export const refreshDataAction = async () => 
  refreshData()