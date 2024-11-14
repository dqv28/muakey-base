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
        <CustomFields
          stages={options?.filteredStages}
          fields={options?.customFields}
        />
      )

    case 'docs':
      return <WorkflowDocs stages={options?.filteredStages} />

    case 'report-field':
      return (
        <ReportFields
          stages={options?.filteredStages}
          fields={options?.reportFields}
        />
      )

    default:
      return (
        <div className="flex-1 overflow-auto">
          <StageList
            dataSource={options?.stages}
            isEmpty={options?.filteredStages.length <= 0}
            members={options?.workflowMembers}
          />
        </div>
      )
  }
}

export default WorkflowContent
