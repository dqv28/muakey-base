'use server'

import {
  getReportFieldsByWorkflowId,
  getStagesByWorkflowId,
  refreshData,
} from '@/libs/data'

export const getReportFieldsByWorkflowIdAction = async (query?: any) =>
  getReportFieldsByWorkflowId(query)

export const refreshDataAction = async (query?: any) => refreshData(query)

export const getStagesByWorkflowIdRequest = async (query?: any) =>
  getStagesByWorkflowId(query)
