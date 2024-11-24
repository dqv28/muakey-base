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

const WorkflowContent: React.FC<WorkflowContentProps> = ({ options }) => {
  switch (options?.type) {
    case 'custom-field':
      return (
        <CustomFields stages={options?.filteredStages} workflowId={options?.workflowId} />
      )

    case 'docs':
      return <WorkflowDocs stages={options?.filteredStages} />

    case 'report-field':
      return (
        <ReportFields stages={options?.filteredStages} workflowId={options?.workflowId} />
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
