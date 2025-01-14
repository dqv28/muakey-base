'use server'

import { getReportFieldsByWorkflowId } from '@/libs/data'

export const getReportFieldsByWorkflowIdRequest = async (
  workflowId: number,
) => {
  return await getReportFieldsByWorkflowId({
    workflow_id: workflowId,
  })
}
