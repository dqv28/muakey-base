import {
  getCustomFieldsByWorkflowId,
  getReportFieldsByWorkflowId,
} from '@/libs/data'
import React from 'react'
import CustomFields from './custom-fields'
import ReportFields from './report-fields'
import StageList from './stage/StageList'
import WorkflowDocs from './workflow-docs'

type WorkflowContentProps = {
  options?: any
}

const WorkflowContent: React.FC<WorkflowContentProps> = async ({ options }) => {
  const [customFields, reportFields] = await Promise.all([
    getCustomFieldsByWorkflowId(options?.workflowId),
    getReportFieldsByWorkflowId(options?.workflowId),
  ])

  switch (options?.type) {
    case 'custom-field':
      return (
        <CustomFields stages={options?.filteredStages} fields={customFields} />
      )

    case 'docs':
      return <WorkflowDocs stages={options?.filteredStages} />

    case 'report-field':
      return (
        <ReportFields stages={options?.filteredStages} fields={reportFields} />
      )

    default:
      return (
        <StageList
          isEmpty={options?.filteredStages.length <= 0}
          members={options?.workflowMembers}
        />
      )
  }
}

export default WorkflowContent
