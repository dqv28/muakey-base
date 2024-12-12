import React from 'react'
import CustomFields from './custom-fields'
import ReportFields from './report-fields'
import StageList from './stage/StageList'
import WorkflowDocs from './workflow-docs'
import WorkflowStatistics from './workflow-statistics'

type WorkflowContentProps = {
  options?: any
}

const WorkflowContent: React.FC<WorkflowContentProps> = ({ options }) => {
  const filteredStages =
    options?.stages?.length >= 0
      ? options?.stages?.filter((stage: any) => ![0, 1].includes(stage.index))
      : []

  switch (options?.type) {
    case 'custom-field':
      return (
        <CustomFields
          stages={filteredStages}
          workflowId={options?.workflow?.id}
        />
      )

    case 'docs':
      return <WorkflowDocs stages={filteredStages} />

    case 'statistics':
      return (
        <WorkflowStatistics
          workflowId={options?.workflow?.id}
          params={{
            date: options?.date || '',
            tag_id: options?.tag || '',
          }}
        />
      )

    case 'report-field':
      return (
        <ReportFields
          stages={filteredStages}
          workflowId={options?.workflow?.id}
        />
      )

    default:
      return <StageList members={options?.workflow?.members} />
  }
}

export default WorkflowContent
